#!/usr/bin/env node

const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const worlds = require('./game/worlds/index.js')
const clear = require('clear')
const CLI = require('clui')
const Spinner = CLI.Spinner

console.log(
  chalk.green(
    figlet.textSync('MINIRPG', {
      horizontalLayout: 'full'
    }, function (err, data) {
      if (err) {
        console.log('Something went wrong...')
        console.dir(err)
        return
      }
      start()
    })
  )
)

let userName = {
  type: 'input',
  name: 'username',
  message: 'choose your username: ',
  validate: function (value) {
    if (value.length) {
      return true
    }
  }
}

let worldsList = {
  type: 'list',
  name: 'world',
  message: 'choose a world to trip: ',
  choices: worlds
}

let questions = []

questions.push(userName, worldsList)

let start = inquirer.prompt(questions)
  .then(function (answers) {
    clear()
    console.log('Chosen username: ' + answers.username)
    console.log('Chosen world: ' + answers.world)
    var countdown = new Spinner('Travelling in 3 seconds...')
    countdown.start()

    var number = 3
    setInterval(function () {
      number--
      countdown.message('Travelling in ' + number + ' seconds...  ')
      if (number === 0) {
        process.stdout.write('\n')
        process.exit(0)
      }
    }, 1000)
  })
