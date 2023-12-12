import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { createTransferFromFinding } from "./findings";
import { transferFunction } from "./constants";
import { isScammerTransaction, getNameEns } from "./utils";

const provideHandleTransaction = (): HandleTransaction => {
  return async function handlerTransaction(
    txEv: TransactionEvent
  ): Promise<Finding[]> {
    const findings: Finding[] = [];
    const { from, to, hash } = txEv;
    
    const transfer = txEv.filterFunction(transferFunction);
    
    const isScammer = isScammerTransaction(from);
    const ensName = getNameEns(from);
    
    if(!transfer) return findings;
    transfer.forEach(() => {
      if(isScammer && ensName != 'error'){
        if(to) findings.push(createTransferFromFinding(ensName, from, to, hash));
      }
      
    })
    
    return findings;
  };
};

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};


