const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, token } = require("./config.json")
const fs = require("fs")

if (!prefix) {
    return console.error("INVALID PREFIX")
}

if (!token || token == "") {
    return console.error("INVALID TOKEN\nopen config.json and enter your token next to the token field\nif you don't know where to find your token you can google it")
}

const commands = new Discord.Collection();

const commandFile = require("./commands/count.js")

commands.set(commandFile.name, commandFile)

exports.commands = commands

client.once("ready", () => {
    console.log("logged in as " + client.user.username + "#" + client.user.discriminator)
    exports.client = client
})

client.on("message", async message => {
    if (message.author.id !== client.user.id) return
    if (!message.content.startsWith(prefix)) return
    let args = message.content.substring(prefix.length).split(" ")
    const cmd = args.shift().toLowerCase()
    args = args.filter(arg => !isNaN(arg))
    if (cmd == "botstart") {
        console.log("started counting")
        commands.get("count").run(message, args)
    } else if (cmd == "botstop") {
        await message.delete()
        console.log("stopped counting")
        await client.destroy()
        process.exit()
    }
})

setTimeout(() => {
    client.login(token)
}, 1500)