/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder-role');
 * mod.thing == 'a thing'; // true
 */
 
const utilities = require('./utilities')
const builderRole = require('./builder-role')
 
function run(creep) {
  utilities.toggleWorking(creep)

  if(!creep.memory.working) utilities.harvest(creep)
  else repair(creep)
}

function repair(creep) {
  const site = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => s.hits < s.hitsMax})
    
  if(site) {
    const result = creep.repair(site)
      
    if(result === ERR_NOT_IN_RANGE) creep.moveTo(site)
  } else {
    builderRole.run(creep)
  }
}

module.exports = {
  run
};
