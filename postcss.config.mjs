// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Ubah 'tailwindcss' menjadi '@tailwindcss/postcss'
    "@tailwindcss/postcss": {}, // Pastikan ini ada dan penamaannya benar
    autoprefixer: {},
  },
};

export default config;
