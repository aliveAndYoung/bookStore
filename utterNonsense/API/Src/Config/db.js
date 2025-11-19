import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        console.log("connecting to DB...");
        await mongoose.connect(
            process.env.MONGO_URI ||
                "mongodb+srv://joeking01015582672_db_user:nxqXlg2IAzXRlaCL@cluster0.ytewopf.mongodb.net/mySuperduberDatabase?appName=Cluster0"
        );
    } catch (error) {
        console.log("Error in DB connection", error);
    }
};
