require("dotenv").config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE_URI.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

(async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connection successful!");
    } catch (error) {
        console.log(error);
    }
})();

const port = process.env.PORT || 9090;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
