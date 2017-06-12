function run(creep) {
  toggleWorking(creep)

  if(!creep.memory.working) harvest(creep)
  else upgrade(creep)
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

function upgrade(creep) {
  const controller = creep.room.controller
  const result = creep.upgradeController(controller)

  if(result === ERR_NOT_IN_RANGE) creep.moveTo(controller)
}

module.exports = {run}
