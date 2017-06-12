const minNumOfHarvesters = 9
const minNumOfUpgraders = 1

function run() {
  const numHarvesters = _.sum(Game.creeps, c => c.memory.role === 'harvester')
  const numUpgraders = _.sum(Game.creeps, c => c.memory.role === 'upgrader')

  for(let name in Game.spawns) {
    const spawn = Game.spawns[name]

    if(numHarvesters < minNumOfHarvesters) spawnCreep(spawn, 'harvester')
    if(numUpgraders < minNumOfUpgraders) spawnCreep(spawn, 'upgrader')
    else spawnCreep(spawn, 'upgrader')
  }
}

function spawnCreep(spawn, role) {
  const body = calculateBody(spawn.room)
  const memory = {role, working: false}
  const result = spawn.createCreep(body, null, memory)

  if(typeof result === 'string') {
    console.log(`${spawn.name} just created ${result} with the role ${role}`)
  }
}

function calculateBody(room) {
  return [WORK, CARRY, MOVE, MOVE]
}

module.exports = {run}
