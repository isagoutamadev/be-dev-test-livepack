import Joi from "joi";

export const UUIDSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const IDSchema = Joi.object({
    id: Joi.number().min(1).required(),
});
