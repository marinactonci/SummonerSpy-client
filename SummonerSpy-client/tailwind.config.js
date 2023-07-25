/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': '0.4fr 0.6fr',
        'match': '145px 145px',
        'items': 'repeat(6, 24px)'
      }
    }
  },
  plugins: [require("daisyui")]
}
