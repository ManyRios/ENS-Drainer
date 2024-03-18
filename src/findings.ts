import { Finding, FindingSeverity, FindingType } from "forta-agent";


export const createEnsFindigRegistration = (
    name: string,
    from: string,
    txHash: string,
) => {
    return Finding.fromObject({
      name: `Suspicious ENS Register`,
      description: `A ENS has been registered with the name ${name}`,
      alertId: "ENSREG",
      protocol: "ENS",
      severity: FindingSeverity.Info,
      type:  FindingType.Suspicious && FindingType.Scam,
      metadata: {
      from,
      txHash: txHash,
    }
    })
}

export const createTransferFromFinding = (
  name: string,
  from: string,
  txHash: string,
  to: string,
) => {
  return Finding.fromObject({
    name: `Transfer ENS`,
    description: `A transfer to other address has been made from a possible ENS Service Drainer ${name}`,
    alertId: "ENSDrainT",
    protocol: "ENS",
    severity: FindingSeverity.High && FindingSeverity.Critical,
    type: FindingType.Suspicious && FindingType.Scam,
    metadata: {
      from,
      to,
      txHash: txHash,
    },
  });
};

export const createTransferFromFindingWNto = (
  name: string,
  from: string,
  txHash: string
) => {
  return Finding.fromObject({
    name: `Transfer ENS`,
    description: `A transfer to other address has been made from a possible ENS Service Drainer ${name} to an unknow receiver`,
    alertId: "ENSDrainT",
    protocol: "ENS",
    severity: FindingSeverity.High && FindingSeverity.Critical,
    type: FindingType.Suspicious && FindingType.Scam,
    metadata: {
      from,
      txHash: txHash,
    },
  });
};
