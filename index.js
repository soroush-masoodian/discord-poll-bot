import DiscordJS, { Intents, MessageEmbed } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const PREFIX = "!";
const client = new DiscordJS.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on("ready", () => {
    console.log("bot is ready");
});

client.on("messageCreate", msg => {
    if (msg.content === 'marco') {
        msg.reply({
            content: "polo"
        });
    }
});

client.on("messageCreate", msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    console.log(args);

    switch(args[0]) {

        case "poll":
            const embed = new MessageEmbed()
            .setColor(0xFFF130)
            .setTitle("Initiate Poll")
            .setDescription("!poll to initiate a simple yes/no poll");

            if (!args[1]) {
                msg.channel.send({embeds: [embed]});
                break;
            }

            let msgArgs = args.slice(1).join(" ");
            msg.delete();
            msg.channel.send("**" + msgArgs + "**").then(msgReaction => {
                msgReaction.react("👍");
                msgReaction.react("👎");
            });
        break;
    }
});


client.login(process.env.TOKEN);