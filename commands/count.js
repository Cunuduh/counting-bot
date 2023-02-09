module.exports = {
    name: "count",
    description: "count one plus the previous message number",
    run: async (message, args) => {
        const client = require("../selfbot.js").client
        if (message.channel.id !== args[0]) return
        console.log("sending to channel " + args[0])
        await message.delete()
        let previousMessage = await message.channel.fetchMessages({ limit: 1 })
        while (true) {
            if (previousMessage.last().author.id !== client.user.id) {
                const previousMessageNumber = previousMessage.last().content
                const newMessageNumber = parseInt(previousMessageNumber) + 1
                await message.channel.send(newMessageNumber)
                previousMessage = await message.channel.fetchMessages({ limit: 1 })
            }
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}