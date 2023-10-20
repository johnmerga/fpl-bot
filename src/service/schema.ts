import  { Schema,model,} from "mongoose";
import { ILeagueDocument,ILeagueModel,IGroupDocument,IGroupModel, IUserDocument, IUserModel } from "./interface";
import toJSON from "../toJson";

// userSchema
const userSchema = new Schema<IUserDocument,IUserModel>({
	userName: String,
	telegramUserId:Number
})

userSchema.plugin(toJSON)
export const User = model<IUserDocument,IUserModel>('User',userSchema)


//leagueSchema
const leagueSchema = new Schema<ILeagueDocument,ILeagueModel>({
	leagueId: Number,
	leageName: {
		type: String,
		required: false,
	},
	leagueMembers: [String]

})

//GroupScheam
const groupSchema = new Schema<IGroupDocument,IGroupModel>({
	owner:{
		type: Number,
		required: false,
	},
	groupId: Number,
	groupName: String,
	groupAdmins: {
		type:[String],
		required: false,
	},
	groupMember: [String],
	leagues: {
		type: [leagueSchema],
		required: false,
	}
})

leagueSchema.plugin(toJSON)
groupSchema.plugin(toJSON)

export const Group = model<IGroupDocument,IGroupModel>('Group',groupSchema)

