
const fs = require('node:fs');

fetchTest();
async function fetchTest() {

const response = await fetch('https://myanimelist.net/rss.php?type=rwe&u=DragonSlayer150');
const body = await response.text();
const feedArray = body.replaceAll(/(<\/item>|<\/channel><\/rss>)/g, " ").split("<item>");

for (let i = 1; i < feedArray.length; i++) {
    try {
        fs.appendFileSync('./rss.txt', feedArray[i]);
    } catch (err) {
        console.error(err);
    }
}
console.log("Wrote File");

};
