import mongoose from "mongoose";

mongoose.connect("mongodb+srv://felipeAndrade:81656607@cluster0.g9xofol.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;
