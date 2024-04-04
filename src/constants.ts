export const regex = new RegExp(
  "(?:inferno|drainer|fake|scam|monkey|phishing|pink|angel|pussy|venom|ms)(.eth)?",
  "i"
);

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





