import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes.js';
import booksRoutes from './routes/booksRoutes.js';
import authorsRoutes from './routes/authorsRoutes.js';
import { isLoggedIn } from './secury/isLoggedIn.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoutes);
app.use(booksRoutes);
app.use(authorsRoutes);


app.get('/', isLoggedIn, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ message: `Welome to my Exam project` });
});

app.use((req, res, next) => {
  next(new Error("Mavjud bo'lmagan yo'l"));
});

app.use((err, req, res, next) => {
  return res.status(404).json({error: err.message});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});