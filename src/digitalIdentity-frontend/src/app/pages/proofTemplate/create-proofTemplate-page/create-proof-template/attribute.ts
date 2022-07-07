export interface Attribute {
  attribID: number;
  name: string;
  value: string | number | Date;
  type: 'String' | 'Number' | 'Email' | 'Date';
}
