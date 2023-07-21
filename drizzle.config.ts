import { Config } from "drizzle-kit";
import { CONFIG } from "./src/core/config";

export default {
    schema: "./src/db/**/schema.ts",
    driver: "mysql2",
    dbCredentials: {
        host: CONFIG.DATABASE_HOST,
        port: CONFIG.DATABASE_PORT,
        user: CONFIG.DATABASE_USER,
        database: CONFIG.DATABASE_NAME,
        password: CONFIG.DATABASE_PASSWORD,
    },
    verbose: true,
    strict: true,
    out: "./drizzle",
} satisfies Config;
