function run(creep) {
  toggleWorking(creep)

  if(!creep.memory.working) harvest(creep)
  else deployEnergy(creep)
}

function toggleWorking(creep){
  if(!creep.memory.working && creep.carry.energy === creep.carryCapacity) creep.memory.working = true
  else if(creep.memory.working && creep.carry.energy === 0) creep.memory.working = false
}

function harvest(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES)
  const result = creep.harvest(source)

  if(result === ERR_NOT_IN_RANGE) creep.moveTo(source)
}

function deployEnergy(creep) {
  const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS)
  const result = creep.transfer(spawn, RESOURCE_ENERGY)

  if(result === ERR_NOT_IN_RANGE) creep.moveTo(spawn)
}

module.exports = {run}
