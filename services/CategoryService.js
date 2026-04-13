import CategoryModel from "../models/CategoryModel.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js";

class CategoryService {
  async getAll() {
    return await CategoryRepository.getAll();
  }

  async createCategory(data) {
    const categoria = new CategoryModel(data);
    return await CategoryRepository.createCategory(categoria);
  }

  async updateCategoryy(id, categoria) {
    return await CategoryRepository.updateCategoryy(id, categoria);
  }

  async desativar(id) {
    //se o id enviado não for um numero vai entrar nesse if
    // id = falso com a ! vira verdadeiro ai entra
    if (!id || isNaN(id)) {
      throw new Error("ID da categoria é obrigatorio!");
    }

    //verificando se a categoria existe
    const categoria = CategoryModel.getById(id);

    if (!categoria) {
      throw new Error("Categoria não encontrada!!!!!");
    }

    //desativando a categoria encontrada
    await CategoryModel.updateStatus(id, 0);

    //desativando produtos da categoria
    await ProductRepository.desativarPorCategoria(id);

    return { message: "Categoria eprodutos desativados com sucesso!!!!" };
  }

  async deleteCategoryy(id) {
    const totalProdutos = await ProductRepository.countByCategoria(id);
    if (totalProdutos > 0) {
      throw new Error(
        "Não pe possivel excluir categoria com produtos vinculados",
      );
    }

    return await CategoryRepository.deleteCategoryy(id);
  }
}

export default new CategoryService();

// server app routes controler services repository
//                                |
//                              model
