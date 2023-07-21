import Elysia from "elysia";

import { accountRoutes } from "../modules/account/routes";

export const routes = (app: Elysia) =>
    app
        .get("/", () => "Hello, World! From root!")
        .group("/api", (api) =>
            api
                .get("/", () => "Hello, From api/root!")
                .get("/hello", () => "Hello, From api/hello!")
                .use(accountRoutes),
        );
