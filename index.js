// Version 1.29 r:00

const Command = require('command')

const config = require('./config.json')

module.exports = function AutoCutscene(d) {
	const command = Command(d)

	// config
	let enable = config.enable

	// command
	// toggle
	command.add('skip', () => {
		enable = !enable
		send(`${enable ? 'Enabled' : 'Disabled'}`)
	})

	// code
	d.hook('S_PLAY_MOVIE', 1, (e) => {
		if (!enable) return
		d.send('C_END_MOVIE', 1, Object.assign({ unk : 1 }, e))
		return false
	})

	// helper
	function send(msg) { command.message(`[auto-cutscene] : ` + msg) }

}