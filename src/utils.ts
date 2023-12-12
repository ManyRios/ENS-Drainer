import { suspiciosEnsAddress } from "./constants";

export const isScammerTransaction = (address: string) => {
    for (const ens of suspiciosEnsAddress) {
      if (ens.address === address) {
        return true;
      }
    }
    return false;
  };
  
export   const getNameEns = (address: string) => {
    for (const ens of suspiciosEnsAddress) {
      if (ens.address === address) return ens.name;
    }
    return "error";
  };