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
                    views: result?.richSnippet?.videoobject?.interactioncount
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

                div.appendChild(infoDiv);
            }
            else {
                parent.removeChild(div);
            }
        }

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
function stringLengthShortner(sentance, maxLength = 20) { // To convert long title to title...
    if (sentance.length > maxLength) {
        sentance = sentance.substring(0, maxLength) + '...';
    }
    return sentance;
}

function formatNumber(number) { // To convert them to K and M ie 1K or 1M
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    }
    return number.toString();
}