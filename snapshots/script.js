const puppeteer = require('puppeteer');
const dataUri = require('image-data-uri');
const url = 'http://localhost';
const filePath = './snapshots/images';
const monsters = [2, 39, 8, 10, 13, 15, 21, 25, 28, 38, 43, 49,45,99,55,57,60,67,71,72,79,83,84,86,90,93,97,108];

const takeSnaps = async (port) => {
    const browser = await puppeteer.launch({ devtools: false });
    const page = await browser.newPage();

    console.log("Entering page...");
    await page.goto(`${url}:${port}`);

    console.log("Generating snaps, may take a while");

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
        dataUri.outputFile(imageEncoded, filePath + '/' + monsters[index] + '_' + Date.now())
            .then(res => console.log(res));
    }
    console.log("Closing connection...");
    await browser.close();
    console.log("DONE!");

}

module.exports = takeSnaps;