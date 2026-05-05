import { describe, expect, it } from "vitest";
import {
  createPasswordHash,
  isPasswordMatch,
  parseStoredJson,
  validateReportData,
} from "./appState";

describe("app state helpers", () => {
  it("falls back when stored JSON is corrupted", () => {
    expect(parseStoredJson("not-json", { ok: true })).toEqual({ ok: true });
  });

  it("creates a non-plaintext password hash that can be verified", async () => {
    const hash = await createPasswordHash("password123");

    expect(hash).not.toBe("password123");
    expect(hash).toMatch(/^sha256:/);
    await expect(isPasswordMatch("password123", hash)).resolves.toBe(true);
    await expect(isPasswordMatch("wrong-password", hash)).resolves.toBe(false);
  });

  it("supports legacy plaintext passwords during migration", async () => {
    await expect(isPasswordMatch("password123", "password123")).resolves.toBe(true);
  });

  it("rejects report data without category or location", () => {
    expect(
      validateReportData({
        title: "Dompet",
        category: "",
        description: "Dompet coklat",
        location: "",
        contact: "user@example.com",
      }),
    ).toEqual({
      isValid: false,
      message: "Kategori dan lokasi wajib dipilih.",
    });
  });
});
