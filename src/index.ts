import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
import { ProductController } from "./resources/product/product.controller";
const app = new App([
    new AuthController(),
    new ProductController(),
], Number(process.env.PORT || 8000));

app.listen();