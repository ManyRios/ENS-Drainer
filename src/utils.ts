import { regex, suspiciosEnsAddress } from "./constants";
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

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

export const getEnsName = async (address: string) => {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })
  
  const addr = address.replace(/^0x/, "")
  const names = await client.getEnsName({
    address: `0x${addr}`,
  })

  if(names){
    const scammer = regex.test(names.toLowerCase())
    if(scammer){
      return {
        names, 
        scammer
      }
    }    
  }
}