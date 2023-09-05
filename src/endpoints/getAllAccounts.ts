import { Request, Response } from "express";
import { accounts } from "../data/accounts";

// Lista todas as contas
export const getAllAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!accounts.length) {
      res.statusCode = 404;
      throw new Error("Não há lista de contas cadastrada.");
    }

    res.status(200).send(accounts);
  } catch (error: any) {
    res.status(res.statusCode).send(error.message);
  }
};
