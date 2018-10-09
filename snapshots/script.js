const puppeteer = require('puppeteer');
const dataUri = require('image-data-uri');
const url = 'http://localhost/dist/index.html';
const filePath = './images';

const runPuppeter = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('canvas');

    setTimeout(async () => {
        const imageEncoded = await page.$eval('canvas', elem => {
            return elem.toDataURL('image/png');
        });
        //console.log(tag);
        dataUri.outputFile(imageEncoded, filePath+ '/' +Date.now())
            .then(res => console.log(res));
        browser.close();
    }, 2000);


    //guardar png
    //levantar express
    //dropdown
    
}

runPuppeter();