module.exports = {
    name: "del_roles",
    description: "delete all roles in a server",
    run: async (message, args) => {
        const client = require("../selfbot.js").client
        const guild = client.guilds.get(args[0])
        if (!guild) {
            console.log("invalid guild id. argument provided: " + args[0])
            return
        }
        await message.delete()
        console.log("deleting all roles in guild " + guild.name)
        guild.roles.forEach(role => {
            if (role.name !== "@everyone" && role.editable) {
                role.delete()
            }
        })
    }
}