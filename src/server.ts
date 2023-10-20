import config from "./config";
import TelegramBot, { Message, KeyboardButton,InlineKeyboardButton, KeyboardButtonRequestChat, /* KeyboardButtonRequestChat  */} from "node-telegram-bot-api";
import { userExist } from "./service/user.service";
import "./db"
import { IUser, NewGroupInput, NewLeagueInput } from "./service/interface";
import { ChatType, CMD, HelpDescription, } from "./g.types";
import { isAdmin } from "./service/service";
import axios from "axios";
import { Group } from "./service/schema";
import { createLeague } from "./dal/league.dal";
import { groupExist } from "./service/group.service";
import { createGroup } from "./dal/group.dal";
import { createUser } from "./dal/user.dal";


const bot = new TelegramBot(config.TELEGRAM_API_KEY, { polling: true })
bot.setMyCommands([
	{
		command: CMD.start.cmds,
		description: CMD.start.desc,
	},
	{
		command: CMD.linkGroup.cmds,
		description: CMD.linkGroup.desc,
	},
	{
		command: CMD.linkLeague.cmds,
		description: CMD.linkLeague.desc,
	},
	{
		command: CMD.help.cmds,
		description: CMD.help.desc,
	},
	{
		command: CMD.score.cmds,
		description: CMD.score.desc,
	}
])

bot.onText(CMD.start.cmd, async (msg: Message) => {
	try {
		const cId = msg.chat.id
		//const uName = msg.chat.username
		const user = await userExist(msg)
		if (!user) {
			bot.sendMessage(cId, `...creating user into database`);
			const newUser: IUser = {
				userName: msg.chat.username ? msg.chat.username : "undefined",
				telegramUserId: msg.chat.id,
			}
			const created = await createUser(newUser)
			const replay = `User: ${created.userName}, \nID: ${created.telegramUserId} \nadd me to group so i can help you update your league score.`

			const btn: InlineKeyboardButton = {
				text: "where is my button",
				callback_data: "invite_me_to_group"
			}

			const inviteMeToGroupRequirement: KeyboardButtonRequestChat = {
				chat_is_channel: false,
				request_id:1,
				chat_is_created: true,
			}

const inviteMeToGrpBtn : KeyboardButton = {
	text: "invite me to group",
	request_chat: inviteMeToGroupRequirement,

}
			bot.on("callback_query", (query) => {
				if (query.data === "invite_me_to_group") {

					bot.sendMessage(cId, `please add me to your group`,{

						reply_markup:{
							remove_keyboard: true,
							selective: true,
							keyboard: [[inviteMeToGrpBtn]],
							resize_keyboard: true,
							is_persistent: false,
							one_time_keyboard: true,
							input_field_placeholder: "what's this?"
						}
					})
				}
			}
			)
			bot.sendMessage(msg.chat.id, replay,{
				reply_markup: {
					inline_keyboard : [

						[btn]
					]
				}
			})
			return
		} else {
			bot.sendMessage(cId, `you already have an account`)
			return
		}

	} catch (error) {
		if (error instanceof Error) {
			bot.sendMessage(msg.chat.id, error.message)
		} else {
			bot.sendMessage(msg.chat.id, `Server error`)
		}
	}
})

// link groupk
bot.onText(CMD.linkGroup.cmd, async (msg: Message) => {
	try {
		if (msg.chat.type === ChatType.GROUP) {
			const group = await groupExist(msg.chat.id)
			if (group.exist) {
				bot.sendMessage(msg.chat.id, group.message)
				return
			}
			const admin = await bot.getChatAdministrators(msg.chat.id)
			const createrOfGroup = admin.find((admin) => admin.status === "creator")
			/* const user = await userExist(msg) */

			let newGroup: NewGroupInput = {
				owner: createrOfGroup?.user.id ? createrOfGroup.user.id : 0,
				groupId: msg.chat.id,
				groupName: msg.chat.first_name + " " + msg.chat.last_name
			}
			newGroup = (await createGroup(newGroup, msg.chat.id)).toJSON()
			const replay = `${JSON.stringify(newGroup, null, 2)}`
			bot.sendMessage(msg.chat.id, `group created successfully. \n${replay}`)
		} else {
			bot.sendMessage(msg.chat.id, `this "${CMD.linkGroup.cmd}" commad only works in a group chat`)
		}
	} catch (error) {
		if (error instanceof Error) {
			bot.sendMessage(msg.chat.id, error.message)
		} else {
			bot.sendMessage(msg.chat.id, `Server error`)
		}
	}
})

bot.onText(CMD.linkLeague.cmd, async (msg: Message) => {
	try {
		const admins = await bot.getChatAdministrators(msg.chat.id)
		const userId = msg.from?.id
		if (msg.chat.type !== ChatType.GROUP) {
			bot.sendMessage(msg.chat.id, `Please use this command ${CMD.linkLeague.cmd} in group`)
			return
		} else if (msg.chat.type == ChatType.GROUP) {
			if (isAdmin(admins, userId ? userId : 0)) {
				bot.sendMessage(msg.chat.id, `Only group admins can send this command`)
				return
			}
			//leagueId input from user
			bot.sendMessage(msg.chat.id, `please enter league id`)
			bot.onReplyToMessage(msg.chat.id, msg.message_id, async (msg: Message) => {
				const leagueId = msg.text
				// check if league exist
				const fplResponse = await axios.get(`${config.FPL_URL}/leagues-classic/${leagueId}/standings/`)
				if (fplResponse.status !== 200) {
					bot.sendMessage(msg.chat.id, `league doesn't exist`)
					return
				}
				// check if league already exist
				const league = await Group.findOne({
					"leagues.leagueId": leagueId
				})
				if (league) {
					bot.sendMessage(msg.chat.id, `league already exist`)
					return
				}
				const newLeague: NewLeagueInput = {
					leageName: fplResponse.data.league.name,
					leagueId: fplResponse.data.league.id,
					leagueMembers: fplResponse.data.standings.results.map((member: any) => member.entry_name)
				}
				const createdLeague = await createLeague(newLeague, msg.chat.id)
				const replay = `${JSON.stringify(createdLeague, null, 2)}`
				bot.sendMessage(msg.chat.id, `league created successfully. \n${replay}`)
			}
			)

			return
		}
	} catch (error) {
		if (error instanceof Error) {
			bot.sendMessage(msg.chat.id, error.message)
		} else {
			bot.sendMessage(msg.chat.id, `Server error`)
		}
	}
})

bot.onText(CMD.help.cmd, async (msg: Message) => {
	try {
		const helpOptions: KeyboardButton[][] = [
			[{ text: HelpDescription.addleague }],
			[{ text: `add score` }],
		]

		bot.sendMessage(msg.chat.id, "FAQ", {
			reply_markup: {
				keyboard: helpOptions,
				resize_keyboard: true,
				is_persistent: false,
				one_time_keyboard: true,
				input_field_placeholder: "what's this?"

			}
		})
	} catch (error) {
	}
})

