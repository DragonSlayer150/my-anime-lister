
const fs = require('node:fs');

fetchTest();
async function fetchTest() {

const response = await fetch('https://myanimelist.net/rss.php?type=rwe&u=DragonSlayer150');
const body = await response.text();

fs.writeFile('./rss.txt', body, err => {
    if(err) {
        console.error(err);
    } else {
        console.log('file written');
    }
});
};