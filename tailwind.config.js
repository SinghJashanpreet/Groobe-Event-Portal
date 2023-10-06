/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'Bell': ['Bellefair, serif'],
      'sans': ['Open Sans, sans-serif'],
      'roboto': ['Roboto, sans-serif'],
      'inter': ['Inter, sans-serif'],
      'lora': ['Lora, serif']
    },
    screens: {
      's': '200px',
      'tall': { 'raw': '(min-height: 800px)' },
      'm': '300px',
      '2m': '450px',
      '3m': '470px',
      'sm': '507px',
      'md': '767px',
      '2md': '850px',
      'lg': '1024px',
      '2lg': '1124px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      boxShadow: {
        'custom': '0px 7.6343488693237305px 13.36011028289795px 0.9542936086654663px #00000045',
        'footer-shadow': '0px -7px 39.07563781738281px 0.797461986541748px #E0D7F2E5',
        'map-shadow': '0px 4.703884601593018px 7.996603488922119px 0px #00000073'
      },
    },
  },
  plugins: [],
}

