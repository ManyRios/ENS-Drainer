import { HandleTransaction, ethers, keccak256 } from "forta-agent";
import { createAddress } from "forta-agent-tools";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import { createEnsFindigRegistration } from "../findings";
import { ensRegistrationFunc } from "../constants";
import ensRegistration from "../ens-registration";

const { utils } = ethers;

const addr1 = createAddress("0x001");
const addr2 = createAddress("0x002");

const testRegisIFace = new utils.Interface([ensRegistrationFunc]);

const testCases: any[][] = [
  [
    "anything-ens",
    addr1,
    Date.now(),
    keccak256("10"),
    createAddress("0x300"),
    [utils.randomBytes(256)],
    true,
    0,
  ],
  [
    "drainer-hack-ens",
    addr2,
    Date.now(),
    keccak256("10"),
    createAddress("0x300"),
    [utils.randomBytes(256)],
    true,
    0,
  ],
];

const encodedRegCalls: string[] = [
  testRegisIFace.encodeFunctionData("register", testCases[0]),
  testRegisIFace.encodeFunctionData("register", testCases[1]),
];

describe("ENS Registration Agent", () => {
  let handleTransaction: HandleTransaction;

  beforeAll(async () => {
    handleTransaction = ensRegistration.handleTransaction;
  });

  it("return empty finding if no registration ens is captured", async () => {
    const txEv = new TestTransactionEvent();

    const findings = await handleTransaction(txEv);
    expect(findings).toStrictEqual([]);
  });

  it("Captures a ENS registration but not a suspect", async () => {
    const txEv = new TestTransactionEvent().setFrom(addr2).addTraces({
      to: createAddress("0x045"),
      function: ensRegistrationFunc,
      arguments: testCases[0],
    });
    const func = txEv.filterFunction(ensRegistrationFunc);
    const ensName = func[0].args.name;
    const owner = func[0].args.owner;

    expect(ensName).toStrictEqual(testCases[0][0]);
    expect(owner).toStrictEqual(testCases[0][1]);
    const findings = await handleTransaction(txEv);
    expect(findings).toStrictEqual([]);
  });

  it("Captures a suspicious ENS", async () => {
    const txEv = new TestTransactionEvent().setFrom(addr2).addTraces({
      to: createAddress("0x045"),
      function: ensRegistrationFunc,
      arguments: testCases[1],
    });
    const func = txEv.filterFunction(ensRegistrationFunc);
    const ensName = func[0].args.name;

    const findings = await handleTransaction(txEv);
    expect(ensName).toStrictEqual(testCases[1][0]);
    expect(findings).toStrictEqual([
      createEnsFindigRegistration(testCases[1][0], testCases[1][1], "0x"),
    ]);
  });
});
