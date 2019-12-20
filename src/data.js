const config = require('../config.json');

const commands = {
    // Other commands
    '!halp': {'audio' : null, 'desc' : 'A list of available commands.'},
    '!rng': {'audio' : null, 'desc' : 'Do you feel lucky, punk?'},
    '!stahp': {'audio' : null, 'desc' : 'Stops the current command.'},
    // Secret commands
    '!lelancepatate': {'audio' : 'lance_patate.mp3', 'desc' : null, 'volume' : 0.8, 'secret' : 1},
    '!kingmaker': {'audio' : 'roi_arthur.mp3', 'desc' : null, 'volume' : 1, 'secret' : 0.8},
    '!wow': {'audio' : 'wow.mp3', 'desc' : null, 'volume' : 1, 'secret' : 0.7},
    // Sound commands
    '!bigpun' : {'audio' : 'big_pun.mp3', 'desc' : 'You think it\'s funny, nobody else does.', 'volume' : 0.8},
    '!fbi' : {'audio' : 'fbi.mp3', 'desc' : 'Quick! Put you HDD in the microwave!', 'volume' : 0.9},
    '!gaydar' : {'audio' : 'gaydar.mp3', 'desc' : 'Not heterosexual by any means.', 'volume' : 0.8},
    '!ohboi' : {'audio' : 'oh_boi.mp3', 'desc' : 'When business is killing.', 'volume' : 1},
    '!psychoalert' : {'audio' : 'psycho_alert.mp3', 'desc' : 'Kid tested, Antoine Daniel approved.', 'volume' : 1},
    '!sureboutdat' : {'audio' : 'u_sure_bout_dat.mp3', 'desc' : 'John\'s doubting you.', 'volume' : 0.8},
    '!trololo' : {'audio' : 'trololo.mp3', 'desc' : 'A lovely song by Eduard Khil.', 'volume' : 0.8},
    '!rapbattle' : {'audio' : 'rap_battle.mp3', 'desc' : 'A crowd of youth is going wild.', 'volume' : 0.3},
    '!ree' : {'audio' : 'ree.mp3', 'desc' : 'A cry for help from a tragic youth.', 'volume' : 0.9},
    '!runbitch' : {'audio' : 'run_bitch.mp3', 'desc' : 'Serious advice from a brother.', 'volume' : 0.9},
    '!whocares' : {'audio' : 'nobody_cares.mp3', 'desc' : 'When it\'s trivial.', 'volume' : 0.9},
    '!x' : {'audio' : 'i_need_healing.mp3', 'desc' : 'Genji saying "I need healing".', 'volume' : 0.9},
    '!yes' : {'audio' : 'bison_yes_yes.mp3', 'desc' : 'Bison\'s catchphrase.', 'volume' : 0.7},
};

const errors = {
    'cooldown': 'Squawk! The PeliBot is busy eating fish at the moment (' + (config.globalCooldown/1000) + ' seconds cooldown).',
    'not_a_command': 'Squawk! This command is invalid. Use \'!halp\' for a list of available commands.',
    'not_in_a_channel': 'Squawk! You need to be in a voice channel for the PeliBot to grace you with its presence.',
    'not_in_voice_channel' : 'Squawk! You can\'t stop me!',
};

module.exports = { errors, commands };
