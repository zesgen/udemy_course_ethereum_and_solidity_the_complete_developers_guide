const compileResult = require('./compile')

console.log('The ABI is:');
console.log(compileResult.abi);

console.log('The bytecode is:');
console.log(compileResult.evm.bytecode.object);

console.log('Done');