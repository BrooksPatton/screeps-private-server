const utilities = require('./utilities')

function run(creep) {
  utilities.toggleWorking(creep)

  if(!creep.memory.working) utilities.harvest(creep)
  else deployEnergy(creep)
}

function deployEnergy(creep) {
  const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: s => (s.structureType === 'spawn' || s.structureType === 'extension') && s.energy < s.energyCapacity})
  const result = creep.transfer(target, RESOURCE_ENERGY)

  if(result === ERR_NOT_IN_RANGE) creep.moveTo(target)
}

module.exports = {run}
