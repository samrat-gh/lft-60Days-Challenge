const app = require("./app");

const { PORT } = process.env;
const startApp = () => {
  app.listen(PORT, () => {
    console.log("App running at PORT", PORT);
  });
};

startApp();
