const myWebSearchStartingCallback = (gname, query) => {
    return query + ' music';// Query to search only music video
    // Additionaly we can use ` query+' site:youtube.com/watch' `
};
window.myImageSearchStartingCallbackName = myWebSearchStartingCallback;

const makeTwoPartCallback = () => {
    let musicCategoryVideoes = [];
    const readyCallback = (name, q, promos, results, resultsDiv) => {
        for (const result of results) {
            if (result?.richSnippet?.videoobject.genre === 'Music') {
                musicCategoryVideoes.push({
                    title: result.titleNoFormatting,
                    channel: result.person.name,
                    thumnailImage: result.thumbnailImage.url,
                    url: result.videoobject.url,
                    views: result.videoobject.interactioncount
                })
            }
        }
        console.log(musicCategoryVideoes)
        results = musicCategoryVideoes;
        console.log(results)

    };
    const renderedCallback = (name, q, promos, results) => {
        console.log(results)

        for (let i = 0; i < musicCategoryVideoes.length; i++) {
            const div = results[i];
            // console.log(div)
            const viewCount = musicCategoryVideoes[i].richSnippet.videoobject.interactioncount;
            if (viewCount) {
                const innerDiv = document.createElement('div');
                innerDiv.innerHTML = '<b>Views: ' + formatNumber(viewCount) + '</b>';
                div.insertAdjacentElement('afterbegin', innerDiv);
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
