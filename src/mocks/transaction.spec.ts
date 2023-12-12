import { HandleTransaction, ethers } from "forta-agent";
import { createAddress } from "forta-agent-tools";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import { createTransferFromFinding } from "../findings";
import { transferFunction } from "../constants";
import transactions from "../transactions";
import { isScammerTransaction, getNameEns } from "../utils";

const { utils } = ethers;

const addr1 = createAddress("0x001");
const addr2 = createAddress("0x002");

const testTransferIFace = new utils.Interface([transferFunction[0]]);

const testCases: any[][] = [
  [addr1, addr2, 100],
  ["0x8413c544095f7e69d4ad3bfcf4b77deedda0cc39", addr2, 100],
];

const encodedSwapCalls: string[] = [
  testTransferIFace.encodeFunctionData("transferFrom", testCases[0]),
  testTransferIFace.encodeFunctionData("transferFrom", testCases[1]),
];

describe("Transfer Agent", () => {
  let handleTransaction: HandleTransaction;

  beforeAll(async () => {
    handleTransaction = transactions.handleTransaction;
  });

  it("returns an empty finding if not a transaction", async () => {
    const txEv = new TestTransactionEvent();

    const findings = await handleTransaction(txEv);
    expect(findings).toStrictEqual([]);
  });

  it("returns an empty finding if the transaction was not carried out by an ENS scammer", async () => {
    const txEv = new TestTransactionEvent()
      .setFrom(testCases[0][0])
      .setTo(testCases[0][1])
      .addTraces({
        from: testCases[0][1],
        function: transferFunction[0],
        arguments: testCases[0],
      });

    const transfer = txEv.filterFunction(transferFunction);
    const isScammer = isScammerTransaction(transfer[0].args.owner);
    expect(isScammer).toBeFalsy;
    const findings = await handleTransaction(txEv);
    expect(findings).toStrictEqual([]);
  });

  it("Finding for a scammer ENS Drainer address listed", async () => {
    const txEv = new TestTransactionEvent()
      .setFrom(testCases[1][0])
      .setTo(testCases[1][1])
      .addTraces({
        function: transferFunction[0],
        arguments: testCases[1],
      });


    const findings = await handleTransaction(txEv);
    const transfer = txEv.filterFunction(transferFunction);
    const {from, to } = transfer[0].args
    const isScammer = isScammerTransaction(from);
    const ensName = await getNameEns(from.toLowerCase())
    
    expect(isScammer).toBeTruthy;
    expect(findings).toEqual([createTransferFromFinding(ensName, from.toLowerCase(), to, '0x' )]);
  });
});
