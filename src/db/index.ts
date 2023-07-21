import { Logger } from "drizzle-orm";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { CONFIG } from "../core/config";
import { logger } from "../core/logger";

logger.info(
    `[Database] Connecting to ${CONFIG.DATABASE_HOST}:${CONFIG.DATABASE_PORT}/${CONFIG.DATABASE_NAME}`,
);

// init mysql2 Pool
const poolConnection = mysql.createPool({
    host: CONFIG.DATABASE_HOST,
    port: CONFIG.DATABASE_PORT,
    user: CONFIG.DATABASE_USER,
    database: CONFIG.DATABASE_NAME,
    password: CONFIG.DATABASE_PASSWORD,
    pool: {
        min: CONFIG.DATABASE_POOL_MIN,
        max: CONFIG.DATABASE_POOL_MAX,
    },

    idleTimeout: CONFIG.DATABASE_POOL_IDLE,
});

class MyLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
        logger.info({ xLabel: "Database", query, params });
    }
}

export const db: MySql2Database = drizzle(poolConnection, {
    logger: CONFIG.DATABASE_LOGGING ? new MyLogger() : false,
});
