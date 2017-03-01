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
  clear()

  if (arguments.length === 0) {
    console.log('you forgot to pass numbers to \'travelCountdown()\'')
    process.exit(0)
  }

  return new Promise(function (resolve, reject) {
    var number = seconds

    var travelSpinner = new Spinner('Travelling in ' + number + ' seconds...')
    travelSpinner.start()

    var countdown = setInterval(function () {
      number--
      travelSpinner.message('Travelling in ' + number + ' seconds...  ')
      if (number === 0) {
        clearInterval(countdown)
        process.stdout.write('\n')
        clear()
        resolve()
      }
    }, 1000)
  })
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
    travelCountdown(3)
      .then(function () {
        console.log('Hey ' + answers.username + ', Welcome to ' + answers.world + '!')
        process.exit(0)
      })
  })
