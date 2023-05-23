import Joi from "joi";

export const PrescriptionProductSchema = Joi.object({
    product_id: Joi.number().min(1).required(),
    qty: Joi.number().min(1).required()
});

export const UpdatePrescriptionProductSchema = Joi.object({
    qty: Joi.number().min(0).required()
});