import { ethers } from "forta-agent";
import { regex, suspiciosEnsAddress } from "./constants";

export const isScammerTransaction = (address: string) => {
  for (const ens of suspiciosEnsAddress) {
    if (ens.address.toLowerCase() === address.toLowerCase()) {
      return true;
    }
  }
  return false;
};

export const getNameEns = (address: string) => {
  for (const ens of suspiciosEnsAddress) {
    if (ens.address.toLowerCase() === address.toLowerCase()) return ens.name;
  }
  return "error";
};

// This will works with a appropiate api-key
export const getEnsName = async (address: string) => {
  const prov = new ethers.providers.InfuraProvider(1);
  const ens = await prov.lookupAddress(address);
  console.log(ens);
  if (ens) {
    const scammer = regex.test(ens.toString().toLowerCase());
    if (scammer) {
      return {
        ens,
        scammer,
      };
    }
  }
};
