import Joi from 'joi';
import {  NewGroupInput, NewLeagueInput } from './service/interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLeagueBody: Record<keyof NewLeagueInput, any> = {
	leagueId: Joi.number(),
	leageName: Joi.string(),
	leagueMembers: Joi.array().items(Joi.string()),
};

export const createLeagueValidation= Joi.object().keys(createLeagueBody).prefs({
	abortEarly:false,
	presence: "required",
})


// Group Body Schema
export const createGroupBody : Record<keyof NewGroupInput, any> = {
	owner: Joi.number(),
	groupId: Joi.number(),
	groupName: Joi.string(),
}


// group validation
export const createGroupValidation = Joi.object().keys(createGroupBody).prefs({
	abortEarly: false,
	presence: "required",
})
