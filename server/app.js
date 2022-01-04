const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

let url = 'https://www.economist.com/';

const scrapeData = async () => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const articleScrapeList = $('.eprz4kh0');

        const articleList = [];
        
        articleScrapeList.each((i, el) => {

            const article = {
                title: {
                    href: '',
                    text: ''
                },
                img: {
                    src: '',
                    alt: ''
                },
                description: ''
            };

            article.title.href = $(el).find('h3').find('a').attr('href') ?? '';
            article.title.text = $(el).find('h3').find('a').text() ?? '';
            article.img.src = $(el).find('div').find('img').attr('src') ?? '';
            article.img.alt = $(el).find('div').find('img').attr('alt') ?? '';
            article.description = $(el).find('.e1smrlcj0').text() ?? '';

            if (Object.values(article).every((v) => v !== '')) articleList.push(article);

        });
        
        fs.writeFile('./db/articles.json', JSON.stringify(articleList, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('File has been created');
        });
        
    }
    catch (err) {
        console.error(err);
    }
}

scrapeData();