import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { createEnsFindigRegistration } from "./findings";
import { ensRegistrationFunc, suspiciosEnsAddress, regex } from "./constants";

const provideHandleTransaction = (): HandleTransaction => {
  return async function handlerTransaction(
    txEv: TransactionEvent
  ): Promise<Finding[]> {
    const findings: Finding[] = [];
    const getEns = txEv.filterFunction(ensRegistrationFunc);

    if (!getEns) return findings;

    const { from, hash } = txEv;

    getEns.forEach((ens) => {
      const { name, owner } = ens.args;
      const identify = regex.test(name.toLowerCase());
      // If the owner changes the name the address will be the same
      if (identify) {
        findings.push(createEnsFindigRegistration(name, from, hash));
        suspiciosEnsAddress.push({
          name: name,
          address: owner,
        });
      }
    });

    return findings;
  };
};

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};
