const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const Product = require('./models/Product');

const app = express();
const port = 3000; 

app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

app.post('/add', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log('Produto adicionado:', product);
        res.status(201).json(product);
		
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
});


app.delete('/delete/:id', async(req,res) => {
	const { id } = req.params;
	try {
		const deletedProduct = await Product.destroy({
			where: { id: id}
		})

		if(deletedProduct === 0){
			return res.status(404).json({error: 'Produto não encontrado'})
		}

		res.status(200).json({ message: 'Produto excluido com sucesso'})
	} catch (error) {
		console.error('Erro ao excluir produto:', error)
		res.status(500).json({ error: 'Erro ao excluir produto'})
	}
})

app.put('/update/:id', async(req,res) => {
	const { id } = req.params
	const { name, price, description, quantity } = req.body

	try {
		const updateProduct = await Product.update(
			{name, price, description, quantity},
			{where: { id: id}}
		)
		
		if(updateProduct[0] === 0 ){
			return res.status(404).json({ error: 'Produto não encontrado'})
		}

		res.status(200).json({ message: 'Produto atualizado com sucesso'})
		
	} catch (error) {
		console.error('Erro ao atualizar produto', error)
		res.status(500).json({error: 'Erro ao atualizar produto'})
	}
})

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
