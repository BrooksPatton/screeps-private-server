function toggleWorking(creep){
  if(!creep.memory.working && creep.carry.energy === creep.carryCapacity) creep.memory.working = true
  else if(creep.memory.working && creep.carry.energy === 0) creep.memory.working = false
}

function harvest(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: s => s.energy > 0})
  const result = creep.harvest(source)

  if(result === ERR_NOT_IN_RANGE) creep.moveTo(source)
}

function clearOutDeadCreeps() {
  for(let name in Memory.creeps) {
    if(! Game.creeps[name]) {
      console.log(`Purging ${name} from memory`)
      delete Memory.creeps[name]
    }
  }
}

function printCpuUsage() {
  const cpuUsed = Game.cpu.getUsed()
  const cpuLimit = Game.cpu.limit
  const cpuBucket = Game.cpu.bucket

  if(cpuUsed > cpuLimit) {
    console.log(`
      Current CPU usage: ${cpuUsed}
      Bucket amount left: ${cpuBucket}
    `)
  }
}

module.exports = {
  toggleWorking,
  harvest,
  clearOutDeadCreeps,
  printCpuUsage
}
