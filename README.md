
  # Lost and Found Website (Community) (Copy)

  This is a code bundle for Lost and Found Website (Community) (Copy). The original project is available at https://www.figma.com/design/b9FFOdPJ2t8uwRX5OsUACm/Lost-and-Found-Website--Community---Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ---

  ## Pengujian Aplikasi — Daily Project 6

  Berikut adalah tabel pengujian aplikasi berdasarkan aspek kualitas yang ditentukan pada desain Daily Project 6. Setiap baris adalah satu kasus uji: deskripsi singkat, langkah pengujian, hasil yang diharapkan, kolom Pass/Fail untuk diisi saat pengujian, dan catatan.

  | Aspek Kualitas | Kasus Uji | Langkah Pengujian | Hasil yang Diharapkan | Pass / Fail | Catatan |
  |---|---|---:|---|---:|---|
  | Fungsionalitas | Register user (form lengkap) | 1) Buka halaman Register. 2) Isi username, email, password, konfirmasi password. 3) Submit. | Registrasi berhasil, muncul toast konfirmasi, data tersimpan di localStorage (key: `registeredUser`). |  |  |
  | Fungsionalitas | Login dengan user terdaftar | 1) Buka halaman Login. 2) Masukkan email & password yang sudah ter-registrasi. 3) Submit. | Login berhasil, diarahkan ke dashboard (atau fungsi callback dipanggil). |  |  |
  | Fungsionalitas | Laporkan kehilangan (Report Lost) | 1) Buka form Report Lost. 2) Isi semua field wajib. 3) Submit. | Data tersubmit, tampil notifikasi sukses, entri baru muncul di daftar. |  |  |
  | Usability (Kemudahan) | Navigasi menu & tautan | 1) Klik logo/menu utama. 2) Akses halaman Profil, Dashboard, Lapor. | Halaman terbuka dengan cepat dan layout responsif. Breadcrumb/heading sesuai. |  |  |
  | Performansi | Waktu muat halaman utama (development) | 1) Jalankan `npm run dev`. 2) Buka http://localhost:5173. 3) Ukur waktu sampai halaman tampil penuh. | Halaman tampil penuh dalam waktu wajar (< 3 s pada mesin dev biasa). Catat hasil pengukuran. |  |  |
  | Keamanan | Input sanitasi form (XSS basic) | 1) Pada field teks, masukkan `<script>alert(1)</script>`. 2) Submit. | Input tidak mengeksekusi script; karakter berbahaya di-escaped atau ditolak. |  |  |
  | Ketersediaan / Reliabilitas | Simulasi offline (form save) | 1) Matikan koneksi jaringan (developer tools: offline). 2) Isi form (mis. report) lalu submit. | Aplikasi menangani kegagalan jaringan (menampilkan pesan/menyimpan local draft). |  |  |
  | Kompatibilitas | Tampilan pada mobile (responsive) | 1) Buka halaman di perangkat mobile atau device emulator. 2) Cek form, tombol, carousel. | UI menyesuaikan, elemen tidak terpotong, tombol dapat diklik. |  |  |
  | Aksesibilitas | Label dan fokus (keyboard) | 1) Tab melalui halaman. 2) Periksa fokus pada input, tombol, dialog. | Fokus terlihat, label tersedia, dialog dapat ditutup via keyboard (Esc). |  |  |
  | Maintainability | Build & lint check | 1) Jalankan `npm run build` dan linter (jika tersedia). 2) Catat kesalahan/warning. | Build sukses tanpa error build; linter memberikan referensi (warning boleh). |  |  |

  Petunjuk pengisian: kolom "Pass / Fail" dan "Catatan" diisi oleh tim penguji saat menjalankan skenario. Anda dapat menambahkan baris baru untuk kasus uji tambahan yang spesifik.

  Jika Anda ingin, saya bisa:
  - Mengubah tabel menjadi file terpisah `README_TESTING.md`.
  - Menambahkan template checklist untuk hasil pengujian otomatis/manual.
  