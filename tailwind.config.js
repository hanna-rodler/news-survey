/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './app.vue', './error.vue'],
  theme: {
    colors: {
      current: 'currentColor',
      primary: '#004683',
      secondary: '#046B99',
      accent: '#7e5a7d',
      white: '#fdfdfd',
      info: '#42A39B',
      success: '#0D7E1B',
      // success: '#3F7441',
      warning: '#f59e0b',
      error: '#B72A3F',
      black: '#000000',
    //   black: '#000D18',
    },
    extend: {
      lineHeight: {
        '12': '3rem',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#004683',
          secondary: '#046B99',
          // secondary: '#42A39B',
          accent: '#7e5a7d',
          accent: '#7e5a7d',
          neutral: '#fdfdfd',
          "base-100": '#fdfdfd',
          // info: '#42A39B',
          info: '#1E79A6',
          success: '#468048',
          // success: '#3F7441',
          warning: '#F59E0B', // as background for black font
          error: '#B72A3F',
          black: '#000D18',
          },
        },
      ],
    },
};
