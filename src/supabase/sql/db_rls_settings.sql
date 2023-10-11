-- Active: 1695549825770@@127.0.0.1@54322@postgres

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "UserFollower" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "UserLink" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Recipe" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "RecipeImage" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "RecipeLink" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Ingredient" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Instruction" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "CartList" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "CartListItem" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "DraftRecipe" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "DraftRecipeImage" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "DraftRecipeLink" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "DraftIngredient" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "DraftInstruction" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Favorite" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Memo" ENABLE ROW LEVEL SECURITY;

-- User

CREATE POLICY
    "ユーザー情報取得" ON "public"."User" AS PERMISSIVE FOR
SELECT
    TO authenticated USING ( (auth.uid() = (id) :: uuid))

CREATE POLICY
    "シェフユーザー情報公開" ON "public"."User" AS PERMISSIVE FOR
SELECT
    TO public USING (role = 'CHEF');

CREATE POLICY
    "ユーザー情報更新" ON "public"."User" AS PERMISSIVE FOR
UPDATE
    TO authenticated USING ( (auth.uid() = (id) :: uuid))
WITH
    CHECK ( (auth.uid() = (id) :: uuid))

CREATE POLICY
    "ユーザー情報削除" ON "public"."User" AS PERMISSIVE FOR
DELETE
    TO authenticated USING ( (auth.uid() = (id) :: uuid))

-- UserFollower

CREATE POLICY
    "ユーザーのフォロー情報取得" ON "public"."UserFollower" AS PERMISSIVE FOR
SELECT
    TO public USING (
        'USER' in (
            SELECT role
            FROM
                "User"
        )
        OR 'CHEF' in (
            SELECT role
            FROM "User"
        )
    );

CREATE POLICY
    "ユーザーをフォロー/アンフォローする" on "public"."UserFollower" AS PERMISSIVE FOR
UPDATE
    TO authenticated USING(true)

-- UserLink

CREATE POLICY
    "ユーザーリンクの取得" ON "public"."UserLink" AS PERMISSIVE FOR
SELECT
    TO public USING (
        'USER' in (
            SELECT role
            FROM
                "User"
        )
        OR 'CHEF' in (
            SELECT role
            FROM "User"
        )
    );

CREATE POLICY
    "ユーザーリンク作成" ON "public"."UserLink" AS PERMISSIVE FOR
INSERT TO authenticated
WITH
    CHECK ( (auth.uid() = (user_id) :: uuid))

CREATE POLICY
    "ユーザーリンク更新" ON "public"."UserLink" AS PERMISSIVE FOR
UPDATE
    TO authenticated USING ( (auth.uid() = (user_id) :: uuid))
WITH
    CHECK ( (auth.uid() = (user_id) :: uuid))

CREATE POLICY
    "ユーザーリンク削除" ON "public"."UserLink" AS PERMISSIVE FOR
DELETE
    TO authenticated USING ( (auth.uid() = (user_id) :: uuid))

-- Recipe

-- 一般ユーザーもURLを知っていれば情報を見ることが可能なのでroleの制限はしない

CREATE POLICY
    "シェフのレシピ情報取得" ON "public"."Recipe" AS PERMISSIVE FOR
SELECT
    TO public USING (
        is_published = true
        OR auth.uid() = (user_id) :: uuid
    )

CREATE POLICY
    "非公開レシピ情報取得" ON "public"."Recipe" AS PERMISSIVE FOR
SELECT
    TO authenticated USING (
        is_published = false
        AND auth.uid() = (user_id) :: uuid
    )

-- ログインユーザーが管理者だった場合or自分のレシピの場合に作成・更新・削除が可能

CREATE POLICY
    "レシピ情報作成" ON "public"."Recipe" AS PERMISSIVE FOR
INSERT
WITH CHECK (
        'ADMIN' in (
            SELECT role
            FROM "User"
            WHERE
                "public"."User".id :: uuid = auth.uid()
        )
        OR (auth.uid() = (user_id) :: uuid)
    )

CREATE POLICY
    "レシピ情報更新" ON "public"."Recipe" AS PERMISSIVE FOR
UPDATE
    TO authenticated USING (
        'ADMIN' in (
            SELECT role
            FROM "User"
            WHERE
                "public"."User".id :: uuid = auth.uid()
        )
        OR (auth.uid() = (user_id) :: uuid)
    )

