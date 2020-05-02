'use strict';

class auto_cutscene {

  constructor(mod) {

    this.c = mod.command;

    // command
    mod.command.add('skip', {
      '$default': () => {
        mod.settings.enable = !mod.settings.enable;
        this.send(`${mod.settings.enable ? 'En' : 'Dis'}abled`)
      }
    });

    // code
    mod.hook('S_PLAY_MOVIE', 1, (e) => {
      if (mod.settings.enable) {
        this.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
        return false;
      }
    });

  }

  destructor() {}
  
  send(msg) { this.c.message(': ' + msg); }

}

module.exports = auto_cutscene;