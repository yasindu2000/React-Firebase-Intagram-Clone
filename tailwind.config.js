/** @type {import('tailwindcss').Config} */
export default {
  content: [
"./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {

      colors:{

        white: "#ffffff",
        blue:{
          medium: "#005C98",
        },
        black: {
        
        light: "#262626",
        faded: "#00000059"
      },
      garay:{
         
        base: " #616161",
        background: "#fafafa",
        primary: "#dbdbdb"
  
      },
      red: {
      
      primary: "#ed4956",
    },
      },
    },
  },
  plugins: [],
}

