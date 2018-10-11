const puppeteer = require('puppeteer');
const dataUri = require('image-data-uri');
const url = 'http://localhost';
const filePath = './snapshots/images';
const monsters = ["Baal", "BadChicken", "Bat", "Bear", "Beetle", "Butterfly", "Cactus", "Cerberus", "Devil", "Duck", "Dwarf", "Egg", "Frog",
    "Ghost", "MetalGuitar", "Minion", "Ness", "Ogre", "Penguin", "RockWorm", "Rocky", "Scorpion", "Serpent", "Spider", "TheThing", "Toad",
    "Tree", "Troll", "Tucan", "Vampire", "Wolf", "Worm"];


const takeSnaps = async (port) => {
    const browser = await puppeteer.launch({ devtools: false });
    const page = await browser.newPage();

    console.log("Entering page...");
    await page.goto(`${url}:${port}`);

    console.log("Generating snaps, may take a while");

    for (index in monsters) {
        const imageEncoded = await page.evaluate(async (monster) => {

            renderIt(monster, document.querySelector("#demo"));
            await ((ms = 2000) =>
                new Promise((resolve, reject) => {
                    try {
                        setTimeout(resolve, ms)
                    } catch (error) {
                        reject(error)
                    }
                }))()

            return document.querySelector("canvas").toDataURL('image/png')

        }, monsters[index])
        console.log(`Generating: ${monsters[index]} ...`)
        dataUri.outputFile(imageEncoded, filePath + '/' + monsters[index] + '_' + Date.now())
            .then(res => console.log(res));
    }
    console.log("Closing connection...");
    await browser.close();
    console.log("DONE!");

}

module.exports = takeSnaps;