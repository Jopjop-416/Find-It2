export type StoredUser = {
  email: string;
  username: string;
  passwordHash?: string;
  password?: string;
};

export type UserData = {
  email: string;
  name: string;
  avatar: string;
  passwordHash?: string;
  password?: string;
};

export type ReportFormData = {
  title: string;
  category: string;
  description: string;
  location: string;
  contact: string;
  image?: string;
};

export function parseStoredJson<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function createPasswordHash(password: string): Promise<string> {
  const encoded = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return `sha256:${hex}`;
}

export async function isPasswordMatch(
  password: string,
  storedPassword: string | undefined,
): Promise<boolean> {
  if (!storedPassword) {
    return false;
  }

  if (!storedPassword.startsWith("sha256:")) {
    return password === storedPassword;
  }

  return (await createPasswordHash(password)) === storedPassword;
}

export function getStoredUser(): StoredUser | null {
  return parseStoredJson<StoredUser | null>(
    localStorage.getItem("registeredUser"),
    null,
  );
}

export function validateReportData(formData: ReportFormData): {
  isValid: boolean;
  message: string;
} {
  const missingSelects = !formData.category.trim() || !formData.location.trim();

  if (missingSelects) {
    return {
      isValid: false,
      message: "Kategori dan lokasi wajib dipilih.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}
