import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const editSchema = Joi.object({
  firstName: Joi.string().min(1),
  lastName: Joi.string().min(1),
  email: Joi.string().email(),
  password: Joi.string().min(6)
});

const categories = ['badiy', 'biznes', 'ilm-fan', 'siyosat', 'boshqa'];

export const booksSchema = Joi.object({
  title: Joi.string().min(3).required(),
  category: Joi.string().valid(...Object.values(categories)).required(),
  authorId: Joi.string().min(3).required()
});

export const editBooksSchema = Joi.object({
  title: Joi.string().min(3),
  category: Joi.string().valid(...Object.values(categories)),
  authorId: Joi.string().min(3)
});

export const authorSchema = Joi.object({
  name: Joi.string().min(3).required()
});