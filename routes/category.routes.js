import express from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", CategoryController.indexCategoryy);
router.post("/", CategoryController.storeCategoryy);
router.delete("/:id", CategoryController.destroyCategoryy);
router.put("/:id", CategoryController.updateCategoryy);

export default router;
