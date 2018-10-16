const puppeteer = require('puppeteer');
const dataUri = require('image-data-uri');
const url = 'http://localhost';
const filePath = './snapshots/images';
const monsters = [];

for (let index = 1; index <= 107; index++) {
    monsters.push(index)    
}

const takeSnaps = async (port) => {
    const browser = await puppeteer.launch({ devtools: false });
    const page = await browser.newPage();

    console.log("Entering page...");
    await page.goto(`${url}:${port}`);

    console.log("Generating snaps, may take a while");
    console.log(monsters.length)

    for (index in monsters) {
        const imageEncoded = await page.evaluate(async (monster) => {

            renderIt(monster, document.querySelector("#demo"));
            await ((ms = 1500) =>
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
        const name = parseInt(index)+1;
        dataUri.outputFile(imageEncoded, filePath + '/' + name)
            .then(res => console.log(res));
    }
    console.log("Closing connection...");
    await browser.close();
    console.log("DONE!");

}

module.exports = takeSnaps;