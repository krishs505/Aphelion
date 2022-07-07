const { bot } = require("../exports");

module.exports = {
    name: 'inviteCreate',
    execute(invite) {
        (async () => {
            if (invite.guild.id === "447561485674348544") invite.delete();
        })()
    }
}