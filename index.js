const dotenv = require('dotenv')
dotenv.config()

const connectToDatabase = require('./src/database/connect')
const app = require('./modules/express')

const PORT = process.env.PORT || 3000

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}

start()