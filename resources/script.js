const myWebSearchStartingCallback = (gname, query) => {
    return query + ' music' + ' song';// Query to search only music video
    // Additionaly we can use ` query+' site:youtube.com/watch' `
};
window.myImageSearchStartingCallbackName = myWebSearchStartingCallback;

const makeTwoPartCallback = () => {
    let musicCategoryVideoes = [];

    const readyCallback = (name, q, promos, results, resultsDiv) => {
        musicCategoryVideoes = []
        for (const result of results) {
            if (result?.richSnippet?.videoobject.genre === 'Music') {
                musicCategoryVideoes.push({
                    genre: 'Music',
                    title: result?.titleNoFormatting,
                    channel: result?.richSnippet?.person.name,
                    thumbnailImage: result?.thumbnailImage?.url,
                    url: result?.richSnippet?.videoobject?.url,
                    views: result?.richSnippet?.videoobject?.interactioncount,
                    imageUrl: result?.metatags?.ogImage
                })
            }
            else {
                musicCategoryVideoes.push({ genre: 'NotMusic' })
            }

        }
    };

    const renderedCallback = (name, q, promos, results) => {
        for (let i = 0; i < results.length; i++) {
            const div = results[i];
            div.addEventListener('click', handleClick);
            const parent = div.parentNode;
            parent.classList.add('parent-container');
            const genre = musicCategoryVideoes[i]["genre"];

            if (genre === "Music") {
                div.innerHTML = '';
                div.classList.add('result-card');

                const imageDiv = document.createElement('div');
                const imageElement = document.createElement('img');
                imageElement.src = musicCategoryVideoes[i]["thumbnailImage"];
                imageElement.width = '132';
                imageElement.height = '74';
                imageDiv.classList.add('thumnail')
                imageDiv.appendChild(imageElement);
                div.appendChild(imageDiv);

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('result-card__right-container');
                const urlAndViewDiv = document.createElement('div');
                urlAndViewDiv.classList.add('result-card__innercontainer');
                const childElementArray2 = [
                    document.createElement('span'),
                    document.createElement('span')
                ];
                childElementArray2[0].textContent = 'Youtube.com';
                childElementArray2[1].textContent = formatNumber(musicCategoryVideoes[i].views) + ' views';
                for (const child of childElementArray2) {
                    urlAndViewDiv.appendChild(child)
                }
                const childElementArray1 = [
                    document.createElement('p'),
                    document.createElement('p'),
                    urlAndViewDiv
                ];
                childElementArray1[0].textContent = stringLengthShortner(musicCategoryVideoes[i].title, 40);
                childElementArray1[0].classList.add('result-card__title');
                childElementArray1[1].textContent = musicCategoryVideoes[i].channel;
                childElementArray1[1].classList.add('result-card__subtitle');
                for (const child of childElementArray1) {
                    infoDiv.appendChild(child);
                }
                div.setAttribute('data-url', musicCategoryVideoes[i].url);
                div.setAttribute('data-img', musicCategoryVideoes[i].imageUrl);
                div.appendChild(infoDiv);
            }
            else {
                parent.removeChild(div);
            }
        }
        navBar();
        searchOnGoogleBtn();
    };
    return { readyCallback, renderedCallback };
};
const {
    readyCallback: webResultsReadyCallback,
    renderedCallback: webResultsRenderedCallback,
} = makeTwoPartCallback();







window.__gcse || (window.__gcse = {});
window.__gcse.searchCallbacks = {
    web: {
        starting: myWebSearchStartingCallback,
        ready: webResultsReadyCallback,
        rendered: webResultsRenderedCallback,
    },
};

// Helper Function Section
/* Function to convert long title to title... */
function stringLengthShortner(sentance, maxLength = 20) {
    if (sentance.length > maxLength) {
        sentance = sentance.substring(0, maxLength) + '...';
    }
    return sentance;
}
/* Function to convert them to K and M ie 1K or 1M8 */
function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    }
    return number.toString();
}

// Components
function navBar() {
    navigationElement = document.getElementsByClassName('gsc-cursor');
    pageNumberComponent = document.getElementsByClassName('gsc-cursor-page');
    const pageArray = Array.from(pageNumberComponent);
    const currentPageIndex = Array.from(pageArray).findIndex(div => div.classList.contains('gsc-cursor-current-page'));

    const previousDiv = pageArray[currentPageIndex - 1];
    const currentDiv = pageArray[currentPageIndex];
    const nextDiv = pageArray[currentPageIndex + 1];

    previousDiv.classList.add('navBtn')
    nextDiv.classList.add('navBtn')
    currentDiv.classList.add('curr-navBtn')

    // Custom Navigation Bar
    if (navigationElement[0]) {
        //Left Arrow            
        const leftArrowDiv = document.createElement('div');
        const leftArrowImage = document.createElement('img');
        previousDiv.innerText = 'Prev'
        leftArrowImage.src = './resources/Images/leftArrow.svg';
        leftArrowImage.width = '16';
        leftArrowImage.height = '16';
        leftArrowDiv.classList.add('arrowcontainer');
        leftArrowDiv.appendChild(leftArrowImage);
        leftArrowDiv.appendChild(previousDiv)
        navigationElement[0].prepend(leftArrowDiv);

        // Right Arrow
        const rightArrowDiv = document.createElement('div');
        const rightArrowImg = document.createElement('img');
        nextDiv.textContent = 'Next';
        rightArrowImg.src = './resources/Images/rightArrow.svg';
        rightArrowImg.width = '16';
        rightArrowImg.height = '16';
        rightArrowDiv.classList.add('arrowcontainer');
        rightArrowDiv.appendChild(nextDiv);
        rightArrowDiv.appendChild(rightArrowImg);
        navigationElement[0].appendChild(rightArrowDiv);
    }
}
function searchOnGoogleBtn() {
    const googleSearchDiv = document.getElementsByClassName('gcsc-find-more-on-google-query');
    if (googleSearchDiv) {
        const currentText = googleSearchDiv[0].innerText;
        const substringToRemove = 'music song';
        const newText = currentText.replace(substringToRemove, '');
        googleSearchDiv[0].innerText = newText;
    }
}

//Event Handlers
const handleClick = (event) => {
    // Access event properties and perform actions
    console.log(event);
    console.log('Event target:', event.target);

    // ...other event-related operations
};
