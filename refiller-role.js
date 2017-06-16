const utilities = require('./utilities')
const repairerRole = require('./repair-role')

function run(creep) {
  utilities.toggleWorking(creep)

  if(!creep.memory.working) utilities.harvest(creep)
  else deployEnergy(creep)
}

function deployEnergy(creep) {
  const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_TOWER || s.structureType === STRUCTURE_STORAGE) && s.energy < s.energyCapacity})
  
  if(target) {
    const result = creep.transfer(target, RESOURCE_ENERGY)

    if(result === ERR_NOT_IN_RANGE) creep.moveTo(target)
  } else {
    repairerRole.run(creep)
  }
}

module.exports = {run}
