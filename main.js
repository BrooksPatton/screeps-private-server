const spawner = require('./spawner')
const harvesterRole = require('./harvester-role')
const upgraderRole = require('./upgrader-role')
const utilities = require('./utilities')
const builderRole = require('./builder-role')
const repairerRole = require('./repair-role')

function loop() {
  utilities.clearOutDeadCreeps()
  spawner.run()

  for(let name in Game.creeps) {
    const creep = Game.creeps[name]

    if(creep.memory.role === 'harvester') harvesterRole.run(creep)
    else if(creep.memory.role === 'upgrader') upgraderRole.run(creep)
    else if(creep.memory.role === 'builder') builderRole.run(creep)
    else if(creep.memory.role === 'repairer') repairerRole.run(creep)
  }
}

module.exports = {loop}