CREATE POLICY
    "レシピ情報削除" ON "public"."Recipe" AS PERMISSIVE FOR
DELETE
    TO authenticated USING (
        'ADMIN' in (
            SELECT role
            FROM "User"
            WHERE
                "public"."User".id :: uuid = auth.uid()
        )
        OR (auth.uid() = (user_id) :: uuid)
    )

-- RecipeImage

CREATE POLICY
    "レシピ画像処理" ON "public"."RecipeImage" AS PERMISSIVE FOR ALL TO authenticated USING ( (
            auth.uid() IN (
                SELECT ("Recipe".user_id) :: uuid AS user_id
                FROM "Recipe"
                WHERE (
                        "Recipe".id = "RecipeImage".recipe_id
                    )
            )
        )
    )

-- RecipeLink

CREATE POLICY
    "レシピリンク処理" ON "public"."RecipeLink" AS PERMISSIVE FOR ALL TO authenticated USING ( (
            auth.uid() IN (
                SELECT ("Recipe".user_id) :: uuid AS user_id
                FROM "Recipe"
                WHERE (
                        "Recipe".id = "RecipeLink".recipe_id
                    )
            )
        )
    )

-- CartList

CREATE POLICY
    "カートリスト取得" ON "public"."CartList" AS PERMISSIVE FOR
SELECT
    TO authenticated USING ( (auth.uid() = (user_id) :: uuid))

CREATE POLICY
    "カートリスト追加" ON "public"."CartList" AS PERMISSIVE FOR
INSERT TO authenticated
WITH CHECK (true)

CREATE POLICY
    "カートリスト更新" ON "public"."CartList" AS PERMISSIVE FOR
UPDATE
    TO authenticated USING ( (auth.uid() = (user_id) :: uuid))
WITH
    CHECK ( (auth.uid() = (user_id) :: uuid))

CREATE POLICY
    "カートリスト削除" ON "public"."CartList" AS PERMISSIVE FOR
DELETE
    TO authenticated USING ( (auth.uid() = (user_id) :: uuid))

-- CartListItem

CREATE POLICY
    "カートリストアイテム処理" ON "public"."CartListItem" AS PERMISSIVE FOR ALL TO authenticated USING ( (
            auth.uid() IN (
                SELECT ("CartList".user_id) :: uuid AS user_id
                FROM
                    "CartList"
                WHERE (
                        "CartList".id = "CartListItem".cart_list_id
                    )
            )
        )
    )

-- DraftRecipe

CREATE POLICY
    "下書きレシピ処理" ON "public"."DraftRecipe" AS PERMISSIVE FOR ALL TO authenticated USING (true)

-- DraftRecipeImage

CREATE POLICY
    "下書きレシピイメージ処理" ON "public"."DraftRecipeImage" AS PERMISSIVE FOR ALL TO authenticated USING (true)

-- DraftRecipeLink

CREATE POLICY
    "下書きレシピイリンク処理" ON "public"."DraftRecipeLink" AS PERMISSIVE FOR ALL TO authenticated USING (true)

-- DraftIngredient

CREATE POLICY
    "下書き材料処理" ON "public"."DraftIngredient" AS PERMISSIVE FOR ALL TO authenticated USING (true)

-- DraftInstruction

CREATE POLICY
    "下書き一覧処理" ON "public"."DraftInstruction" AS PERMISSIVE FOR ALL TO authenticated USING (true)

-- Favorite

CREATE POLICY
    "レシピお気に入り取得（未認証でも参照できる" ON "public"."Favorite" AS PERMISSIVE FOR
SELECT TO public USING (true)

CREATE POLICY
    "レシピお気に入り追加" ON "public"."Favorite" AS PERMISSIVE FOR
INSERT TO authenticated
WITH CHECK (true)

CREATE POLICY
    "レシピお気に入り更新" ON "public"."Favorite" AS PERMISSIVE FOR
UPDATE
    TO authenticated USING (true)

CREATE POLICY
    "レシピお気に入り削除" ON "public"."Favorite" AS PERMISSIVE FOR
DELETE
    TO authenticated USING ( (auth.uid() = (user_id) :: uuid))

-- Memo

CREATE POLICY
    "メモ処理" ON "public"."Memo" AS PERMISSIVE FOR ALL TO authenticated USING ( (auth.uid() = (user_id) :: uuid))