const express = require('express');
const Product = require('../models/Product');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});


router.post('/add', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log('Produto adicionado:', product);
        
        res.status(201).json({
            product, 
            redirectUrl: '/' 
        });

    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
});



router.delete('/delete/:id', async(req,res) => {
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

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        await product.update({ name, price, description, quantity });
        res.status(200).json({ message: 'Produto atualizado com sucesso' });
        
    } catch (error) {
        console.error('Erro ao atualizar produto', error);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

router.get('/produtos/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const product = await Product.findByPk(id); 
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' }); 
        }
        res.status(200).json(product); 
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
});


module.exports = router