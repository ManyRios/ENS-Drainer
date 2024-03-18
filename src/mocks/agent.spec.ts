import { HandleTransaction, createTransactionEvent, ethers, keccak256 } from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import { provideHandleTransaction } from "../agent";
import { transferFunctions, ensRegistrationFunc } from "../constants";
import { createAddress } from "forta-agent-tools";


const {utils} = ethers;
const testTransferIFace = new utils.Interface([transferFunctions[0]]);
const testEnsRegisIFace = new utils.Interface([ensRegistrationFunc]);

const addr1 = createAddress('0x001');
const addr2 = createAddress('0x002');

const testCases: any[][] = [
  ["0x8413c544095f7e69d4ad3bfcf4b77deedda0cc39", addr2, 100],
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
    testTransferIFace.encodeFunctionData("transferFrom", testCases[0]),
    testEnsRegisIFace.encodeFunctionData("register", testCases[1]),
  ];

describe("the Agent listen and filter the functions triggered", () => {
  let handleTransaction: HandleTransaction;

  const mockTransaction = {
    handleTransaction: jest.fn(),
  };
  const mockEnsRegistration = {
    handleTransaction: jest.fn(),
  };

  const mockTxEvent = createTransactionEvent({
    transaction: { hash: "" },
  } as TestTransactionEvent);

  beforeAll(async () => {
    handleTransaction = provideHandleTransaction(
        mockTransaction,
        mockEnsRegistration,
      );
  });

  it("Test the Agent", async () => {
    const mockFinding = { some: "finding" };
  
    mockEnsRegistration.handleTransaction.mockReturnValueOnce([mockFinding])
    mockTransaction.handleTransaction.mockReturnValueOnce([mockFinding])



      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([mockFinding, mockFinding])

    expect(mockEnsRegistration.handleTransaction).toHaveBeenCalledTimes(1)
    expect(mockEnsRegistration.handleTransaction).toHaveBeenCalledWith(mockTxEvent) 

    expect(mockTransaction.handleTransaction).toHaveBeenCalledTimes(1)
    expect(mockTransaction.handleTransaction).toHaveBeenCalledWith(mockTxEvent)
 })
  
});
