const { bot } = require("../exports");

module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember) {
        (async () => {
            if (newMember.nickname === null) return;

            if (newMember.id === '822456953501646849' && newMember.nickname !== 'Aphelion') newMember.setNickname('Aphelion');

            if (newMember.id !== '252980043511234560' && newMember.nickname.toLowerCase().includes('chick3n')) newMember.setNickname(newMember.user.username);
        })()
    }
}