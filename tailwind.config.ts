// tailwind.config.ts
/** @type {import('tailwindcss').Config} */

module.exports = {
  // Ini memberitahu Tailwind di mana harus mencari kelas-kelas Tailwind
  // di file-file kamu agar bisa mengoptimalkan CSS yang dihasilkan.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Untuk Pages Router (jika ada)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Untuk semua komponen React kamu
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Untuk App Router (default Next.js terbaru)
    "./providers/**/*.{js,ts,jsx,tsx,mdx}", // Jika ada komponen di folder providers (seperti ThemeProvider)
  ],
  theme: {
    extend: {},
  },
  plugins: [], // Kamu bisa menambahkan plugin Tailwind di sini
};
