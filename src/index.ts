import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
import { CareerController } from "./resources/career/career.controller";
const app = new App([
    new AuthController(),
    new CareerController(),
], Number(process.env.PORT || 8000));

app.listen();