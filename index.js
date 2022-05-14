const puppeteer = require('puppeteer');
const fs = require('fs/promises');
(async ()=>{
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.goto("https://quotes.toscrape.com/page/6/");

    const pickSmth = await page.evaluate(()=>{
        const quotes = document.querySelectorAll('.quote .text');
        const authors = document.querySelectorAll('.quote .author');
        let list = [];
        for(let i=0; i<quotes.length; i++){
            let quote = quotes[i].innerText;
            let author = authors[i].innerText;
            list.push({quote,author})
        }      
        return list
    })
    await fs.writeFile("quotes.json",JSON.stringify(pickSmth));
    await browser.close()   
})();
