import { connect } from "mongoose";
import config from "./config";

const connecMongo = async ()=>{
	try {
	connect(config.MONGO_URL,{})
		console.log("Connected to DB")
	} catch (error) {
		throw new Error("Error happened while connecting to db")
	}
}
(async()=>{
	await connecMongo()
})()
export default connecMongo;
