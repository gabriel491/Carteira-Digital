const express = require("express");
const UserModel = require("../src/models/user.model");

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views/');

// Middleware para logar as requisições
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers['content-type']}`);
  console.log(`Date: ${new Date()}`);
  
  next();
})

app.get("/views/users", async (req, res) => {
  const users = await UserModel.find({})

  res.render("index", { users })
})

// Home
app.get("/home", (req, res) => {
  res.send("<h1>Bem Vindo a Home</h1>");
});

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