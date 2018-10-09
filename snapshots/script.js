const puppeteer = require('puppeteer');
const dataUri = require('image-data-uri');
const url = 'http://localhost:3000';
const filePath = './images';



const runPuppeter = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log("Entering page...");
    await page.goto(url);

    console.log("Generating snaps, may take a while");    

    const imageEncoded = await page.evaluate(() => {
        return Promise.all(
            monsters.map(async (monster) => {
                
                renderIt(monster, document.querySelector("#demo"));
                await ((ms = 3000) =>
                    new Promise((resolve, reject) => {
                        try {
                            setTimeout(resolve, ms)
                        } catch (error) {
                            reject(error)
                        }
                    }))()
                return document.querySelector("canvas").toDataURL('image/png');
            })
        ).then(values => (values)) 
    })
    


    //Debuggin purpuses...
    await page.screenshot({ path: './image.jpg', type: 'jpeg' });
    console.log(imageEncoded)
    // saving the snap into the specified folder
    /*dataUri.outputFile(imageEncoded[0], filePath + '/' + Date.now())
        .then(res => console.log(res));*/
    console.log("Closing connection...");
    await browser.close();
    console.log("DONE!");

    //levantar express

}

runPuppeter();