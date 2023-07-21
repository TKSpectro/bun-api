import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

export const xSwagger = (app: Elysia) =>
    app.use(
        swagger({
            documentation: {
                info: {
                    title: "bun-api",
                    description: "Bun API",
                    version: "1.0.0",
                },
            },
        }),
    );
