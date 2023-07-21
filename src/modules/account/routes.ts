import Elysia, { t } from "elysia";

import { eq } from "drizzle-orm";
import { db } from "../../db";
import { AccountETB, accountSchema } from "../../db/schema";

const JSON_KEY = "account";
const JSON_KEY_PLURAL = "accounts";

export const accountRoutes = (app: Elysia) =>
    app.group("/accounts", (grp) =>
        grp
            .get("/", async () => {
                const accounts = await db.select().from(accountSchema);

                return { [JSON_KEY_PLURAL]: accounts };
            })
            .get(
                "/:id",
                ({ params: { id } }) => {
                    if (!id) {
                        throw new Error("Missing id");
                    }

                    const account = db
                        .select()
                        .from(accountSchema)
                        .where(eq(accountSchema.id, id));

                    return { [JSON_KEY]: account };
                },
                {
                    params: t.Object({
                        id: t.Number(),
                    }),
                },
            )
            .post("/", ({ body }) => ({}), {
                body: t.Object({
                    account: AccountETB,
                }),
            })
            .put("/:id", () => "PUT accounts/:id")
            .delete("/:id", () => "DELETE accounts/:id"),
    );
