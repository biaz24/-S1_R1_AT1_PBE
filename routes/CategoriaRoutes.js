import express from 'express';
import CategoriaController from '../controllers/CategoriaController.js'

const router = express.Router();

router.get("/", CategoriaController.indexCategoryy)
router.post("/", CategoriaController.storeCategoryy)
router.delete("/:id", CategoriaController.destroyCategoryy)
router.put("/:id", CategoriaController.updateCategoryy)

export default router;