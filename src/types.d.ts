import { Finding, TransactionEvent } from "forta-agent";
// types
export type Agent = {
    handleTransaction: (txEvent: TransactionEvent) => Promise<Finding[]>;
  };

export type Suspects = {
   name: string
   address: string
}

export type CreateTrasactionProps = {
  name: string,
  from: string,
  to?: string,
  txHash: string
}