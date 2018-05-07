// need to read files from hard drive, cannot use require as it would only ready .js files
// need for 2 separate build-in standard library modules

const path = require('path'); //help build a directory path from compile.js to Inbox.sol
                              //guarantee to get cross-platform compatibility
const fs = require('fs'); //file system
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //dirname --> root
const source = fs.readFileSync(inboxPath, 'utf8'); //read file

module.exports = solc.compile(source, 1).contracts[':Inbox']; //number of file
