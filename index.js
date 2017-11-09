// OPCODE REQUIRED :
// - C_END_MOVIE
// - S_PLAY_MOVIE

module.exports = function SkipCutscene(dispatch) {

	let enable = true

	// command
	try {
		const Command = require('command')
		const command = Command(dispatch)
		// NA
		command.add('skip', () => {
			enable = !enable
			send(`${enable ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'}<font>.</font>`)
		})
		// KR
		command.add('스킵', () => {
			enable = !enable
			send(`${enable ? '<font color="#56B4E9">실행</font>' : '<font color="#E69F00">중지</font>'}<font>되었습니다.</font>`)
		})
		function send(msg) {
			command.message(`[skip-cutscene] : ` + msg)
		}
	} catch (e) {
		console.log(`[ERROR] -- Skip Cutscene module --`)
	}

	// code
	dispatch.hook('S_PLAY_MOVIE', (event) => {
		if (enable) {
			//console.log(`[skip-cutscene] : Video id : ` + event.movie)
			dispatch.toServer('C_END_MOVIE', Object.assign({ unk: true }, event))
			return false
		}
	})

}
