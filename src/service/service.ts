import { ChatMember  } from "node-telegram-bot-api";
export const  isAdmin = (members: ChatMember[],userId : number):  boolean =>{
	const admin = members.every(i => i.user.id === userId)
	return admin
}
