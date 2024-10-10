const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const Product = require('./models/Product');
const routes = require('./routes/productRoutes')


const app = express();
const port = 3000; 

app.use(cors());
app.use(express.json());

app.use('/', routes)


sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
