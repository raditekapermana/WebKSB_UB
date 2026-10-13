import { describe, expect, it } from "vitest";
import { slugify } from "./utils";
describe("slugify", () => { it("membuat slug yang aman", () => expect(slugify("Kelas Lapang: Biologi & Ekologi!")).toBe("kelas-lapang-biologi-ekologi")); });
