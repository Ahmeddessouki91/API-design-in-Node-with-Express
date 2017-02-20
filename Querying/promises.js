const fs = require('fs');

const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./Exercise 9/package.json', (err, file) => {
            return err ? reject(err) : resolve(file.toString());
        });
    });
};

const readAllFiles = () => {
    const promises = [readFile(), readFile(), readFile()];
    return Promise.all(promises);
};

readAllFiles()
    .then((files) => {
        // files.map(file => console.log(file.toString()));
        console.log(...files);
    });


// const logFile = () => {
//     return readFile()
//         .then(() => {
//             readFile();
//         });
// };
//
// readFile()
//     .then(logFile)
//     .catch((err) => {
//         console.log(err.message);
//     });

// readFile()
//     .then((file) => {
//         console.log(file);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

// Using callbacks
// let action = function (callback) {
//     setTimeout(function () {
//         callback('hello');
//     }, 5000);
// };
//
// action(function (arg) {
//     console.log(arg);
// });

// Using promises
// let action = function () {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             // resolve('hello');
//             reject(new Error('Oh, noooooo!!!'));
//         }, 1000);
//     });
// };
//
// // Now.
// let promise = action()
//     .then(function (word) {
//         console.log(word);
//     })
//     .catch(function (err) {
//         console.log(`ERROR: ${err.message}`);
//     });