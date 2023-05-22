import Joi from "joi";

export const PrescriptionSchema = Joi.object({
    patient_name: Joi.string().min(3).max(100).required(),
    pharmacy: Joi.string().min(3).max(30).required(),
    doctor: Joi.string().min(3).max(30).required(),
});