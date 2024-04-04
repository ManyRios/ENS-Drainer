import { ethers } from "forta-agent";
import { regex } from "./constants";
import { suspiciosEnsAddress } from "./drainers-services";

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

/*
// This will works with a appropiate api-key
export const getEnsName = async (address: string) => {
  const prov = new ethers.providers.InfuraProvider(1);
  const ens = await prov.lookupAddress(address);

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

// This should work with an etherscan api pro
 export const getNameTag = async (address: string) => {
  console.log("called");
  const req = `https://api-metadata.etherscan.io/v1/api.ashx?module=nametag&action=getaddresstag&address=${address}&apikey=T9BY4IGBKHRDYUQE4XUMCZX4QERTCGRM85`;
  const res = await axios.get(req);
  console.log(res.data);
  return res;
}; */
