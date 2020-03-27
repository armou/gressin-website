const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const https = require('https');


const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/').post(asyncHandler(insert));
router.post('/add-word', asyncHandler(addWord));
router.post('/delete-word', asyncHandler(deleteWord));
router.get('/get-word', asyncHandler(getWord));
router.get('/get-gif', asyncHandler(getGif));


async function insert(req, res) {
    console.log(req);
    console.log(res);
}

async function addWord(req, res) {
    console.log(req.body);
    console.log('checking duplicates');
    if (checkDuplicate(req.body.word.toLowerCase()) == true) {
        fs.appendFile('assets/word-list.txt', ',' + req.body.word.toLowerCase(), (err) => {
            if (err) throw err;
                console.log('New word added!');
        });
        res.json('success');
    } else {
        res.status(400).send({message: 'word already in list'});
    }
}

async function getWord(req, res) {
    var content = fs.readFileSync('assets/word-list.txt', 'utf-8');
    console.log('attempting to read file');
    console.log(content);
    res.json(content);
}

async function getGif(req, res) {
    var ret;
    getGifUrl(function(ret) {
        res.json(ret)
    });
}

function getGifUrl(callback) {
    api_key = process.env['GIPHY_API_KEY'];
    const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		apiKey: api_key,
		tag: "fail",
		type: "random",
		rating: "r"
    };
    let giphyURL = encodeURI(
		giphy.baseURL +
			giphy.type +
			"?api_key=" +
			giphy.apiKey +
			"&tag=" +
			giphy.tag +
			"&rating=" +
			giphy.rating
    );
    console.log(giphyURL);
    var ret;
    var makerequest = https.get(giphyURL, (res) => {
        console.log('https get request');
        var final = '';
        res.on('data',(data) => {
            final += data;
        });

        res.on('end', () => {
            final = JSON.parse(final);
            ret = final.data.image_url
            callback(ret);
        });

    })
}

async function deleteWord(req, res) {
    var input = req.body.word.toLowerCase();
    var content = fs.readFileSync('assets/word-list.txt', 'utf-8');
    console.log(content.split(',').reverse().indexOf(input));
    if (content.split(',').reverse().indexOf(input) >= 0) {
        if (content.split(',').reverse().indexOf(input) === 0) {
            input += ',';
        }
        var newValue = content.replace(new RegExp(input + ','), '');
        fs.writeFileSync('assets/word-list.txt', newValue, 'utf-8');
        console.log('DEELEEEEEEETE');
        res.json('success');
    }  else {
        res.status(400).send({message: 'word not in list'});        
    }
}

function checkDuplicate(word) {
    var content = fs.readFileSync('assets/word-list.txt', 'utf-8') + ',' + word;
    console.log(content);
    var duplicates = content.split(',');
    uniq = [...new Set(duplicates)];
    return uniq.length == duplicates.length;
}
