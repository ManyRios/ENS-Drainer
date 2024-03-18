import { Finding, TransactionEvent } from "forta-agent";
import ensRegistration from "./ens-registration";
import transactions from "./transactions";
import { Agent } from "./types";

export const provideHandleTransaction = (
  ensRegistration: Agent,
  transactions: Agent
) => {
  return async (txEv: TransactionEvent): Promise<Finding[]> => {
    const findings = (
      await Promise.all([
        ensRegistration.handleTransaction(txEv),
        transactions.handleTransaction(txEv),
      ])
    ).flat();

    return findings;
  };
};

module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(ensRegistration, transactions),
};
