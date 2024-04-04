import {
  Finding,
  HandleTransaction,
  TransactionEvent,
} from "forta-agent";
import {
  createTransferFromFinding,
  createTransferFromFindingWNto,
} from "./findings";
import {
  transferEvent,
  transferFunctions,
} from "./constants";
import {suspiciosEnsAddress} from './drainers-services'
import { isScammerTransaction, getNameEns } from "./utils";

const provideHandleTransaction = (): HandleTransaction => {
  return async function handlerTransaction(
    txEv: TransactionEvent
  ): Promise<Finding[]> {
    const findings: Finding[] = [];
    const { from, to, hash } = txEv;

    const transferLog = txEv.filterLog(transferEvent);
    const transferFunc = txEv.filterFunction(transferFunctions);
   
    if (!transferFunc.length && !transferLog.length) return findings;

    const transfer = transferFunc.length ? transferFunc : transferLog;

    const isScammer = isScammerTransaction(from); // Checks if the address is already registered
    const ensName = getNameEns(from);

    transfer.forEach(() => {
      if (isScammer) {
        if (to) {
          findings.push(createTransferFromFinding(ensName, from, hash, to));
        } else {
          findings.push(createTransferFromFindingWNto(ensName, from, hash));
        }
      }
    });
    return findings;
  };
};

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};
