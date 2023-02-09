module.exports = {
    name: "count",
    description: "count one plus the previous message number",
    run: async (message, args) => {
        const client = require("../selfbot.js").client
        console.log("sending to channel " + args[0])
        await message.delete()
        client.on("message", async newMessage => {
            const previousMessage = await newMessage.channel.fetchMessages({ limit: 1 })
            if (previousMessage.last().author.id !== client.user.id) {
                const previousMessageNumber = previousMessage.last().content
                const newMessageNumber = parseInt(previousMessageNumber) + 1
                await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 250)))
                await newMessage.channel.send(newMessageNumber)
            }
            await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 250)))
        })
    }
}