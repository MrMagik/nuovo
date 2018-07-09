const express = require("express");
const router = require("./routes/routes.js")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/bears", router);


app.listen(port, () => console.log(`Listening on port ${port}...`));
