import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();
const importData = async () => {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => ({
        ...product,
        user: adminUser,
    }));

    await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
};

const destroyData = async () => {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
};

const run = async () => {
    try {
        await connectDB();
        if (process.argv[2] === '-d') {
            await destroyData();
        } else {
            await importData();
        }
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

run();

