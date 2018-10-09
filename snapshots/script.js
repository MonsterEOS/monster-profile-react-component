const puppeteer = require('puppeteer');
const url = 'http://localhost/dist/index.html';

const runPuppeter = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('canvas');

    setTimeout(async () => {
        const tag = await page.$eval('canvas', elem => {
            return elem.toDataURL('image/png');
        });
        console.log(tag);
        browser.close();
    }, 2000);


    //guardar png
    //levantar express
    //dropdown
    
}

runPuppeter();