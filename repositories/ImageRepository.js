import database from "../database/connection.js";

class ImageRepository {
  async getByProductId(productId, connection) {
    const [rows] = await connection.query(
      `SELECT * FROM produto_imagens WHERE produto_id = ?`,
      [productId],
    );

    return rows;
  }
  async getById(id) {
    const [rows] = await database.query(
      `SELECT * FROM produto_imagens WHERE id = ?`,
      [id],
    );

    return rows[0];
  }

  async getImageIdsByProduct(productId) {
    const [rows] = await database.query(
      //     *
      `SELECT id FROM produto_imagens WHERE produto_id = ?`,
      [productId],
    );
    return rows;
  }

  //tudo que esta envolvido com transações vai ter o 'connection' como segundo parametro
  async createMany(images, connection) {
    console.log(images);
    const values = images.map((img) => [img.produto_id, img.url, img.ordem]);
    console.log(values);
    await connection.query(
      `INSERT INTO produto_imagens (produto_id, url, ordem) VALUES ?`,
      [values],
    );
  }

  async updateUrl(id, url, connection) {
    await connection.query(`UPDATE  produto_imagens SET url = ? WHERE id =?`, [
      url,
      id,
    ]);
  }

  async deleteMany(ids, connection) {
    await connection.query(
      //             vamos mandar uma lista de id e o IN verifica se o id existe dentro da lista
      `DELETE FROM produto_imagens WHERE id IN(?)`,
      [ids],
    );
  }
}

export default new ImageRepository();
