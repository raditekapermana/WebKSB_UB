import { createClient } from "@supabase/supabase-js";

function getStorageClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase Storage belum dikonfigurasi.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function uploadPublicImage(input: { bytes: ArrayBuffer; contentType: string; extension: string }) {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "ksb-media";
  const fileName = `uploads/${crypto.randomUUID()}.${input.extension}`;
  const client = getStorageClient();
  const { error } = await client.storage.from(bucket).upload(fileName, input.bytes, { contentType: input.contentType, cacheControl: "31536000", upsert: false });
  if (error) throw new Error("Gagal mengunggah gambar.");
  return client.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
}
