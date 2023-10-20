import { User } from "../service/schema";
import { IUser, IUserDocument, UpdateUser} from "../service/interface";
import { userExist } from "../service/user.service";

export const createUser = async (userInput: IUser): Promise<IUserDocument> => {
	try {
		const oldUser = await userExist(userInput)
		if(oldUser ){
			throw new Error("users already exitst")
		}
		const newUser = await User.create(userInput);
		if (!newUser) {
			throw new Error('error happened while creating a suit');
		}
		return newUser;
	} catch (error) {
		if( error instanceof Error )throw error
		throw new Error("server error: `creating user servie`")
	}
};


export const updateUser = async (userInput: UpdateUser,telegramUserId: number): Promise<IUserDocument> => {
	try {
		const user = await User.findOneAndUpdate({
			telegramUserId
			}, userInput
		)
		if(!user){
			throw new Error("something went wrong while updating user")
		}
		return user
	} catch (error) {
		if( error instanceof Error )throw error
		throw new Error("server error: `updating user`")
	}
};



export const deleteUser = async (telegramUserId: number): Promise<IUserDocument> => {
	try {
		const user = await User.findOneAndDelete({
			telegramUserId
		})
		if(!user){
			throw new Error("something went wrong while deleting user")
		}
		return user
	} catch (error) {
		if( error instanceof Error )throw error
		throw new Error("server error: `deleting user`")
	}
};
