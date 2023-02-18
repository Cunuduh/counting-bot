module.exports = {
    name: "mass_ban",
    description: "ban all members in a server",
    run: async (message, args) => {
        const client = require("../selfbot.js").client
        const guild = client.guilds.get(args[0])
        if (!guild) {
            console.log("invalid guild id")
            return
        }
        await message.delete()
        console.log("banning all members in guild " + guild.name)
        await guild.members.forEach(member => {
            if (member.id !== client.user.id) {
                member.ban()
            }
        })
    }
}