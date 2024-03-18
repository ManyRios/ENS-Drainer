import { Suspects } from "./types";

export const regex = new RegExp(
  "(?:inferno|drainer|fake|scam|rob|steal|hack|stealyourmoney)(.eth)?",
  "i"
);

// Initial list of well know ENSDrainers services
export let suspiciosEnsAddress: Suspects[] = [
  {
    name: "inferno-drainer-1",
    address: "0x8413c544095f7e69d4ad3bfcf4b77deedda0cc39",
  },
  {
    name: "inferno-drainer-2",
    address: "0xfb4d3eb37bde8fa4b52c60aabe55b3cd9908ec73",
  },
  {
    name: "inferno-drainer-3",
    address: "0x00001f78189bE22C3498cFF1B8e02272C3220000",
  },
  {
    name: "inferno-drainer-4",
    address: "0x00001f78189be22c3498cff1b8e02272c3220000",
  },
  {
    name: "Fake_Phishing188246",
    address: "0x53d0E4dAb3E125dd25EcfB24Ca610075Fa9bC8e1",
  },
  {
    name: "Fake_Phishing182232",
    address: "0x0000553f880ffa3728b290e04e819053a3590000",
  },
];

export const ensRegistrationFunc =
  "function register(string name,address owner,uint256 duration,bytes32 secret,address resolver,bytes[] data,bool reverseRecord,uint16 ownerControlledFuses)";

export const transferFunctions = [
  "function transferFrom(address from,address to,uint256 value)",
  "function transfer(address from,address to,uint256 value)",
  "function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
];

export const transferEvent = [
  "event Transfer(address indexed from, address indexed to, uint value)",
];

export const ensRegisterEvent =
  "event NameRegistered(string name,bytes32 label,address owner, uint256 baseCost, uint256 premium, uint256 expires)";

export const multicall = ["function multicall(tuple[] calls)"];
