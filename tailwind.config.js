module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        400: "400px",
      },
      width: {
        400: "400px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".grid-custom": {
          border: "2px solid black",
          height: "400px",
          width: "400px",
          display: "flex",
          flexDirection: "row",
        },
        ".column-custom": {
          display: "flex",
          flexDirection: "column",
          flex: "1",
        },
        ".cell-custom": {
          flex: "1",
          border: "1px solid black",
          textAlign: "center",
          fontSize: "1.25rem",
          display: "flex",
        },
      });
    },
  ],
};
