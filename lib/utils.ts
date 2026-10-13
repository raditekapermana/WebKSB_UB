export function formatDate(date: Date) { return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(date); }
export function slugify(value: string) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
