// OPCODE REQUIRED :
// - C_END_MOVIE
// - S_PLAY_MOVIE

// Version 1.24 r:00

module.exports = function SkipCutscene(d) {

	let enable = true

	// code
	d.hook('S_PLAY_MOVIE', (e) => {
		if (!enable) return
		d.toServer('C_END_MOVIE', {
			movie: e.movie,
			unk: 1
		})
		return false
	})

	// command
	try {
		const Command = require('command')
		const command = Command(d)
		// NA
		command.add('skip', () => {
			enable = !enable
			send(`${enable ? 'enabled'.clr('56B4E9') : 'disabled'.clr('E69F00')}` + `.`.clr('FFFFFF'))
		})
		// KR
		command.add('스킵', () => {
			enable = !enable
			send(`${enable ? '실행되었습니다'.clr('56B4E9') : '중지되었습니다'.clr('E69F00')}` + `.`.clr('FFFFFF'))
		})
		function send(msg) { command.message(`[skip-cutscene] : ` + msg) }
	} catch (e) { console.log(`[ERROR] -- Skip Cutscene module --`) }

}

// For a certain color OCD baka. ex: 'seraphinudez'.clr('BADA55')
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}` }
