'use strict';

class auto_cutscene {

  constructor(mod) {

    this.m = mod;
    this.c = mod.command;
    this.s = mod.settings;

    // command
    this.c.add('skip', {
      '$default': () => {
        this.s.enable = !this.s.enable;
        this.send(`${this.s.enable ? 'En' : 'Dis'}abled`)
      }
    });

    // code
    this.m.hook('S_PLAY_MOVIE', 1, (e) => {
      if (this.s.enable) {
        this.m.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
        return false;
      }
    });

  }

  destructor() {}
  
  send(msg) { this.c.message(': ' + msg); }

}

module.exports = auto_cutscene;