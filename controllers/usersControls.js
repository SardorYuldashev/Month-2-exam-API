import { db } from '../db/index.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';



export const getUsers = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    await db.read();

    if (req.query.role !== undefined) {
      const role = req.query.role;

      if (role === "superAdmin") {
        return res.status(400).json({ error: "superAdmin ma'lumotlarini olish mumkin emas" });
      };

      const users = db.data.users.filter(u => u.role === role);
      return res.status(200).json(users);
    };

    const users = db.data.users.filter(u => u.role !== "superAdmin");

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  };
};

export const userInfo = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    await db.read();

    const user = db.data.users.find(u => u.id === req.user.userId);

    return res.status(200).json(user);

  } catch (error) {
    next(error);
  };
};

export const deleteUser = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    await db.read();

    const user = db.data.users.find(u => u.id === req.params.id);

    if (!user) {
      return res.status(400).json({ error: "Berilgan IDli foydalanuvchi mavjud emas" });
    };

    if (user.role === "admin" && req.user.role === "admin") {
      return res.status(200).json({ message: "Admin o'zi va boshqa adminni o'chira olmaydi" });
    };

    if (user.role === "superAdmin") {
      return res.status(200).json({ message: "superAdminni o'chirish mumkin emas" });
    };

    db.data.users = db.data.users.filter(u => u.id !== req.params.id);

    await db.write();

    res.status(200).json({ message: "Foydalanuvchi o'chirildi" });
  } catch (error) {
    next(error);
  };
};

export const editUser = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    await db.read();

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Foydalanuvchi ma'lumotlari tahrirlanmadi. Tahrirlanishi kerak bo'lgan bo'lgan ma'lumotlar jo'natilmagan" });
    };

    const userIndex = db.data.users.findIndex(u => u.id === req.user.userId);

    for (let key in req.body) {
      if (key === "password") {
        const hashedPas = await bcrypt.hash(req.body[key], 10);
        db.data.users[userIndex][key] = hashedPas;
        continue
      }
      db.data.users[userIndex][key] = req.body[key];
    };

    await db.write();

    res.status(200).json({ message: "Foydalanuvchi ma'lumotlari o'zgartirildi" });
  } catch (error) {
    next(error);
  };
};

export const usersRegister = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    const { firstName, lastName, email, password } = req.body;

    await db.read();

    const userExist = db.data.users.find(u => u.email === email);

    if (userExist) {
      return res.status(400).json(({ error: "Bunday foydalanuvch mavjud" }));
    };

    const hashedPas = await bcrypt.hash(password, 10);

    const user = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashedPas,
      role: 'customer'
    };

    db.data.users.push(user);

    await db.write();

    res.status(200).json({ message: "Ro'yxatdan o'tdingiz" });
  } catch (error) {
    next(error);
  };
};

export const adminRegister = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    const { firstName, lastName, email, password } = req.body;

    await db.read();

    const userExist = db.data.users.find(u => u.email === email);

    if (userExist) {
      return res.status(400).json(({ error: "Bunday foydalanuvch mavjud" }));
    };

    const hashedPas = await bcrypt.hash(password, 10);

    const user = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashedPas,
      role: 'admin'
    };

    db.data.users.push(user);

    await db.write();

    res.status(200).json({ message: "Ro'yxatdan o'tdingiz" });
  } catch (error) {
    next(error);
  };
};

export const userLogin = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', "application/json");
    const { email, password } = req.body;

    await db.read();

    const user = db.data.users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: "Bunday foydalanuvchi mavjud emas" });
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ error: "Parol xato kiritilgan" });
    };

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: "Siz profilingizga kirdingiz", token });
  } catch (error) {
    next(error);
  };
};
