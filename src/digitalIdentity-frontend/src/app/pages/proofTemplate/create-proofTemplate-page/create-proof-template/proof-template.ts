export interface ProofTemplate {
  name: string;
  version: string;
  credDefs: any[];
  credDefStringAttributes: string;
  credDefStringPredicates: string;
  attributes: any[];
  image: File | null;
}
