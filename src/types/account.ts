export type Transaction = {
  transactionId: string | number;
  amount: string | number;
  merchant: string;
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
