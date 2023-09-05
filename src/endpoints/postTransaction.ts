import { accounts } from "../data/accounts";
import { balanceIdentifier } from "../services/balanceIdentifier";
import { Request, Response } from "express";
import { Account, Transaction } from "../types/account";
import shortid from "shortid";

export const postTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { accountId, amount, merchant, mcc } = req.body;
    const balanceType: "food" | "meal" | "cash" = balanceIdentifier(mcc);
    const transactionId: string = shortid.generate();

    // Validação das informações recebidas
    if (!accountId || !amount || !merchant || !mcc) {
      res.statusCode = 422;
      throw new Error("Necessário informar todos os campos.");
    }

    // Validação do ID 
    const accountIndex: number = accounts.findIndex(
      (account) => account.accountId === accountId
    );

    if (accountIndex < 0) {
      res.statusCode = 404;
      throw new Error("ID não encontrado.");
    }

    // Validação se o nome do estabelecimento é o mesmo do ID da conta. 
    const checkMerchant: number = accounts.findIndex((account) => {
      if (accountIndex >= 0) {
        return (
          account.accountId === accountId &&
          account.merchant === String(merchant).toLowerCase()
        );
      }
    });

    if (checkMerchant < 0) {
      res.statusCode = 404;

      throw new Error(
        "Campos 'accountId' e  'merchant' devem ser do mesmo estabelecimento."
      );
    }


    const account: Account = accounts[accountIndex];

    if (accountIndex < 0) {
      res.statusCode = 404;

      throw new Error(
        "Não foi possível realizar a transação, conta não encontrada."
      );
    }

    // Verifica Saldo nas contas: Food, Meal ou Cash
    if (Math.abs(amount) > account.balance[`${balanceType}`]) {
      res.statusCode = 406;

      const newTransaction: Transaction = {
        transactionId,
        accountId,
        amount: -amount,
        merchant,
        mcc,
        statusTransaction: "Rejeitado",
        reason: "Saldo insuficiente",
        description: `Débito de ${amount} no saldo ${balanceType} não efetuado.`,
      };

      account.statement.push(newTransaction);
      throw new Error("Saldo insuficiente");
    }

    // Transação Aprovada
    const newTransaction: Transaction = {
      transactionId,
      accountId,
      amount: -amount,
      merchant,
      mcc,
      statusTransaction: "Aprovado",
      description: `Débito de ${amount} no saldo ${balanceType} efetuado.`,
    };

    account.statement.push(newTransaction);

    // Atualiza saldo das contas: Food, Meal ou Cash
    account.balance[`${balanceType}`] =
      account.balance[`${balanceType}`] - amount;

    res.status(200).send("Transação realizada com sucesso.");
  } catch (error: any) {
    res.status(res.statusCode).send(error.message);
  }
};
