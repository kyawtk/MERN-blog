

import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  getBlogsByUserId,
  deleteBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middleWare/authMiddleware.js";

const router = Router();

router.use(verifyToken)

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
//router to get blogs by userid
router.get("/user/:id",getBlogsByUserId );

export default router;
