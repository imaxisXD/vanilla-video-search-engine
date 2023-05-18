const myWebSearchStartingCallback = (gname, query) => {
    return query + ' music' + ' song';// Query to search only music video
    // Additionaly we can use ` query+' site:youtube.com/watch' `
};
window.myImageSearchStartingCallbackName = myWebSearchStartingCallback;

const makeTwoPartCallback = () => {
    let musicCategoryVideoes = [];

    const readyCallback = (name, q, promos, results, resultsDiv) => {
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
        console.log(resultsDiv)

    };

    const renderedCallback = (name, q, promos, results) => {
        console.log(results)
        for (let i = 0; i < results.length; i++) {
            const div = results[i];
            const parent = div.parentNode;
            parent.classList.add('parent-container');

            const genre = musicCategoryVideoes[i]["genre"];
            if (genre === "Music") {
                div.classList.add('result-container')
                const innerDiv = document.createElement('div');
                innerDiv.innerHTML = '<b>Views: ' + formatNumber(genre) + '</b>';
                div.insertAdjacentElement('afterbegin', innerDiv);
            }
            else {
                console.log(parent);
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




function formatNumber(number) { // To convert them to K and M ie 1K or 1M
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    }
    return number.toString();
}


window.__gcse || (window.__gcse = {});
window.__gcse.searchCallbacks = {
    web: {
        starting: myWebSearchStartingCallback,
        ready: webResultsReadyCallback,
        rendered: webResultsRenderedCallback,
    },
};
