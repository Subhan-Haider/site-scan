export interface Doc {
  id: string;
  title: string;
  description: string;
  use: string;
  resources: string[] | { title: string; link: string }[];
  screenshot?: string;
}

const docs: Doc[] = [];

export default docs;
