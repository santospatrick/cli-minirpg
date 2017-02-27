#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');

console.log(
  chalk.green(
    figlet.textSync('MINIRPG', { horizontalLayout: 'full' })
  )
)
