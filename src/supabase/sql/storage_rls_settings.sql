-- シェフ画像のstorage作成
INSERT INTO storage.buckets (id, name, public) VALUES ('chef', 'chef', true);

-- Public access for chef images
CREATE POLICY "public_access_chef_images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'chef');

-- Admin controls for chef images
CREATE POLICY "admin_insert_chef_images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'chef' AND (SELECT role FROM "User" WHERE id = auth.uid()::text) = 'ADMIN');
CREATE POLICY "admin_update_chef_images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'chef' AND (SELECT role FROM "User" WHERE id = auth.uid()::text) = 'ADMIN');
CREATE POLICY "admin_delete_chef_images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'chef' AND (SELECT role FROM "User" WHERE id = auth.uid()::text) = 'ADMIN');

-- プロフィール画像のstorage作成
INSERT INTO storage.buckets (id, name, public) VALUES ('user', 'user', true);

-- Public access for user profile images
CREATE POLICY "public_access_user_images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'user');

-- User controls for their own profile images
CREATE POLICY "user_insert_own_images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'user');
CREATE POLICY "user_update_own_images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'user');
CREATE POLICY "user_delete_own_images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'user');

-- レシピ画像のstorage作成
INSERT INTO storage.buckets (id, name, public) VALUES ('recipe', 'recipe', true);

-- Public access for recipe images
CREATE POLICY "public_access_recipe_images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'recipe');

-- User controls for their own recipe images
CREATE POLICY "user_insert_own_recipe_images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'recipe');
CREATE POLICY "user_update_own_recipe_images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'recipe');
CREATE POLICY "user_delete_own_recipe_images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'recipe');
