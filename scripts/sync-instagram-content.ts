import { ContentStatus, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.article.deleteMany({ where: { slug: "contoh-ekologi-perkotaan" } });
  await db.event.deleteMany({ where: { slug: "contoh-kelas-lapang" } });
  await db.organizationSetting.upsert({
    where: { id: "main" },
    update: {
      name: "Kelompok Studi Biologi Universitas Brawijaya",
      shortDescription: "Kelompok Studi Biologi Universitas Brawijaya adalah ruang belajar dan kolaborasi bagi Biologi Muda untuk mengeksplorasi keanekaragaman hayati, riset, dan kegiatan lapang.",
      profile: "Kelompok Studi Biologi Universitas Brawijaya (KSB UB) merupakan komunitas mahasiswa yang membagikan kegiatan kajian, pelatihan, eksplorasi lapang, serta publikasi biologi.",
      history: "Informasi sejarah lengkap belum dipublikasikan pada sumber yang ditinjau. Bagian ini dapat dilengkapi pengurus melalui dashboard.",
      vision: "Menjadi ruang tumbuh Biologi Muda yang aktif belajar, mengeksplorasi, dan berkontribusi pada pengetahuan biologi.",
      mission: "Menyelenggarakan kegiatan belajar, praktik lapang, publikasi, dan kolaborasi yang mendekatkan mahasiswa pada biodiversitas.",
      email: "ksbbioub@gmail.com",
      phone: "089507101387 (Nazwa)",
      instagram: "https://www.instagram.com/ksb_ub/",
    },
    create: { id: "main", name: "Kelompok Studi Biologi Universitas Brawijaya", email: "ksbbioub@gmail.com", phone: "089507101387 (Nazwa)", instagram: "https://www.instagram.com/ksb_ub/" },
  });

  const category = await db.category.upsert({ where: { slug: "kegiatan-ksb" }, update: { name: "Kegiatan KSB" }, create: { name: "Kegiatan KSB", slug: "kegiatan-ksb" } });
  await db.article.upsert({
    where: { slug: "ekspedisi-lapang-ksb-ub-2026" },
    update: {},
    create: {
      title: "Ekspedisi Lapang KSB UB 2026: Biotopia",
      slug: "ekspedisi-lapang-ksb-ub-2026",
      excerpt: "KSB UB mengajak Biologi Muda mengeksplorasi keanekaragaman hayati melalui kegiatan lapang di Coban Srikandi.",
      content: "Ekspedisi Lapang KSB UB 2026 mengusung tema Biotopia: Expedition into Biodiversity. Kegiatan mencakup materi, praktik lapang, dan waktu eksplorasi bersama. Informasi ini diringkas dari pengumuman Instagram KSB UB pada 13 Oktober 2026.",
      author: "KSB UB",
      coverImage: "/images/ksb/ekspedisi-lapang-ksb-ub-2026.webp",
      categoryId: category.id,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date("2026-10-13T00:00:00+07:00"),
    },
  });
  await db.event.upsert({
    where: { slug: "ekspedisi-lapang-ksb-ub-2026" },
    update: { status: ContentStatus.PUBLISHED },
    create: {
      title: "Ekspedisi Lapang KSB UB 2026: Biotopia",
      slug: "ekspedisi-lapang-ksb-ub-2026",
      description: "Kegiatan lapang bertema Biotopia: Expedition into Biodiversity, berisi materi, praktik lapang, dan eksplorasi bersama. Benefit yang diumumkan mencakup e-sertifikat, transportasi pulang-pergi, dan konsumsi. Pendaftaran 13–16 Oktober 2026; informasi lanjut melalui CP Intan: 0856-5565-3052.",
      location: "Coban Srikandi",
      image: "/images/ksb/ekspedisi-lapang-ksb-ub-2026.webp",
      startsAt: new Date("2026-10-18T06:00:00+07:00"),
      status: ContentStatus.PUBLISHED,
    },
  });

  for (const item of [
    { id: "ig-ekspedisi-2026", title: "Ekspedisi Lapang KSB UB 2026", description: "Poster publik kegiatan Ekspedisi Lapang KSB UB 2026.", category: "Kegiatan", imagePath: "/images/ksb/ekspedisi-lapang-ksb-ub-2026.webp", sortOrder: 1 },
    { id: "ig-edukasi-jamur", title: "Edukasi pemanfaatan limbah pertanian", description: "Visual edukasi publik KSB UB tentang pemanfaatan limbah pertanian.", category: "Edukasi", imagePath: "/images/ksb/edukasi-limbah-pertanian.jpg", sortOrder: 2 },
    { id: "ig-edukasi-bioremediasi", title: "Edukasi bioremediasi emisi karbon", description: "Visual edukasi publik KSB UB tentang bioremediasi emisi karbon.", category: "Edukasi", imagePath: "/images/ksb/edukasi-bioremediasi.jpg", sortOrder: 3 },
  ]) await db.galleryImage.upsert({ where: { id: item.id }, update: item, create: item });

  // Agenda konseptual, bukan pengumuman resmi; sengaja disimpan sebagai draf.
  await db.event.upsert({ where: { slug: "rencana-kelas-identifikasi-tumbuhan" }, update: {}, create: { title: "Rencana: Kelas Identifikasi Tumbuhan", slug: "rencana-kelas-identifikasi-tumbuhan", description: "Konsep agenda internal untuk latihan identifikasi tumbuhan. Perlu dikonfirmasi dan dilengkapi pengurus sebelum dipublikasikan.", location: "Belum ditentukan", startsAt: new Date("2026-11-08T08:00:00+07:00"), status: ContentStatus.DRAFT } });
}
main().finally(() => db.$disconnect());
