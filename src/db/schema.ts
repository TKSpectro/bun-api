import { InferModel } from "drizzle-orm";
import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { t } from "elysia";

export const accountSchema = mysqlTable("accounts", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).unique("email_idx"),
});

export const taskSchema = mysqlTable("tasks", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    completed: boolean("completed").notNull().default(false),

    fkAccountId: int("fk_account_id").references(() => accountSchema.id),
});

export type Account = InferModel<typeof accountSchema>;
export type Task = InferModel<typeof taskSchema>;

export const AccountETB = t.Object({
    id: t.Optional(t.Number()),
    name: t.String(),
    email: t.String(),
});
