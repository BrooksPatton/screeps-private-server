const spawner = require('./spawner')
const harvesterRole = require('./harvester-role')
const upgraderRole = require('./upgrader-role')

function loop() {
  spawner.run()

  for(let name in Game.creeps) {
    const creep = Game.creeps[name]

    if(creep.memory.role === 'harvester') harvesterRole.run(creep)
    else if(creep.memory.role === 'upgrader') upgraderRole.run(creep)
  }
}

module.exports = {loop}
