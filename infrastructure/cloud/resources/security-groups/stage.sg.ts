import { SecurityGroup } from '@pulumi/aws/ec2';
import { Output } from '@pulumi/pulumi';

export const createStageSg = (
  projectName: string,
  name: string,
  args: { vpcId: Output<string>; tags: { [key: string]: string } },
): SecurityGroup => {
  return new SecurityGroup(`${projectName}-${name}`, {
    vpcId: args.vpcId,
    description: 'Allow SSH',
    ingress: [
      { protocol: 'tcp', fromPort: 22, toPort: 22, cidrBlocks: ['0.0.0.0/0'] },
    ],
    egress: [
      { protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] },
    ],
    tags: {
      ...args.tags,
      Name: `${projectName}-${name}`,
    },
  });
};
