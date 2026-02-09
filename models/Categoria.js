import pool from "../database/connection.js";

// Mudar getAll so o nomee
async function getAllCategoryy() {
const [rows] = await pool.query('SELECT * FROM Categoria');
return rows;
}


async function createCategoryy(Categoria) {
    const {
        nome, 
        descricao,
    } = Categoria;

    const [result] = await pool.query(`INSERT INTO Categoria (nome, descricao
        )VALUES (?,?)`, [nome, descricao ]
    )
    return result.insertId;
}

// nome alterado
async function updateCategoryy(id, Categoria){
   const {
        nome, 
        descricao
    } = Categoria;

    const [result] = await pool.query(`UPDATE Categoria SET
        nome = ?,
        descricao = ?
        WHERE id = ?
    `, [
    nome, 
    descricao,
    id ])

return result.affectedRows;
}

async function deleteCategoryy(id){
    const [result]= await pool.query(`DELETE FROM Categoria WHERE id = ?`, [id])

    return result.affectedRows;
}

export default {getAllCategoryy, createCategoryy,updateCategoryy, deleteCategoryy}