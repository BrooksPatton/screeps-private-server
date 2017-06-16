const utilities = require('./utilities')

function run(creep) {
  utilities.toggleWorking(creep)

  if(!creep.memory.working) utilities.harvest(creep)
  else upgrade(creep)
}

function upgrade(creep) {
  const controller = creep.room.controller
  const result = creep.upgradeController(controller)

  if(result === ERR_NOT_IN_RANGE) creep.moveTo(controller)
}

module.exports = {run}
