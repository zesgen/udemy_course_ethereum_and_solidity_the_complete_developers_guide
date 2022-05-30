const compileResult = require('./compile')

console.log('The interface is:');
console.log(compileResult.interface);

console.log('The bytecode is:');
console.log(compileResult.bytecode);

console.log('Done');