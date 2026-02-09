// esse aqui é o cerebro do nosso projeto 

import Produto from '../models/Produto.js'

async function index (req, res){
    try{
        const produtos = await Produto.getAllProducts();
        return res.json(produtos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar produtos"});
    }
}


// Criando uma função de criar um produto
async function store(req, res) {
    try {
        const produto = req.body;

        await Produto.createProduct(produto);
        res.status(201).json({message: "Produto cadastrado com sucesso!"});

    } catch (error){
        res.status(500).json({error: "Erro ao criar produto"});
    }
}

async function update(req, res){
    try {
        const produto = req.body;
        const { id } = req.params;

        await Produto.updateProduct(id, produto);
        res.status(201).json({message: "Produto atualizado com sucesso!"})
        // Mandamos com status quando queremos ver o status da resposta se foi bem sucedida ou não
    } catch (error) {
        res.json({error: "Erro ao atualizar produto!"})
    }
}

async function destroy(req, res){
    try {
        const {id}= req.params;

        await Produto.deleteProduct(id);
        res.status(200).json({message: "Produto removido com sucesso"})
    } catch (error) {
        res.json({message: "Erro ao remover produto!"})
    }
}

export default {index, store, update, destroy}

