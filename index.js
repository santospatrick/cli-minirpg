#!/usr/bin/env node

const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const worlds = require('./game/index.js')
const CLI = require('clui')
const clear = require('clear')
const Spinner = CLI.Spinner

let availableWorlds = worlds.filter(function (obj) {
  return obj.status === 'Available'
})

let travelCountdown = function (seconds) {
  var number = seconds

  var countdown = new Spinner('Travelling in ' + number + ' seconds...')
  countdown.start()

  setInterval(function () {
    number--
    countdown.message('Travelling in ' + number + ' seconds...  ')
    if (number === 0) {
      process.stdout.write('\n')
      process.exit(0)
    }
  }, 1000)
}

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
  choices: availableWorlds
}

let questions = []

questions.push(userName, worldsList)

let start = inquirer.prompt(questions)
  .then(function (answers) {
    clear()

    console.log('Chosen username: ' + answers.username)
    console.log('Chosen world: ' + answers.world)

    travelCountdown(3)
  })
