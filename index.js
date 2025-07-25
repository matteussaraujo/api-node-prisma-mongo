/*
require = requisitando, pegando uma biblioteca
response = resposta
Get = Listar
Post = Criar
Put = Atualizar/Editar
Delete = Deletar
foi guardado o express dentro da variavel app

mateusdev36
GxEm8siuPeYpQkhh

*/

/*
para executar: node --watch index.js
para verificar os dados no prima studio: npx prisma studio
*/
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
const porta = 3000;

// Criar usuario
app.post("/usuarios", async (req, res) => {
  const { name, email, telefone } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      telefone,
    },
  });

  return res.status(200).send(user);
});

// deletar usuario

app.delete("/deletarUsuario/:id", async (req, res) => {
  const id = req.params.id;
  const userDeleted = await prisma.user.delete({
    where: { id },
  });
  return res.status(200).send(userDeleted);
});

// rota para listar usuarios no banco
app.get("/listarUsuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).send(users);
});

// editar usuario
app.put("/editarUsuario/:id", async (req, res) => {
  const id = req.params.id;
  const { name, telefone, email } = req.body;
  const usuarioAtualizado = await prisma.user.update({
    where: { id },
    data: {
      name,
      telefone,
      email,
    },
  });
  return res.status(200).send(usuarioAtualizado);
});

app.listen(porta, () => {
  console.log("Servidor rodando na porta " + porta);
});
