/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        mullish: ["Mulish", "sans-serif"],
      },
      colors: {
        blackDark: "#00000050",
        deepBlue: "#02042a",
        lightBlue: "#2b84ea",
        lightBlue300: "#4b94ed",
        lightBlue500: "#0b72e7",
        greenLight: "#61cea6",
        grayText: "#818597",
        lightGray: "#e2e2e2",
        grayBlue: "#344a6c",
        deepBlueHead: "#162f56",
        gray2: "#525a76",
        dullwhite:"#FFFFFFB3",
        whitelight:"#FFFFFF30",
        whitemedium:"#FFFFFF40",
        neonblue:"#00FFFF",

      },
    },
  },
  plugins: [],
};


