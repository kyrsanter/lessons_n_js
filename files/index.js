const fs = require('fs')

/*======== SYNC ============*/
const buffer = fs.readFileSync('./files/read.js');
let arr = buffer.toString().split('\r\n');
fs.writeFileSync('./files/write.txt', arr.join('\n'))

/*========= ASYNC ==========*/

fs.readFile('./files/read.js', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        process.exit(0)
    }
    let arr = data.split('\r\n');
    fs.writeFile('./files/write.txt', arr.join('\n') + '\nthis is a new text', (err) => {
        if (err) {
            console.log(err)
            process.exit(0)
        }
    })
})

/* ====== array of files ========== */

let files = ['read_stat_1.js', 'read_stat_2.js', 'read_stat_3.js'];
let stats = [];

let printStat = () => {
    console.dir(stats)
}

files.forEach( (file, i) => {
    let path = `./files/${file}`;
    fs.lstat(path, (err, stat) => {
        if (err) {
            console.log(err);
            process.exit(0) 
        }
        else {
            stats[i] = stat
        }
        if (i === files.length - 1) {
            // printStat()
        }
    })
})

/* = ====== file watcher ============*/

fs.watch('./files/write.txt', (event, file) => {
    // console.log(event)
    fs.readFile(`./files/${file}`, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            process.exit(0)
        }
        // console.log(data.length)
    }) 
})

let piceOfData = fs.createReadStream('./files/img.jpg');
let image = ''
let chunkCounter = 1
piceOfData.on('data', (chunk) => {
    image += chunk
    // console.log(image.length, `${chunkCounter} - chunk`)
    chunkCounter++

})
piceOfData.on('end', () => {
    // console.log(image.length)
    fs.lstat('./files/img.jpg', (err, stat) => {
        // console.log(stat)
        // console.log(image)
    })
})

/* ================ write streem ==================== */

const rs = fs.createReadStream('./files/img.jpg');
let ws = fs.createWriteStream('./files/img_copy.jpg');
rs.pipe(ws)