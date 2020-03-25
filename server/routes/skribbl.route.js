const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const fs = require('fs');


const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/').post(asyncHandler(insert));
router.post('/add-word', asyncHandler(addWord));
router.get('/get-word', asyncHandler(getWord));


async function insert(req, res) {
    console.log(req);
    console.log(res);
//   let user = await userCtrl.insert(req.body);
//   res.json(user);
}

async function addWord(req, res) {
    console.log(req.body);
    // console.log(req.body.toObject());
    // const items = req.body.wordList
    // const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    // const header = Object.keys(items[0])
    // let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    // // csv.unshift(header.join(','))
    // csv = csv.join('\r\n')

    // console.log(csv)
    fs.appendFile('assets/word-list.txt', ',' + req.body.word, (err) => {
        if (err) throw err;
            console.log('New word added!');
    });
    res.json('success');
//   let user = await userCtrl.insert(req.body);
//   res.json(user);
}

async function getWord(req, res) {

// add a line to a lyric file, using appendFile

    var content;
    var content = fs.readFileSync('assets/word-list.txt', 'utf-8');
    console.log('attempting to read file');
    console.log(content);
    let toto = {'tutu': 2};
    res.json(content);
}
