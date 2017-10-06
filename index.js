// OPCODE REQUIRED :
// - C_END_MOVIE
// - S_PLAY_MOVIE

module.exports = function SkipCutscene(dispatch) {

	let enable = true

	// command
	try {
		const Command = require('command')
		const command = Command(dispatch)
		command.add('skip', () => {
			enable = !enable
			send(` : Skip Cutscene ${enable ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'}.`)
		})
		function send(msg) {
			command.message(`<font color="#FFFFFF">` + msg + `</font>`)
		}
	} catch (e) {
		console.log(`[ERROR] -- Skip Cutscene module --`)
	}

	// code
	dispatch.hook('S_PLAY_MOVIE', (event) => {
		if (enable) {
			dispatch.toServer('C_END_MOVIE', Object.assign({ unk: true }, event))
			return false
		}
	})

}
