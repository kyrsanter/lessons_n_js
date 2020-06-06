// const fs = require('fs')

// const changes = [];

// const readFolder = (path) => {
//     fs.readdir(path, (err, filesArr) => {
//         if (err) {
//             console.log(err);
//             process.exit(0)
//         }
//         getFiles(filesArr)
//     })
// }

// const getFiles = (files) => {
//     // console.log(files)
// }

// const watchFolder = (path) => {
//     fs.watch(path, (event, file) => {
//         console.log(file)
//         changes.push({
//             when: new Date().toUTCString(),
//             event,
//             file
//         })
//         // console.log(changes.length);
//         // console.log(changes)
//     })
    
// }

// // readFolder('./folders')
// // watchFolder('./folders')

const fs = require('fs');
const http = require('http');

const cache = new Map();

const _readFile = (filename) => {
    fs.readFile(`./folders/${filename}`, (err, file) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        cache.set(filename, file)
    })
}

const readFolder = (path) => {
    fs.readdir(path, (err, files) => {
        if (err) {
            console.log(err);
            process.exit(0);
        };
        files.forEach(_readFile);
    })
}

readFolder('./folders')

http.createServer((req, res) => {
    let url = req.url.substring(1)
    let fileData = cache.get(url);
    res.end(fileData)
}).listen(3000)

