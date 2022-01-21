module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-1": "#29D38A",
        "green-2": "#002333",
        "purple-1": "#140035",
      },
      backgroundImage: {
        heroBg:
          "url('https://media.istockphoto.com/photos/offshore-wind-power-and-energy-farm-with-many-wind-turbines-on-the-picture-id1271332416?b=1&k=20&m=1271332416&s=170667a&w=0&h=Jy_5bFzJYXnZqKRUPh2Ymy03DWDR7dOl4-sE2QoImnk=')",
        mobile:
          "url('https://cdn.dribbble.com/users/1341982/screenshots/5741035/media/7036a4555d6a01c44f15f1ac631d2e3b.gif')",
        footer:
          "url('https://image.shutterstock.com/image-vector/one-continuous-drawing-line-clean-260nw-1703287381.jpg')",
        section2:
          "url('https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW4lMjBlbmVyZ3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')",
        log: "url('../src/assets/desk.png')",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
