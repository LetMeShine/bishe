let fs = require('fs')
// fs.readFile(__dirname + '/data/china.txt', (err, data) => {
//     console.log(data.toString())
//     fs.readFile(__dirname + data.toString(), (err, data) => {
//         console.log(data.toString())
//         fs.readFile(__dirname + data.toString(), (err, data) => {
//             console.log(data.toString())
//         })
//     })
// })

const Promise = require('./promise-code')

let p = new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/data/china.txt', (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data.toString());
        }
    })
})
let p1 = p.then(data => {
    console.log(data)
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString());
            }
        })
    })
})
let p2 = p1.then(data => {
    console.log(data)
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString());
            }
        })
    })
})
p2.then(data => console.log(data))