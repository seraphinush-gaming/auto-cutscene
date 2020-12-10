'use strict';

class auto_cutscene {

  constructor(mod) {

    this.command = mod.command;

    // command
    mod.command.add('skip', {
      '$default': () => {
        mod.settings.enable = !mod.settings.enable;
        this.send(`${mod.settings.enable ? 'En' : 'Dis'}abled`);
      }
    });

    mod.command.add('cutscene', (num) => {
      if (num && !isNaN(num)) {
        mod.send('S_PLAY_MOVIE', 1, { movie: num });
        this.send(`Attempted to play cutscene ${num}`);
      }
    });

    // code
    mod.hook('S_PLAY_MOVIE', 1, (e) => {
      if (mod.settings.enable) {
        mod.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
        return false;
      }
    });

  }

  destructor() {
    this.command.remove('skip');
    this.command.remove('cutscene');
  }

  send(msg) { this.command.message(': ' + msg); }

}

module.exports = { NetworkMod: auto_cutscene };