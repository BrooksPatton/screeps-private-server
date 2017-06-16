/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder-role');
 * mod.thing == 'a thing'; // true
 */
 
const utilities = require('./utilities')
const upgraderRole = require('./upgrader-role')
 
function run(creep) {
  utilities.toggleWorking(creep)

  if(!creep.memory.working) utilities.harvest(creep)
  else build(creep)
}

function build(creep) {
  const site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
    
  if(site) {
    const result = creep.build(site)
      
    if(result === ERR_NOT_IN_RANGE) creep.moveTo(site)
  } else {
    upgraderRole.run(creep)
  }
}

module.exports = {
  run
};
