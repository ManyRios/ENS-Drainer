import { suspiciosEnsAddress } from "./constants";

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
