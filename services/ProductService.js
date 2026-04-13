// ele ta recebendo os dados que o front end envia

//recebendo as regras de negocio, são 'excessoes'

//define o que pode ou nao pode acontecer
//ele vai fazer alguma coisa acontecer mesmo sem existir
//não pode existir estoque negativo,

import ProductModel from "../models/ProductModel.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js";
import CategoryModel from "../models/CategoryModel.js";
import {
  validarCamposObrigatorios,
  validarPreco,
  validarEstoque,
} from "../validators/product.validator.js";

class ProdutoService {
  async listar() {
    return await ProductRepository.getAll();
  }

  async criarProduto(data) {
    //depois de validar os campos vamos criar o produto
    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);
    let categoria = await CategoryRepository.getById(data.categoria_id);

    if (!categoria) {
      throw new Error("Categoria não existeeee");
    }

    // if (destaque === 1) {
    // }

    if (categoria.status === 0) {
      throw new Error(
        "Não é possivel cadastrar produto em categoria desativada!!!",
      );
    }

    // console.log(data.destaque);

    if (data.destaque) {
      //contando a quantidade de produtos em destaque
      const totalDestaques = await ProductRepository.countDestaques();

      // se a quantidade de produtos for maior ou igual a 5 ja tem
      // muito produto em destaque
      if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaque atingido ");
      }
    }

    //model -> cuidada estrutura dos dados
    const produto = new ProductModel(data);

    // repository -> cuida do banco(INSERT, UPDATE, SELECT)
    //se o produto nao for em destaque vai cair aqui
    return await ProductRepository.createProduct(produto);
  }

  async atualizar(id, data) {
    if (!id) {
      throw new Error("ID do produto é OBRIGATÓRIOOO");
    }

    const produtoAtual = await ProductRepository.getById(id);

    if (!produtoAtual) {
      throw new Error("Produto não encontrado!");
    }

    if (data.categoria_id) {
      const categoria = await CategoryRepository.getById(data.categoria_id);

      if (!categoria || categoria.status === 0) {
        throw new Error("Categoria invalida ou desativada!!!");
      }
    }

    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);

    if (data.destaque && !produtoAtual.destaque) {
      const totalDestaques = await ProductRepository.countDestaques();

      if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaques foi atingido!");
      }
    }

    const produto = new ProductModel(data);

    return await ProductRepository.updateProduct(id, produto);
  }

  async deletar(id) {
    if (!id) {
      throw new Error("ID do produto é obrigatório");
    }

    return await ProductRepository.deleteProduct(id);
  }
}

export default new ProdutoService();
