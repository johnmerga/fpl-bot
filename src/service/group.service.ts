import { IGroupDocument } from "./interface"
import { Group } from "./schema"
export const groupExist = async(groupId: number): Promise<{
	exist :boolean,
	group: IGroupDocument | Error | undefined,
	message: string,
}> =>{
	try {
		const exist = await Group.findOne({
			groupId
		})
		if(!exist) return {
			exist: false,
			group: undefined,
			message: "not found"

		}
		return {
			exist: true,
			group: exist,
			message: "existed group founded",
		}
	} catch (error) {
		return {
			exist: false,
			group : undefined,
			message:"undhandled error while fetching group info",
		}
	}
}


