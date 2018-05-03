// Version 1.28 r:02

const Command = require('command')
const config = require('./config.json')

// credit : https://github.com/Some-AV-Popo
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}` }

module.exports = function AutoCutscene(d) {
	const command = Command(d)

	let enable = config.enable

	// code
	d.hook('S_PLAY_MOVIE', (e) => {
		if (!enable) return
		d.toServer('C_END_MOVIE', Object.assign({ unk : 1 }, e))
		return false
	})

	// command
	// toggle
	command.add('skip', () => {
		enable = !enable
		send(`${enable ? 'Enabled'.clr('56B4E9') : 'Disabled'.clr('E69F00')}`)
	})
	function send(msg) { command.message(`[auto-cutscene] : ` + msg) }

}