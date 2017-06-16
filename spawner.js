const minNumOfHarvesters = 4
const minNumOfUpgraders = 1
const minNumOfBuilders = 1
const minNumOfRepairers = 1
const minNumOfRefillers = 1
let numHarvesters
let numUpgraders
let numBuilders
let numRepairers
let numRefillers

function run() {
  numHarvesters = _.sum(Game.creeps, c => c.memory.role === 'harvester')
  numUpgraders = _.sum(Game.creeps, c => c.memory.role === 'upgrader')
  numBuilders = _.sum(Game.creeps, c => c.memory.role === 'builder')
  numRepairers = _.sum(Game.creeps, c => c.memory.role === 'repairer')
  numRefillers = _.sum(Game.creeps, c => c.memory.role === 'refiller')

  for(let name in Game.spawns) {
    const spawn = Game.spawns[name]

    if(numHarvesters < minNumOfHarvesters) spawnCreep(spawn, 'harvester')
    else if(numUpgraders < minNumOfUpgraders) spawnCreep(spawn, 'upgrader')
    else if(numBuilders < minNumOfBuilders) spawnCreep(spawn, 'builder')
    else if(numRepairers < minNumOfRepairers) spawnCreep(spawn, 'repairer')
    else if(numRefillers < minNumOfRefillers) spawnCreep(spawn, 'refiller')
    else spawnCreep(spawn, 'refiller')
  }
}

function spawnCreep(spawn, role) {
  const body = calculateBody(spawn.room)
  const memory = {role, working: false}
  const result = spawn.createCreep(body, null, memory)

  if(typeof result === 'string') {
    console.log(`${spawn.name} just created ${result} with the role ${role}`)
    console.log(`
        Harvesters: ${numHarvesters}
        Upgraders: ${numUpgraders}
        Builders: ${numBuilders}
        Repairer: ${numRepairers}
        Refiller: ${numRefillers}
    `)
  }
}

function calculateBody(room) {
  const body = []
  const numIterations = Math.floor(room.energyCapacityAvailable / 250)

  if(numHarvesters === 0) return [WORK, CARRY, MOVE, MOVE]

  for(let i = 1; i < numIterations; i++) {
    body.push(WORK)
  }

  for(let i = 1; i < numIterations; i++) {
    body.push(CARRY)
  }

  for(let i = 1; i < numIterations; i++) {
    body.push(MOVE)
    body.push(MOVE)
  }
  
  return body
}

module.exports = {run}
