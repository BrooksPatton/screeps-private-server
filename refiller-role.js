const utilities = require('./utilities')
const repairerRole = require('./repair-role')

function run(creep) {
  utilities.toggleWorking(creep)

  if(!creep.memory.working) utilities.harvest(creep)
  else deployEnergy(creep)
}

function deployEnergy(creep) {
  let targets = creep.room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE})
  targets = _.filter(targets, s => s.store.energy < s.storeCapacity)
  const target = targets[0]
  
  if(target) {
    const result = creep.transfer(target, RESOURCE_ENERGY)

    if(result === ERR_NOT_IN_RANGE) creep.moveTo(target)
  } else {
    repairerRole.run(creep)
  }
}

module.exports = {run}
