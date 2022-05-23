module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        116: '28rem',
        'full-4': 'calc(100vh - 2rem)',
      },
      maxWidth: {
        180: '45rem',
      },
      minWidth: {
        10: '2.5rem',
        12: '3rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
