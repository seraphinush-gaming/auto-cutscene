// OPCODE REQUIRED :
// - C_END_MOVIE
// - S_PLAY_MOVIE

// Version 1.26 r:00

module.exports = function SkipCutscene(d) {

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
		// NA
		command.add('skip', () => {
			enable = !enable
			send(`${enable ? 'enabled'.clr('5AFF39') : 'disabled'.clr('E69F00')}` + `.`.clr('FFFFFF'))
		})
		// KR
		command.add('스킵', () => {
			enable = !enable
			send(`${enable ? '실행되었습니다'.clr('5AFF39') : '중지되었습니다'.clr('E69F00')}` + `.`.clr('FFFFFF'))
		})
		function send(msg) { command.message(`[skip-cutscene] : ` + [...arguments].join('\n\t - ')) }
	} catch (e) { console.log(`[ERROR] -- Skip Cutscene module --`) }

}

// credit : https://github.com/Some-AV-Popo
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}` }
