-- Userのプロフィール画像のstorage作成
insert into storage.buckets (id, name, public) values ('user', 'user', true);
CREATE POLICY "プロフィール画像は誰でも参照可能" ON storage.objects FOR SELECT TO public USING (bucket_id = 'user');
CREATE POLICY "プロフィール画像はログインユーザーが追加" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'user');
CREATE POLICY "プロフィール画像はログインユーザーが更新" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'user');
CREATE POLICY "プロフィール画像はログインユーザーが削除" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'user');

-- レシピ画像のstorage作成
insert into storage.buckets (id, name, public) values ('recipe', 'recipe', true);
CREATE POLICY "レシピ画像は誰でも参照可能" ON storage.objects FOR SELECT TO public USING (bucket_id = 'recipe');
CREATE POLICY "レシピ画像はログインユーザーが追加" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'recipe');
CREATE POLICY "レシピ画像はログインユーザーが更新" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'recipe');
CREATE POLICY "レシピ画像はログインユーザーが削除" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'recipe');
