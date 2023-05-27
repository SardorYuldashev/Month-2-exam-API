import express from 'express';
import { addAuthor, deleteAuthor, editAuthor, getAuthors, getOneAuthor } from '../controllers/authorsControls.js';
import { isLoggedIn } from './../secury/isLoggedIn.js';
import { genValidator } from './../validate/gen-validator.js';
import { authorSchema } from '../validate/schemas.js';
import { isAdmin } from './../secury/isWho.js';

const router = express.Router();

// Muallif qo'shish
const authorValidate = genValidator(authorSchema)
router.post('/authors', isLoggedIn, isAdmin, authorValidate, addAuthor);

// Mualliflar ro'yhatini olish
router.get('/authors', isLoggedIn, getAuthors);

// Muallifni IDsiga ko'ra olish
router.get('/authors/:id', isLoggedIn, getOneAuthor);

// Muallifni tahrirlash
router.put('/authors/:id', isLoggedIn, isAdmin, authorValidate, editAuthor);

// Muallifni o'chirish
router.delete('/authors/:id', isLoggedIn, isAdmin, deleteAuthor);



export default router;