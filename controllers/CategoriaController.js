// cerebro do nosso projeto 

import Categoria from '../models/Categoria.js'

async function indexCategoryy (req, res){
    try{
        const categoria = await Categoria.getAllCategoryy();
        return res.json(categoria);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar categoria"});
    }
}

async function storeCategoryy(req, res) {
    try {
        const categoria = req.body;

        await Categoria.createCategoryy(categoria);
        res.status(201).json({message: "Categoria cadastradaa com sucesso!"});

    } catch (error){
        res.status(500).json({error: "Erro ao criar categoria"});
    }
}

async function updateCategoryy(req, res){
    try {
        const categoria = req.body;
        const { id } = req.params;
        console.log ("oi funciona")

        await Categoria.updateCategoryy(id, categoria);
        res.status(201).json({message: "Categoria atualizada com sucesso!"})
        //status da resposta se foi bem sucedida ou não
    } catch (error) {
        res.json({error: "Erro ao atualizar categoria!!!!!"})
    }
}

async function destroyCategoryy(req, res){
    try {
        const {id}= req.params;

        await Categoria.deleteCategoryy(id);
        res.status(200).json({message: "Categoria removida com sucesso"})
    } catch (error) {
        res.json({message: "Erro ao remover categoria!"})
    }
}

// coloquei categoryyyy na frente
export default {indexCategoryy, storeCategoryy, updateCategoryy, destroyCategoryy}

// node moon server.js