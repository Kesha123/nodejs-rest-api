export type ProjectConfig = {
  project_name: string;
  root_domain: string;
  project_domain: string;
  vpc: {
    cidr: string;
    public_subnet_cidr: string;
  };
  ami: string;
  tags: {
    [key: string]: string;
  };
};
