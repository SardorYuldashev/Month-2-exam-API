import express from 'express';
import { adminRegister, deleteUser, editUser, getUsers, userInfo, userLogin, usersRegister } from '../controllers/usersControls.js';
import { genValidator } from '../validate/gen-validator.js';
import { registerSchema, loginSchema, editSchema } from '../validate/schemas.js';
import { isAdmin, isSuperAndAdmin } from '../secury/isWho.js';
import { isLoggedIn } from './../secury/isLoggedIn.js';

const router = express.Router();

// Foydalanuvchilar ro'yxati
router.get('/users', isLoggedIn, isAdmin, getUsers);

// Foydalanuvchi haqida ma'lumot
router.get('/users/me', isLoggedIn, userInfo);

// Foydalanuvchini o'chirish
router.delete('/users/:id', isLoggedIn, isSuperAndAdmin, deleteUser);

// Foydalanuvchini tahrirlash
const editValidator = genValidator(editSchema);
router.patch('/users/me', isLoggedIn, editValidator, editUser);

// Foydalanuvchilarni ro'yxatdan o'tkazish
const registrationValidator = genValidator(registerSchema);
router.post('/users/register', registrationValidator, usersRegister);

// Adminlarni ro'yxatdan o'tkazish
router.post('/users', registrationValidator, adminRegister);

// Profilga kirish
const loginValidator = genValidator(loginSchema);
router.post('/users/login', loginValidator, userLogin);


export default router;