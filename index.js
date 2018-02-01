// OPCODE REQUIRED :
// - C_END_MOVIE
// - S_PLAY_MOVIE

// Version 1.27 r:02

module.exports = function AutoCutscene(d) {

	let enable = true

	// code
	d.hook('S_PLAY_MOVIE', (e) => {
		if (!enable) return
		d.toServer('C_END_MOVIE', Object.assign({ unk : 1}, e))
		return false
	})

	// command
	try {
		const Command = require('command')
		const command = Command(d)
		// toggle
		command.add('skip', () => {
			enable = !enable
			send(`${enable ? 'enabled'.clr('56B4E9') : 'disabled'.clr('E69F00')}` + `.`.clr('FFFFFF'))
		})
		function send(msg) { command.message(`[auto-cutscene] : ` + [...arguments].join('\n\t - ')) }
	} catch (e) { console.log(`[ERROR] -- auto-cutscene module --`) }

}

// credit : https://github.com/Some-AV-Popo
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}` }
