const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const port = 9000;

const userRoute = require("./routes/users");
app.use(cors());
app.use(userRoute);

const connect = require("./db/connection"); //importing db
connect(); //function for connecting db

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
