import { Finding, FindingSeverity, FindingType } from "forta-agent";

export const createEnsFindigRegistration = (
  name: string,
  from: string,
  txHash: string
) => {
  return Finding.fromObject({
    name: `Suspicious ENS Register`,
    description: `A ENS has been registered with the name ${name}`,
    alertId: "ENSREG",
    protocol: "ENS",
    severity: FindingSeverity.Info,
    type: FindingType.Suspicious && FindingType.Scam,
    metadata: {
      from,
      txHash: txHash,
    },
  });
};

export const createTransferFromFinding = (
  name: string,
  from: string,
  txHash: string,
  victim: string,
  value: string,
  to: string
) => {
  return Finding.fromObject({
    name: `Transfer from ENS`,
    description: `A transfer has been made from ${name} The victim is the address: ${victim} for a value of its assets: ${value} the funds has been sent to the address ${to}`,
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
  txHash: string,
  victim: string,
  value: string,
) => {
  return Finding.fromObject({
    name: `Transfer ENS`,
    description: `A transfer has been made from ${name} The victim is the address: ${victim} for a value of its assets: ${value} the funds has been sent to a unknow address`,
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
