require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 4000;

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/owner", require("./routes/owner.routes"));


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
