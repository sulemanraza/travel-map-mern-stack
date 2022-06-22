const mongoose = require("mongoose");
const app = require("./app");

// config db
mongoose.connect(process.env.DB_URL, () => {
  try {
    console.log("db connect");
  } catch (error) {
    console.log(error);
  }
});
// create server using app modules
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Example app listening on PORT http://localhost:${PORT}!`)
);
