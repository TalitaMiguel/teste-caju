export type Transaction = {
  transactionId: string | number;
  accountId: string | number;
  amount: string | number;
  merchant: string;
  mcc: number;
  reason?: string;
  description: string;
  statusTransaction: string;
};

export type Account = {
  accountId: number;
  merchant: string;
  balance: {
    food: number;
    meal: number;
    cash: number;
  };
  statement: Array<Transaction>;
};
