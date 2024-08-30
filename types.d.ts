type Organization = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  nbTesters: number;
  visibility: "public" | "private"
  version?: string;
};
