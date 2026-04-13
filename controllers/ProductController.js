// esse aqui é o cerebro do nosso projeto
//o controler agora tem uma regra de negocio, mas não deve estar aqui tem que estar no sevices

// import Produto from "../models/Produto.js";

// agora ele conversa com o service, pois la esta as regras de negocio

// agora que começamos com POO vamos criar uma class

//estamos fazendo um método ao inves de uma função

import ProductService from "../services/ProductService.js";

class ProductController {
  async index(req, res, next) {
    try {
      const produtos = await ProductService.listar();
      res.json(produtos);
    } catch (error) {
      // next () -> ele é chamado para passar para o proximo middleware ou rota
      next(error); // next é uma função que vamos utilizar para chamar o errorHandler
    }
  }

  async store(req, res, next) {
    try {
      await ProductService.criarProduto(req.body);
      res.status(201).json({ message: "Produto cadastrado com sucesso:" });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      await ProductService.atualizar(id, req.body);
      res.status(201).json({ message: "Produto atualizado com sucesso!" });
      // Mandamos com status quando queremos ver o status da resposta se foi bem sucedida ou não
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      await ProductService.deletar(id);
      res.status(201).json({ message: "Produto removido com sucesso!" });
      // Mandamos com status quando queremos ver o status da resposta se foi bem sucedida ou não
    } catch (error) {
      next(error);
    }
  }
}

// async function index (req, res){
//     try{
//         const produtos = await Produto.getAllProducts();
//         return res.json(produtos);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: "Erro ao buscar produtos"});
//     }
// }

// async function destroy(req, res){
//     try {
//         const {id}= req.params;

//         await Produto.deleteProduct(id);
//         res.status(200).json({message: "Produto removido com sucesso"})
//     } catch (error) {
//         res.json({message: "Erro ao remover produto!"})
//     }
// }

// export default {index, store, update, destroy}

export default new ProductController();
