// Version 1.30 r:00

const config = require('./config.json');

module.exports = function AutoCutscene(m) {
	const cmd = m.command || m.require.command;

	// config
	let enable = config.enable;

	// command
	// toggle
	cmd.add('skip', {
		$none() {
			enable = !enable;
			send(`${enable ? 'En' : 'Dis'}abled`);
		}
	});

	// code
	m.hook('S_PLAY_MOVIE', 1, (e) => {
		if (!enable) return
		m.send('C_END_MOVIE', 1, Object.assign({ unk : 1 }, e));
		return false
	});

	// helper
	function send(msg) { cmd.message(`: ` + msg); }

}