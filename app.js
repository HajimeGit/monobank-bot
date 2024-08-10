const express = require("express");
const cc = require("currency-codes");

const app = express();

const port = 3000;

const bot = require("./src/telegram/bot");

app.use(express.json());

app.listen(port, () => {
  console.log("Running...");
});

app.get("/", (req, res) => {
  res.send("200");
});

app.post("/", (req, res) => {
  const data = req.body?.data;
  if (data?.account && data.account === "card_account") {
    const statementItem = data?.statementItem;
    const currencyCode = statementItem?.currencyCode;
    const balance = parseNumber(statementItem?.balance, currencyCode);
    const description = statementItem?.description;
    const amount = parseNumber(statementItem?.amount, currencyCode);

    bot.sendMessage(
      "chat_id",
      amount + "\n" + description + "\n" + "Баланс " + balance
    );
  }
  res.send("200");
});

function parseNumber(input, currencyCode) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: cc.number(currencyCode).code,
  }).format(input / 100);
}
