const spawner = require('./spawner')
const harvesterRole = require('./harvester-role')
const upgraderRole = require('./upgrader-role')
const utilities = require('./utilities')
const builderRole = require('./builder-role')
const repairerRole = require('./repair-role')
const refillerRole = require('./refiller-role')
const tower = require('./tower')

function loop() {
  utilities.clearOutDeadCreeps()
  spawner.run()

  for(let name in Game.creeps) {
    const creep = Game.creeps[name]

    if(creep.memory.role === 'harvester') harvesterRole.run(creep)
    else if(creep.memory.role === 'upgrader') upgraderRole.run(creep)
    else if(creep.memory.role === 'builder') builderRole.run(creep)
    else if(creep.memory.role === 'repairer') repairerRole.run(creep)
    else if(creep.memory.role === 'refiller') refillerRole.run(creep)
  }

  runTower()

  utilities.printCpuUsage()
}

function runTower() {
  for(let id in Game.structures) {
    const structure = Game.structures[id]

    if(structure.structureType === STRUCTURE_TOWER) tower.run(structure)
  }
}

module.exports = {loop}
