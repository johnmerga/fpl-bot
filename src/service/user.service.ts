import { Message } from "node-telegram-bot-api";
import { IUser, UpdateUser } from "./interface";
import { User } from "./schema";

export const userExist = async (msg: Message | IUser | UpdateUser): Promise<boolean> => {
	try {
		let telegramId;
		if( msg && msg.hasOwnProperty('userName')){
			telegramId = (msg as IUser).telegramUserId
		}else{
			telegramId = (msg as Message).chat.id
		}
		const	user = await User.findOne({
			telegramUserId:telegramId
		})
		if (!user){
			return false
		}
		return true
	} catch (error) {
		return false
	}
};

