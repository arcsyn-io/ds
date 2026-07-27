import type { ReactNode } from "react";

export type Property = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type Example = {
  title: string;
  description: string;
  preview: ReactNode;
  code: string;
};

export type ComponentPage = {
  id: string;
  title: string;
  summary: string;
  importCode: string;
  status: string;
  anatomy: string[];
  accessibility: string;
  properties: Property[];
  examples: Example[];
};
