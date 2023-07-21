import { sql } from "drizzle-orm";
import { Elysia } from "elysia";

import assert from "assert";
import { logger } from "./core/logger";
import { routes } from "./core/routes";
import { xSwagger } from "./core/swagger";
import { db } from "./db";

const app = new Elysia({
    serve: {
        maxRequestBodySize: 10 * 1024 * 1024, // 10MB
    },
})
    .onStart(async (app) => {
        // Test database connection
        const dbCall = await db.execute(sql`SELECT 1 + 1 as result`);
        // @ts-ignore
        assert.strictEqual(dbCall[0][0].result, 2);

        logger.info(`[Start] ${app.server?.hostname}:${app.server?.port}`);
    })
    .use(xSwagger)
    .use(routes)
    // TODO: Replace this with "response" when it's implemented. See: https://github.com/elysiajs/elysia/issues/67
    .onRequest(({ request: req }) => {
        logger.info(`[Request] ${req.method} | ${req.url}`);
    })
    .listen(3000);
