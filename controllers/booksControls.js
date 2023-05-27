import express from 'express';
import { db } from '../db/index.js';
import { randomUUID } from 'crypto';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */

export const addBooks = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    const { title, category, authorId } = req.body;

    const haveBook = db.data.books.find(u => u.title === title);

    if (haveBook) {
      return res.status(400).json({ error: "Bunday kitob mavjud" });
    };

    const haveAuthor = db.data.authors.find(a => a.id === authorId);

    if(!haveAuthor){
      return res.status(400).json({error: "Ko'rsatilgan authorId li muallif mavjud emas. Avval muallifni ro'yxatdan o'tkazing"});
    };

    db.data.books.push({
      id: randomUUID(),
      title,
      category,
      authorId
    });

    await db.write();

    res.status(200).json({ message: "Kitob qo'shildi" });
  } catch (error) {
    next(error);
  };
};

export const getBooks = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    let books = db.data.books;

    if (req.query.category) {
      const category = req.query.category;
      books = books.filter(b => b.category === category);
    };

    if (req.query.authorId) {
      const authorId = req.query.authorId;
      books = books.filter(b => b.authorId === authorId);
    };

    res.status(200).json(books);
  } catch (error) {
    next(error);
  };
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const getOneBook = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    const book = db.data.books.find(b => b.id === req.params.id);

    if(!book){
      return res.status(400).json({error: "Berilgan IDli kitob mavjud emas"});
    };

    book.author = db.data.authors.find(a => a.id === book.authorId);

    res.status(200).json(book);
  } catch (error) {
    next(error);
  };
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const editBook = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    await db.read();

    if(Object.keys(req.body).length === 0){
      return res.status(400).json({error: "Kitob tahrirlanmadi. Tahrirlanishi kerak bo'lgan bo'lgan ma'lumotlar jo'natilmagan"});
    };

    const bookIndex = db.data.books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(400).json({ error: 'Berilgan IDli kitob mavjud emas' });
    };

    for (let key in req.body) {
      if(key === "authorId") {
        const haveAuthor = db.data.authors.find(a => a.id === req.body[key]);

        if(!haveAuthor) {
          return res.status(400).json({error: "Ko'rsatilgan IDli muallif mavjud emas. Avval muallifni ro'yxatdan o'tkazing"});
        };
        
        db.data.books[bookIndex][key] = req.body[key];
        continue;
      };
      db.data.books[bookIndex][key] = req.body[key];
    };

    await db.write();

    res.status(200).json({ message: "Kitob tahrirlandi" });
  } catch (error) {
    next(error);
  };
};

export const deleteBook = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    await db.read();

    const book = db.data.books.find(b => b.id === req.params.id);

    if(!book) {
      return res.status(400).json({error: "Berilgan IDli kitob mavjud emas"});
    };

    db.data.books = db.data.books.filter(b => b.id !== req.params.id);

    await db.write();

    res.status(200).json({ message: "Kitob o'chirildi" });
  } catch (error) {
    next(error);
  };
};