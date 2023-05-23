import Joi from "joi";

export const ProductIDSchema = Joi.object({
    product_id: Joi.number().min(1).required(),
});