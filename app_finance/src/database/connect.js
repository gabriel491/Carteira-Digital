const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ac-mb1szbc-shard-00-00.h8itpx9.mongodb.net:27017,ac-mb1szbc-shard-00-01.h8itpx9.mongodb.net:27017,ac-mb1szbc-shard-00-02.h8itpx9.mongodb.net:27017/?ssl=true&replicaSet=atlas-rrdhji-shard-0&authSource=admin&appName=CursoNodeJsDicasParaDevs
      `,
    );
    console.log("Conexão efetuada com sucesso!");
  } catch (error) {
    console.log("Ocorreu um erro ao realizar a conexão! Erro: ", error);
  }
};

module.exports = connectToDatabase;