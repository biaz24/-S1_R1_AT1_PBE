import pool from "../database/connection.js";

//repository que conversa com o banco

class ProductRepository {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM Produtos");
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM Produtos WHERE id =?", [id]);
    return rows[0]; //aqui estou pegando o primeiro resultado da lista que vai exibir
  }

  async desativarPorCategoria(categoriaId) {
    //estamos desativando o produto que esta dentro da categoria que vai ser desativada
    await pool.query("UPDATE produtos SET status = 0 WHERE categoria_id = ?", [
      categoriaId,
    ]);
  }

  async countByCategoria(categoriaId) {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as TOTAL FROM produtos WHERE categoria_id =?",
      [categoriaId],
    );

    return rows[0].total;
  }

  async countDestaques() {
    // vai retornar o toal de linhas que tem s
    const [rows] = await pool.query(
      "SELECT COUNT (*) as total FROM Produtos WHERE destaque = 1",
    );
    return rows[0].total;
  }

  async createProduct(produto) {
    const [result] = await pool.query(
      `INSERT INTO produtos (nome, descricao, preco, 
        quantidade_estoque, status, destaque, marca, modelo, garantia_meses, categoria_id
        )VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        produto.nome,
        produto.descricao,
        produto.preco,
        produto.quantidade_estoque,
        produto.status,
        produto.destaque,
        produto.marca,
        produto.modelo,
        produto.garantia_meses,
        produto.categoria_id,
      ],
    );

    return result.insertId;
  }
  async updateProduct(id, produto) {
    const [result] = await pool.query(
      `UPDATE produtos SET
        nome = ?,
        descricao = ?, 
        preco = ?, 
        quantidade_estoque = ?, 
        status = ?, 
        destaque = ?, 
        marca = ?, 
        modelo = ?, 
        garantia_meses = ?,
        categoria_id = ?
         WHERE id = ?`,
      [
        // olhar a virgula do id categorias
        produto.nome,
        produto.descricao,
        produto.preco,
        produto.quantidade_estoque,
        produto.status,
        produto.destaque,
        produto.marca,
        produto.modelo,
        produto.garantia_meses,
        produto.categoria_id,
        id,
      ],
    );

    return result.affectedRows;
  }

  async deleteProduct(id) {
    const [result] = await pool.query(`DELETE FROM produtos WHERE id = ?`, [
      id,
    ]);

    return result.affectedRows;
  }
}

export default new ProductRepository();

// export default { getAllProducts, createProduct, updateProduct, deleteProduct };
