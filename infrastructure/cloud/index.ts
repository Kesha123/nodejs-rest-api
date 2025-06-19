import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as tls from '@pulumi/tls';
import { ProjectConfig } from './resources/config';
import { createStageSg } from './resources/security-groups/stage.sg';
import { createProdSg } from './resources/security-groups/prod.sg';

const config = new pulumi.Config();
const projectConfig = config.requireObject<ProjectConfig>('data');
const AZ = 'eu-north-1a';

const vpc = new aws.ec2.Vpc(`${projectConfig.project_name}-vpc`, {
  cidrBlock: projectConfig.vpc.cidr,
});

const subnet = new aws.ec2.Subnet(`${projectConfig.project_name}-subnet`, {
  vpcId: vpc.id,
  cidrBlock: projectConfig.vpc.public_subnet_cidr,
  availabilityZone: AZ,
});

const internetGateway = new aws.ec2.InternetGateway(
  `${projectConfig.project_name}-internet-gateway`,
  {
    vpcId: vpc.id,
  },
);

const publicRouteTable = new aws.ec2.RouteTable(
  `${projectConfig.project_name}-route-table`,
  {
    vpcId: vpc.id,
    routes: [{ cidrBlock: '0.0.0.0/0', gatewayId: internetGateway.id }],
  },
);

new aws.ec2.RouteTableAssociation(
  `${projectConfig.project_name}-route-table-association`,
  {
    subnetId: subnet.id,
    routeTableId: publicRouteTable.id,
  },
);

const privateKey = new tls.PrivateKey(
  `${projectConfig.project_name}-private-key`,
  {
    algorithm: 'RSA',
    rsaBits: 2048,
  },
);

const keyPair = new aws.ec2.KeyPair(
  `${projectConfig.project_name}-ssh-keypair`,
  {
    publicKey: privateKey.publicKeyOpenssh,
    tags: {
      ...projectConfig.tags,
      Name: `${projectConfig.project_name}-ssh-keypair`,
    },
  },
);

const stageSg = createStageSg(projectConfig.project_name, 'stage-sg', {
  vpcId: vpc.id,
  tags: {
    ...projectConfig.tags,
    Name: `${projectConfig.project_name}-stage-sg`,
  },
});

const prodSg = createProdSg(projectConfig.project_name, 'prod-sg', {
  vpcId: vpc.id,
  tags: {
    ...projectConfig.tags,
    Name: `${projectConfig.project_name}-prod-sg`,
  },
});

const kubernetesNode = new aws.ec2.Instance(
  `${projectConfig.project_name}-kubernetes-node`,
  {
    ami: projectConfig.ami,
    instanceType: aws.ec2.InstanceType.T3_Micro,
    subnetId: subnet.id,
    associatePublicIpAddress: true,
    vpcSecurityGroupIds: [stageSg.id, prodSg.id],
    keyName: keyPair.keyName,
    userData: `
    #!/bin/bash
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
    sudo dpkg -i minikube_latest_amd64.deb
    minikube addons enable ingress
  `,
    tags: {
      ...projectConfig.tags,
      Name: `${projectConfig.project_name}-kubernetes-node`,
    },
  },
);

const rootZone = aws.route53.getZone({
  name: projectConfig.root_domain,
});

new aws.route53.Record(`${projectConfig.project_name}-a-record`, {
  zoneId: rootZone.then((rootZone) => rootZone.zoneId),
  name: projectConfig.project_domain,
  type: aws.route53.RecordType.A,
  ttl: 30,
  records: [kubernetesNode.publicIp],
});

export const resources = {
  sshKeys: {
    privateKey: privateKey.privateKeyOpenssh,
    publicKey: privateKey.publicKeyOpenssh,
  },
  nodeIp: kubernetesNode.publicIp,
};
