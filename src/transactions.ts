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
import { isScammerTransaction, getNameEns } from "./utils";
import BigNumber from "bignumber.js";

const provideHandleTransaction = (): HandleTransaction => {
  return async function handlerTransaction(
    txEv: TransactionEvent
  ): Promise<Finding[]> {
    const findings: Finding[] = [];
    const { from, hash } = txEv;

    const transferLog = txEv.filterLog(transferEvent);
    const transferFunc = txEv.filterFunction(transferFunctions);
   
    if (!transferFunc.length && !transferLog.length) return findings;

    const transfer = transferFunc.length ? transferFunc : transferLog;

    const isScammer = isScammerTransaction(from); // Checks if the address is already registered
    const ensName = getNameEns(from);

    transfer.forEach((txEvt) => {
      const {  to, value} = txEvt.args
      const victim = txEvt.args.from
      const amount = BigNumber(value.toString())
        .dividedBy(10 ** 18)
        .toFixed(2);

      if (isScammer) {
        if (to) {
          findings.push(createTransferFromFinding(ensName, from, hash, victim, amount, to));
        } else {
          findings.push(createTransferFromFindingWNto(ensName, from, hash, victim, amount));
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
