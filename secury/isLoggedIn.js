import express from 'express';
import jwt from 'jsonwebtoken';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Siz profilga kirmagansiz" });
    };

    const payload = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false });

    req.user = payload;
    
    next();
  } catch (error) {
    next(error);
  };
};