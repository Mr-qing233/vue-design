/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '5r': '5rem',
        '5.1r': '5.1rem',
        '5.25r': '5.25rem',
        '6r': '6rem',
        '7r': '7rem',
        '8r': '8rem',
        '9r': '9rem',
        '10r': '10rem',
        '11r': '11rem',
        '12r': '12rem',
        '13r': '13rem',
        '14r': '14rem',
        '15r': '15rem',
        '16r': '16rem',
        '17r': '17rem',
        '18r': '18rem',
        '19r': '19rem',
        '20r': '20rem',
        '21r': '21rem',
        '22r': '22rem',
        '23r': '23rem',
        '24r': '24rem',
        '25r': '25rem',
        '26r': '26rem',
        '27r': '27rem',
        '28r': '28rem',
        '29r': '29rem',
        '30r': '30rem',
        '40r': '40rem',
        '25vh': '25vh',
        '50vh': '50vh',
        '55vh': '55vh',
        '60vh': '60vh',
        '75vh': '75vh',
        '100vh': '100vh',
        '25vw': '25vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '75vw': '75vw',
        '100vw': '100vw',
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '65%': '65%',
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '90%': '90%'
      },
      transitionDuration: {
        50: '50ms'
      },
      aspectRatio: {
        '16/9': '16/9'
      }
    },
    minWidth: {
      20: '20rem',
      60: '60rem',
      72: '72rem',
      'px-500': '500px',
      '90%': '90%',
      'vw-90': '90vw',
      'vw-full': '100vw'
    },
    maxWidth: {
      'px-500': '500px',
      '90%': '90%',
      'vw-90': '90vw',
      'vw-full': '100vw'
    },
    minHeight: {
      'vh-full': '100vh'
    },
    aspectRatio: {
      '4/3': '4 / 3',
      '9/16': '9 / 16'
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '.el-button': {
          'background-color': 'var(--el-button-bg-color,var(--el-color-white))'
        }
      })
    }
  ]
}
