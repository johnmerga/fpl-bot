import  { Document, Model } from "mongoose";

// User model
export interface IUser {
	userName: string,
	telegramUserId: number,
}

export interface IUserDocument extends IUser,Document{
}
export interface IUserModel extends Model<IUserDocument>{
}
export type UpdateUser = Omit<IUser, "telegramUserId">


// League and Group
export interface ILeague {
	leagueId: number,
	leageName: string,
	leagueMembers: string[]
}

export interface IGroup {
	owner: number,
	groupId: number,
	groupName: string,
	groupAdmins?: number[]
	groupMember?: string[],
	leagues?: ILeague[],
}

export interface ILeagueDocument extends ILeague,Document{}
export interface ILeagueModel extends Model<ILeagueDocument>{}

export interface IGroupDocument extends IGroup, Document{}
export interface IGroupModel extends Model<IGroupDocument>{}
export type NewLeagueInput = Omit<ILeague,'owner'>
export type NewGroupInput = Omit<IGroup,'groupAdmins'|'groupMember'|'leagues'>
export type UpdateGroupInput = Omit<IGroup,'groupId'>

