const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find(
    (customer) => customer.cpf === cpf
  );

  if (!customer) {
    return res.status(400).json({
      message: "Customer not found",
    });
  }

  req.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce(
    (acc, operation) => {
      if (operation.type === "credit") {
        return acc + operation.amount;
      } else {
        return acc - operation.amount;
      }
    }, 0
  )

  return balance;
}

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const costumerAlreadyExists = !!customers.some(
    (customer) => customer.cpf === cpf
  );

  if (costumerAlreadyExists) {
    return res.status(400).json({
      message: "Customer already exists",
    });
  }

  customers.push({
    cpf, name, id: uuidv4(), statement: [],
  })

  return res.status(201).send();
});

app.use(verifyIfExistsAccountCPF);

app.post("/deposit", (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  }

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

app.post("/withdraw", (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  const isAmountAvaliable = balance >= amount;

  if (!isAmountAvaliable) {
    return res.status(400).json({
      message: "Amount is not avaliable",
    });
  }

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "withdraw",
  }

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

app.get("/statement", (req, res) => {
  const { customer } = req;

  return res.status(200).json({
    statement: customer.statement,
  });
});

app.get("/statement/date", (req, res) => {
  const { date } = req.query;
  const { customer } = req;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (operation) => operation.created_at.toDateString() === new Date(dateFormat).toDateString(),
  );

  return res.status(200).json({
    statement,
  });
});

app.put("/account", (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(201).send();
});

app.get("/account", (req, res) => {
  const { customer } = req;

  return res.status(200).json({
    customer,
  });
});

app.delete("/account", (req, res) => {
  const { customer } = req;

  const customerIndex = customers.findIndex(
    curCustomer => curCustomer.cpf === customer.cpf
  );

  const deletedCustomer = customers.splice(customerIndex, 1)[0];

  return res.status(200).json({
    message: `Customer ${deletedCustomer.name} has been deleted!`,
  });
});

app.listen(3333);
