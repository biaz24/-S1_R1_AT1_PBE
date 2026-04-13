import pool from "../database/connection.js";

// Mudar getAll so o nomee

class CategoryRepository {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM Categorias WHERE id");
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM categorias WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async createCategory(categoria) {
    const { nome, descricao } = categoria;

    const [result] = await pool.query(
      `INSERT INTO categorias (nome, descricao
        )VALUES (?,?)`,
      [categoria.nome, categoria.descricao],
    );
    return result.insertId;
  }

  async desativar(id) {}

  async updateStatus(id, status) {
    const [rows] = await pool.query(
      "UPDATE categorias SET status = ? WHERE id =?",
      [status, id],
    );
    return rows;
  }

  // nome alterado
  async updateCategoryy(id, Categoria) {
    const { nome, descricao } = Categoria;

    const [result] = await pool.query(
      `UPDATE categorias SET
        nome = ?,
        descricao = ?
        WHERE id = ?
    `,
      [nome, descricao, id],
    );

    return result.affectedRows;
  }

  async deleteCategoryy(id) {
    const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [
      id,
    ]);
    // console.log(result);
    return result.affectedRows;
  }
}

export default new CategoryRepository();
