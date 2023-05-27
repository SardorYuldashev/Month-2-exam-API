import express from 'express';
import { randomUUID } from 'crypto';
import { db } from '../db/index.js';


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const addAuthor = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    const { name } = req.body;

    const haveAuthor = db.data.authors.find(a => a.name === name);
    if (haveAuthor) {
      return res.status(400).json({ error: "Bunday muallif mavjud" })
    };

    const authorId = randomUUID();
    
    db.data.authors.push({
      id: authorId,
      name
    });

    await db.write();
    res.status(200).json({ message: "Muallif qo'shildi", authorId });
  } catch (error) {
    next(error);
  };
};

export const getAuthors = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();
    return res.status(200).json(db.data.authors);
  } catch (error) {
    next(error);
  };
};

export const getOneAuthor = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    const author = db.data.authors.find(a => a.id === req.params.id);

    if (!author) {
      return res.status(200).json({ error: "Berilgan IDli muallif mavjud emas" });
    };

    author.countBooks = db.data.books.filter(b => b.authorId === author.id).length;

    res.status(200).json(author);
  } catch (error) {
    next(error);
  };
};

export const editAuthor = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    const authorIndex = db.data.authors.findIndex(a => a.id === req.params.id);

    if (authorIndex === -1) {
      return res.status(400).json({ error: 'Berilgan IDli muallif mavjud emas' });
    };

    db.data.authors[authorIndex].name = req.body.name;

    await db.write();

    return res.status(200).json({ message: "Muallif tahrirlandi" });
  } catch (error) {
    next();
  };
};

export const deleteAuthor = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    const author = db.data.authors.find(a => a.id === req.params.id);

    if (!author) {
      return res.status(400).json({ error: "Berilgan IDli muallif mavjud emas" });
    };

    const countBooks = db.data.books.filter(b => b.authorId === req.params.id).length;

    if (countBooks > 0) {
      return res.status(400).json({ error: `Muallifning ${countBooks} ta kitobi borligi uchun o'chirib bo'lmaydi` });
    };

    db.data.authors = db.data.authors.filter(a => a.id !== req.params.id);

    await db.write();

    return res.status(200).json({ message: "Muallif o'chirildi" });
  } catch (error) {
    next(error);
  };
};