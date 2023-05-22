import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
import { ProductController } from "./resources/product/product.controller";
import { PrescriptionController } from "./resources/prescription/prescription.controller";
const app = new App([
    new AuthController(),
    new ProductController(),
    new PrescriptionController(),
], Number(process.env.PORT || 8000));

app.listen();