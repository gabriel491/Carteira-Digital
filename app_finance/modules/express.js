const express = require('express');
const cors = require('cors');
const ExpenseModel = require("../src/models/expenseControl.model");
const UserModel = require("../src/models/user.model");

const app = express();
// Libera o acesso ao Frontend
app.use(cors())
app.use(express.json());

// Home
app.get("/home", (req, res) => {
  res.send("<h1>Bem Vindo a Home</h1>");
});

// Criar nova despesa
app.post("/expenses", async (req, res) =>{
    try {
        const newExpense = await ExpenseModel.create(req.body)

        res.status(201).json(newExpense)
    } catch (error) {
        res.status(500).send("Erro ao salvar despesa: " + error.message)
    }
})

// Buscar todas as despesas de um usuário específico
app.get("/expenses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Filtra no banco de dados onde o campo 'user' seja igual ao ID recebido
        const expenses = await ExpenseModel.find({ user: userId });

        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).send("Erro ao buscar despesas: " + error.message)
    }
})

// Atualizar uma despesa por ID
// o :id que utilizamos nessa rota é o ID da despesa, não do usuário.
app.patch("/expenses/:id", async (req, res) => {
    try {
        // O req.body vai ser o que o usuário quer mudar (ex: { isPaid: true })
        // { new: true } faz o Mongoose retornar o documento já atualizado
        const updatedExpense = await ExpenseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).send("Erro ao atualizar despesa: " + error.message);
    }
})

// Deletar uma despesa por ID
// o :id que utilizamos nessa rota é o ID da despesa, não do usuário.
app.delete("/expenses/:id", async (req, res) => {
    try {
        const deletedExpense = await ExpenseModel.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).send("Despesa não encontrada");
        }

        res.status(200).json(deletedExpense);
    } catch {
        res.status(500).send("Erro ao deletar despesa: " + error.message);
    }
})


// ########################### Tabela de Usuários ###########################

// Listar todos os usuários
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message)
  }
});

// Listar um usuário por ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).send(error.message)

  }
})

// Atualizar um usuário por ID
app.patch("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(user)
  }catch (error) {
    res.status(500).send(error.message)
  }
})

// Deletar um usuário por ID
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)

    res.status(200).json(user)
  } catch (error) {
    return res.status(500).send(error.message)

  }
})

// Criar um novo usuário
app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .send(error.message)
  }
});

module.exports = app;