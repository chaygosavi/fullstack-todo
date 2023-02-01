import TodoModel from "../models/todos.js";
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";

export const getAllTodos = async (req, res, next) => {
  const { userEmail } = req.params;
  try {
    const todo = await TodoModel.findOne({ user_email: userEmail });

    if (!todo) {
      throw createHttpError(404, "User not found");
    }

    const todos = await TodoModel.find({ user_email: userEmail });

    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
};

export const createATodo = async (req, res, next) => {
  const { user_email, title, progress } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, "Todo must have a title");
    } else if (!user_email) {
      throw createHttpError(400, "User must have an email");
    } else if (!progress) {
      throw createHttpError(400, "Todo must have progress");
    }

    const newTodo = await TodoModel.create({
      user_email,
      title,
      progress,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const { title, progress } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo id");
    }

    if (!title) {
      throw createHttpError(400, "Todo must have a title");
    }

    const todo = await TodoModel.findById(id).exec();

    if (!todo) {
      throw createHttpError(404, "Todo not found");
    }

    todo.title = title;
    todo.progress = progress;

    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo id");
    }

    const todo = await TodoModel.findById(id);

    if (!todo) {
      throw createHttpError(404, "Todo not found");
    }

    await todo.delete();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
