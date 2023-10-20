// import { Message } from "node-telegram-bot-api";
// import { ChatType, Command } from "./g.types";
// import { bot } from "./server";

// bot.onText(/linkgroup/, async (msg: Message) => {
//   try {
//     const chat = await bot.getChat(msg.chat.id);
//     const admin = await bot.getChatAdministrators(msg.chat.id);
//     const userId = msg.from?.id;
//     if (msg.chat.type !== ChatType.GROUP) {
//       bot.sendMessage(msg.chat.id, `Please use this command ${Command.linkGroup} in group`);
//       return;
//     } else if (msg.chat.type == ChatType.GROUP) {
//       const isAdmin = admin.find(i => {
//         i.user.id === userId;
//       });
//       if (!isAdmin) {
//         bot.sendMessage(msg.chat.id, `Only group admins can send this command`);
//         return;
//       }
//       const replay = `you group info added.\ngroup chat id: ${chat.id} \nuserId: ${userId}`;
//       bot.sendMessage(msg.chat.id, replay);
//       return;
//     }
//   } catch (error) {
//   }
// });

