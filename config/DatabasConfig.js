const dotenv = require("dotenv");
dotenv.config();

const db = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then(() => {console.log("db connected successfully");})
.catch((err) => {console.log(err);});

module.exports = db;