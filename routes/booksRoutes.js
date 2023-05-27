import express from 'express';
import { addBooks, getBooks, getOneBook, editBook, deleteBook } from '../controllers/booksControls.js';
import { isLoggedIn } from './../secury/isLoggedIn.js';
import { isAdmin } from './../secury/isWho.js';
import { genValidator } from './../validate/gen-validator.js';
import { booksSchema, editBooksSchema } from '../validate/schemas.js';

const router = express.Router();


// Kitob qo'shish
const bookValidator = genValidator(booksSchema);
router.post('/books', isLoggedIn, isAdmin, bookValidator, addBooks);

// Kitoblarni olish
router.get('/books',isLoggedIn, getBooks);

// Kitobni IDsiga ko'ra olish
router.get('/books/:id', isLoggedIn, getOneBook);

// Kitobni tahrirlash
const editBookValidator = genValidator(editBooksSchema);
router.put('/books/:id', isLoggedIn, isAdmin, editBookValidator, editBook);

// Kitobni o'chirish
router.delete('/books/:id', isLoggedIn, isAdmin, deleteBook);


export default router;