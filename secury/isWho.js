import express from 'express';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const isAdmin = (req, res, next) => {
  if(req.user.role !== "admin") {
    return res.status(403).json({error: "Bu yo'l faqat admin uchun"});
  };

  next();
};



/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const isSuperAndAdmin = (req, res, next) => {
  if(req.user.role !== "superAdmin" && req.user.role !== "admin") {
    return res.status(403).json({error: "Bu yo'l faqat admin va superAdmin uchun"});
  };

  next();
};