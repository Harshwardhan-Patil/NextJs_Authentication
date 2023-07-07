import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Successfully connected to database');
        })

        connection.on('error', (error) => {
            console.log('An error occurred while interacting with the database');
            console.log(error);
            process.exit();

        })
    } catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }

}