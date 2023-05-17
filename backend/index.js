const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongoose.url)
  .then(() => console.log("DB connected..."))
  .catch((error) =>
    console.log("Error in DB connection...", console.log(error))
  );

app.listen(config.port, () => {
  console.log("listening on port...");
});
