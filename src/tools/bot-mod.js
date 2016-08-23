/**
 * Bot Module Class
 */

'use strict';

const Path = require('path');

/**
 * Represents a Bot Module
 */
class BotMod {
	/**
	 * @param {Path} path - Location of the module in the file system
	 * @param {Object} config - Module Configuration
	 */
	constructor(path, config) {
		this.enabled = true;
		this.id = config.id;
		this.name = config.name;
		this.description = config.description || "";
		this.version = config.version;
		if (config.main) {
			this.system = require(Path.resolve(path, config.main));
		} else {
			this.system = null;
		}
		this.commands = {};
		if (config.commands && config.commands.length) {
			for (let i = 0; i < config.commands.length; i++) {
				let mc = require(Path.resolve(path, config.commands[i]));
				Object.merge(this.commands, mc);
			}
		}
	}

	disable() {
		this.enabled = false;
		if (this.system && typeof this.system.disableModule === 'function') {
			this.system.disableModule();
		}
	}

	enable() {
		this.enabled = true;
		if (this.system && typeof this.system.enableModule === 'function') {
			this.system.enableModule();
		}
	}
}

module.exports = BotMod;
