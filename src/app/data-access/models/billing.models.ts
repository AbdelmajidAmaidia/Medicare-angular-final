export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED';

export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  number: string;
  status: InvoiceStatus;
  createdAt: string;
  total: number;
  lines: InvoiceLine[];
}