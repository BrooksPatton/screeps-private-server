function run(tower) {
  const enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
  if(enemy) {
    const result = tower.attack(enemy)
  }
}

module.exports = {
  run
}
