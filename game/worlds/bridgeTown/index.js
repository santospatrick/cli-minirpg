let objectives = []

let killGoblins = {
  name: 'Kill Goblins right behind you!',
  level: 2,
  completed: false,
  enemy: {
    alive: true,
    maxDamage: 5,
    minDamage: 1
  }
}

objectives.push(killGoblins)

module.exports = {
  name: 'Bridge Town',
  status: 'Available',
  data: [],
  objectives: objectives
}
