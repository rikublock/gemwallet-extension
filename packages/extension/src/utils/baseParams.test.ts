import {
  getBaseFromParams,
  initialBaseTransactionParams,
  parseBaseParamsFromStoredData,
  parseBaseParamsFromURLParams,
  parseBaseParamsFromURLParamsNew
} from './baseParams';

describe('parseBaseParamsFromURLParamsNew', () => {
  it('should parse all values correctly', () => {
    const params = new URLSearchParams({
      fee: '10',
      sequence: '1',
      accountTxnID: '12345',
      lastLedgerSequence: '1000'
    });

    const result = parseBaseParamsFromURLParamsNew(params);

    expect(result.fee).toEqual('10');
    expect(result.sequence).toEqual(1);
    expect(result.accountTxnID).toEqual('12345');
    expect(result.lastLedgerSequence).toEqual(1000);
  });

  it('should return undefined for missing values', () => {
    const params = new URLSearchParams({});

    const result = parseBaseParamsFromURLParamsNew(params);

    expect(result.fee).toBeUndefined();
    expect(result.sequence).toBeUndefined();
    expect(result.accountTxnID).toBeUndefined();
    expect(result.lastLedgerSequence).toBeUndefined();
  });
});

describe('parseBaseParamsFromURLParams', () => {
  it('should return the parsed base parameters from URL params', () => {
    const params = new URLSearchParams({
      fee: '20',
      sequence: '10',
      accountTxnID: 'id',
      lastLedgerSequence: '500',
      memos: JSON.stringify([{ type: 'text', data: 'test' }]),
      signers: JSON.stringify([
        { signer: { account: 'account1', txnSignature: 'sig', signingPubKey: 'key' } }
      ]),
      sourceTag: '0',
      signingPubKey: 'publicKey',
      ticketSequence: '1',
      txnSignature: 'signature'
    });

    // assuming checkFee, parseMemos, parseSigners work as expected
    const result = {
      fee: '20',
      sequence: 10,
      accountTxnID: 'id',
      lastLedgerSequence: 500,
      memos: [{ type: 'text', data: 'test' }],
      signers: [{ signer: { account: 'account1', txnSignature: 'sig', signingPubKey: 'key' } }],
      sourceTag: 0,
      signingPubKey: 'publicKey',
      ticketSequence: 1,
      txnSignature: 'signature'
    };

    expect(parseBaseParamsFromURLParams(params)).toEqual(result);
  });

  test('should handle null or undefined URL parameters', () => {
    const urlParams = new URLSearchParams();

    const result = parseBaseParamsFromURLParams(urlParams);

    expect(result).toEqual(initialBaseTransactionParams);
  });
});

describe('getBaseFromParams', () => {
  test('should get base transaction parameters from an object', () => {
    const params = {
      fee: '10',
      sequence: 1,
      accountTxnID: '123',
      lastLedgerSequence: 100,
      memos: ['memo1', 'memo2'],
      signers: ['signer1', 'signer2'],
      sourceTag: 2,
      signingPubKey: 'publicKey',
      ticketSequence: 3,
      txnSignature: 'signature'
    };

    const result = getBaseFromParams(params);

    expect(result).toEqual(params);
  });

  test('should handle undefined parameters', () => {
    const params = {};

    const result = getBaseFromParams(params);

    expect(result).toEqual({
      fee: undefined,
      sequence: undefined,
      accountTxnID: undefined,
      lastLedgerSequence: undefined,
      memos: undefined,
      signers: undefined,
      sourceTag: undefined,
      signingPubKey: undefined,
      ticketSequence: undefined,
      txnSignature: undefined
    });
  });
});

describe('parseBaseParamsFromStoredData', () => {
  it('should parse all values correctly', () => {
    const storedObject = {
      fee: '12',
      sequence: '2',
      accountTxnID: 'abc123',
      lastLedgerSequence: '3456',
      memos: ['memo1'],
      signers: ['signer1'],
      sourceTag: '1',
      signingPubKey: 'pubKey1',
      ticketSequence: '1',
      txnSignature: 'txnSig1'
    };

    const result = parseBaseParamsFromStoredData(storedObject);

    expect(result.fee).toEqual('12');
    expect(result.sequence).toEqual(2);
    expect(result.accountTxnID).toEqual('abc123');
    expect(result.lastLedgerSequence).toEqual(3456);
    expect(result.memos).toEqual(['memo1']);
    expect(result.signers).toEqual(['signer1']);
    expect(result.sourceTag).toEqual(1);
    expect(result.signingPubKey).toEqual('pubKey1');
    expect(result.ticketSequence).toEqual(1);
    expect(result.txnSignature).toEqual('txnSig1');
  });

  it('should return undefined for missing values', () => {
    const storedObject = {};

    const result = parseBaseParamsFromStoredData(storedObject);

    expect(result.fee).toBeUndefined();
    expect(result.sequence).toBeUndefined();
    expect(result.accountTxnID).toBeUndefined();
    expect(result.lastLedgerSequence).toBeUndefined();
    expect(result.memos).toBeUndefined();
    expect(result.signers).toBeUndefined();
    expect(result.sourceTag).toBeUndefined();
    expect(result.signingPubKey).toBeUndefined();
    expect(result.ticketSequence).toBeUndefined();
    expect(result.txnSignature).toBeUndefined();
  });
});
