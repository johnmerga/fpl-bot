import { groupExist } from "../service/group.service"
import { IGroupDocument, NewGroupInput, UpdateGroupInput } from "../service/interface"
import { Group } from "../service/schema"
import { createGroupValidation } from "../validation"

export const createGroup = async (createGroupInput: NewGroupInput, groupId: number): Promise<IGroupDocument> => {
	try {
		const group = await groupExist(groupId)
		if (group.exist) throw new Error(group.message)
		const { error, value } = createGroupValidation.validate(createGroupInput)
		if (error) {
			throw new Error(`invalid validation. ${error.message}`)
		}
		const newGroup = await new Group(value).save()
		if (!newGroup) {
			throw new Error(`failed while creating Group`)
		}
		return newGroup
	} catch (error) {
		if (error instanceof Error) {
			throw error
		} else {
			throw new Error("Server error: failed to create Group")
		}
	}
}

export const updateGroup = async (createGroupInput: UpdateGroupInput, groupId: number): Promise<IGroupDocument> => {
	try {
		const group = await groupExist(groupId)
		if (group.exist) throw new Error(group.message)
		const { error, value } = createGroupValidation.validate(createGroupInput)
		if (error) {
			throw new Error(`invalid validation. ${error.message}`)
		}
		const newGroup = await new Group(value).save()
		if (!newGroup) {
			throw new Error(`failed while creating Group`)
		}
		return newGroup
	} catch (error) {
		if (error instanceof Error) {
			throw error
		} else {
			throw new Error("Server error: failed to create Group")
		}
	}
}

export const deleteGroup = async (groupId:number): Promise<IGroupDocument> => {
	try {
		const group = await Group.findOneAndDelete({
			groupId
		})
		if(!group){
			throw new Error("couldn't delete group")
		}
		return group
	} catch (error) {
		if (error instanceof Error) {
			throw error
		} else {
			throw new Error("Server error: failed to delete Group")
		}
	}
}
