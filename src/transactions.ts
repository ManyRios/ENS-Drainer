import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import {
  createTransferFromFinding,
  createTransferFromFindingWNto,
} from "./findings";
import {
  transferEvent,
  transferFunctions,
  suspiciosEnsAddress,
} from "./constants";
import { isScammerTransaction, getNameEns, getEnsName } from "./utils";

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

    const ens = await getEnsName(from);

    if (!isScammer) {
      if (ens?.names) {
        suspiciosEnsAddress.push({
          name: ens?.names,
          address: from,
        });
      }
    }

    const ensName = getNameEns(from);

    transfer.forEach(() => {
      if (isScammer || ens?.scammer) {
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
