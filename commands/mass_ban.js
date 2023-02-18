module.exports = {
    name: "mass_ban",
    description: "ban all members in a server",
    run: async (message, args) => {
        const client = require("../selfbot.js").client
        const guild = client.guilds.get(args[0])
        if (!guild) {
            await message.channel.send("invalid guild id")
            return
        }
        await message.delete()
        await guild.members.forEach(member => {
            if (member.id !== client.user.id) {
                member.ban()
            }
        })
    }
}