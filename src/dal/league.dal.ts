import { IGroup, IGroupDocument, NewLeagueInput } from "../service/interface";
import { Group } from "../service/schema";
import { createLeagueValidation } from "../validation";

export const createLeague = async (createLeagueInput: NewLeagueInput,groupId: number): Promise<IGroupDocument> => {
	try {
		const groupExist = await Group.findOne({
			groupId
		})
		if(!groupExist){
			throw new Error(`Group doesn't exit. please link your group first`)
		}
		if(groupExist.leagues !== undefined || groupExist.leagues == null){
			const {error, value} = createLeagueValidation.validate(createLeagueInput)
			if(error){
				throw new Error(`invalid validation. ${error.message}`)
			}
			const updatedGroup : IGroup = {
				...groupExist,
				leagues: [...value]
			}
			const newLeague = await groupExist.updateOne(updatedGroup)
			if(!newLeague){
				throw new Error(`couldn't create league. something unexpected happened`)
			}
			return newLeague
		}
		//
		throw new Error(`not implemented yet`)
	} catch (error) {
		if(error instanceof Error){
			throw error.message
		}else{
			throw new Error("Server error: failed to create League data")
		}

	}
};
