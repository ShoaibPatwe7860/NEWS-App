const express = require("express");
const dbConnect = require("./db/connect");
const app = express();
const userRoute = require("./router/userRoute");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = 5000;
const newsRoute = require("./router/newsRoute");

app.use("/api/users/", userRoute);
app.use("/api/newsitems/", newsRoute);
app.get("/", (req, res) => res.send("hello Shoaib"));
app.listen(port, () => console.log(`example app listening on port ${port}`));
