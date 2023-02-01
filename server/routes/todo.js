import express from "express";
import * as TodoApi from "../controllers/todo.js";

const router = express.Router();

router.route("/todos/:userEmail").get(TodoApi.getAllTodos);
router.route("/todos").post(TodoApi.createATodo);
router.route("/todos/:id").patch(TodoApi.updateTodo);
router.route("/todos/:id").delete(TodoApi.deleteTodo);

export default router;
