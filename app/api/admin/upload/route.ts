import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadPublicImage } from "@/lib/storage";

export const runtime = "nodejs";
const formats: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const limit = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 }); }
  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Berkas gambar wajib dipilih." }, { status: 400 });
  const extension = formats[file.type];
  if (!extension) return NextResponse.json({ error: "Format gambar harus JPEG, PNG, atau WebP." }, { status: 415 });
  if (file.size === 0 || file.size > limit) return NextResponse.json({ error: "Ukuran gambar harus di bawah 5 MB." }, { status: 413 });
  try {
    const url = await uploadPublicImage({ bytes: await file.arrayBuffer(), contentType: file.type, extension });
    return NextResponse.json({ url });
  } catch { return NextResponse.json({ error: "Penyimpanan gambar belum siap atau unggah gagal." }, { status: 503 }); }
}
