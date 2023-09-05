import { app } from "./app";
import { getAllAccounts } from "./endpoints/getAllAccounts";
import { postTransaction } from "./endpoints/postTransaction";
import { getAccountByIdOrMerchant } from "./endpoints/getAccountByIdOrMerchant";
import connectionTest from "./endpoints/connectionTest";

app.get("/connectionTest", connectionTest);

app.get("/accounts", getAllAccounts);
app.get("/accounts/byId", getAccountByIdOrMerchant);

app.post("/accounts/transaction", postTransaction);
