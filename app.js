require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connect");

const PORT = process.env.PORT || 5000;

const pastEvents = require("./routes/event");
const upcomingRoutes = require("./routes/upcoming");

app.get("/", (req, res) => {
    res.send("Working");
});

app.use(express.json());
app.use(cors());

app.use("/event/past", pastEvents);
app.use("/event/upcoming", upcomingRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Started`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
