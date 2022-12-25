const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongoose.url)
  .then(() => console.log("DB connected..."))
  .catch((e) => console.log("Error in DB connection..."));

app.listen(config.port, () => {
  console.log("listening on port...");
});
