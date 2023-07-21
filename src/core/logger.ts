import winston from "winston";

import info from "../../package.json";
import { CONFIG } from "./config";

// import { CONFIG } from "../config/config.js";

const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize, splat, errors } = format;

const messageFormatter = printf(
    ({ level, message, timestamp, service, ...metadata }) => {
        let label = "";
        if (typeof message === "object") {
            if (message.xLabel) {
                label = `[${message.xLabel}] `;
                message.xLabel = undefined;
            }

            message = JSON.stringify(message);
        }

        let msg = `${level}\t${timestamp} [${service}]: ${label}${message}`;

        if (metadata && Object.keys(metadata).length > 0) {
            msg += ` ${JSON.stringify(metadata)}`;
        }
        return msg;
    },
);

export const logger = createLogger({
    level: CONFIG.LOG_LEVEL,
    defaultMeta: {
        service: info.name,
    },
    format: combine(
        errors({ stack: true }),
        timestamp(),
        colorize(),
        splat(),
        messageFormatter,
    ),
    transports: [
        new transports.Console({
            handleExceptions: true,
        }),
    ],
});
