type Organization = {
  name: string;
  id: string;
};

type Project = {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  nbTesters: number;
  version?: string;
};
