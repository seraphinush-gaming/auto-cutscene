// OPCODE REQUIRED :
// - C_END_MOVIE
// - S_PLAY_MOVIE

// Version 1.22 r:01

module.exports = function SkipCutscene(d) {

	let enable = true

	// command
	try {
		const Command = require('command')
		const command = Command(d)
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
	d.hook('S_PLAY_MOVIE', (e) => {
		if (!enable) return
		d.toServer('C_END_MOVIE', {
			movie: e.movie,
			unk: 1
		})
		return false
	})

}
