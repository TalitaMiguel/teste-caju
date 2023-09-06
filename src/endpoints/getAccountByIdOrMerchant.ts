import { Account } from "../types/account";
import { accounts } from "../data/accounts";
import { Request, Response } from "express";

// Pesquisa uma conta por ID ou Merchant
export const getAccountByIdOrMerchant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, merchant } = req.query;

    if (!id && !merchant) {
      res.statusCode = 422;
      throw new Error("Informe 'ID' ou 'Merchante'.");
    }

    const valueParams: string | number =
      Number(id) || String(merchant).toLowerCase();

    const accountIndex: number = accounts.findIndex((account) =>
      typeof valueParams === "number"
        ? account.accountId === valueParams
        : account.merchant === valueParams
    );

    const account: Account = accounts[accountIndex];

    if (!account) {
      res.statusCode = 404;
      throw new Error("Conta não localizada.");
    }

    res.status(200).send(account);
  } catch (error: any) {
    res.status(res.statusCode).send(error.message);
  }
};
