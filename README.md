# ENS Drainer

## Description

This agent detects ENS registration and captures suspicios names and their transactions. 

## Supported Chains

- Ethereum
- Optimism
- BNB Smart Chain
- Polygon
- Fantom
- Arbitrum
- Avalanche

## Alerts

Describe each of the type of alerts fired by this agent

- ENSREG
  - Fired when a ENS is registered with a suspicios name
  - Severity is always set to "info" (mention any conditions where it could be something else)
  - Type is set to "suspicious" and "Scam" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert


- ENSDrainT
  - Fired when a suspicios ENS makes a transactionFrom 
  - Severity is always set to "info" 
  - Type is set to "suspicious" and "Scam" 
  - Mention any other type of metadata fields included with this alert

## Test Data

The agent behaviour can be verified with the following transactions:
  
- ENS registration: 
  - 0xd83e53de5aa0319ad2486348255732a9f1709283f3ef114b71d594831ef5cb19 (inferno-drainer-3)
  - 0x035bf06479081631705bfeed242037c95c9c8434a2a7aea545d792581d9dd351 (inferno-drainer-1)
  - 0xd5bb74281fa39f0f225311e3f74224360c988454260fa1938cdebd3d468d8179 (ghostdrainer)

- Transactions from suspicious ENS: 
  - 0xab1a0f4b0f3821792d592f91b1062fe4eb784e022e5ba28a2309bfbff72175cf (transferfrom LINK tokens)
