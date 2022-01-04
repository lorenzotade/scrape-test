const cardContainer = document.querySelector('.card-container');
const innverNav = document.querySelector('.inner-nav');
const header = document.querySelector('header');
const menu = document.querySelector('.menu');

menu.addEventListener('mouseover', () => {
    innverNav.classList.add('active');
    header.classList.add('active');
});
innverNav.addEventListener('mouseleave', () => {
    innverNav.classList.remove('active');
    header.classList.remove('active');
});

const retrieveData = async () => {
    const resp = await fetch('../db/articles.json');
    const data = await resp.json();
    return data;
}

let articles = [];

retrieveData().then((data) => {

    articles = data;
    
    articles.forEach(article => {

        cardContainer.innerHTML +=`
            <div class="card">
                <h3 id="title">
                    <a href="https://www.economist.com/${article.title.href}">${article.title.text}</a>
                </h3>
                <div class="image-container">
                    <img src="${article.img.src}" alt="${article.img.alt}">
                </div>
                <p>${article.description}</p>
            </div>
        `;

    });

});
