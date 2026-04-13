// cerebro do nosso projeto

import CategoryService from "../services/CategoryService.js";

class CategoryController {
  async indexCategoryy(req, res) {
    try {
      const categoria = await CategoryService.getAll();
      return res.json(categoria);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  }

  async storeCategoryy(req, res) {
    try {
      const categoria = req.body;

      await CategoryService.createCategory(categoria);
      res.status(201).json({ message: "Categoria cadastradaa com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar categoria" });
    }
  }

  async updateCategoryy(req, res) {
    try {
      const categoria = req.body;
      const { id } = req.params;

      await CategoryService.updateCategoryy(id, categoria);
      res.status(201).json({ message: "Categoria atualizada com sucesso!" });
      //status da resposta se foi bem sucedida ou não
    } catch (error) {
      res.json({ error: "Erro ao atualizar categoria!!!!!" });
    }
  }

  async destroyCategoryy(req, res) {
    try {
      const { id } = req.params;

      await CategoryService.deleteCategoryy(id);
      res.status(200).json({ message: "Categoria removida com sucesso" });
    } catch (error) {
      res.json({ message: "Erro ao remover categoria!" });
    }
  }
}

// coloquei categoryyyy na frente
export default new CategoryController();

// node moon server.js

// rotas controler services
