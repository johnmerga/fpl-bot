export enum EnvType {
	DEVELOPMENT = "development",
	PRODUCTION = "production"
}

interface ICmdValues {
		cmd: RegExp,
		cmds: string,
		desc: string
}

export interface ICMD {
	start: ICmdValues,
	linkLeague:ICmdValues,
	linkGroup:ICmdValues,
	countMeIn:ICmdValues,
	amount:ICmdValues,
	score:ICmdValues,
	help:ICmdValues,
}

export const CMD: ICMD={
	start:{
		cmd:/start/,
		cmds:"start",
		desc: 'start the bot',
	},
	linkLeague:{
		cmd:/linkleague/,
		cmds:"linkleague",
		desc: "link your fanatasy premier league"
	},
	linkGroup:{
		cmd:/linkgroup/,
		cmds:"linkgroup",
		desc: "add to group"
	},
	countMeIn:{
		cmd:/countmein/,
		cmds:"countmein",
		desc: "i want to be part of the bet"
	},
	amount:{
		cmd:/amount/,
		cmds:"amount",
		desc: "bet amount"
	},
	score:{
		cmd:/score/,
		cmds:"score",
		desc: "show me league score"
	},
	help :{
		cmd: /help/,
		cmds: "help",
		desc: "help"
	},
}

export enum ChatType
{
	PRIVATE = "private",
	GROUP="group",
	SUPERGROUP="supergroup",
	CHANNEL ="channel",
}

export enum HelpType
{
	addleague = "/addleague"
}

export const HelpDescription =
	{
		addleague  :"How can i find my League number."
	}

