function buildQueryURL() {
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    const queryParams = {
        "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"
    };
    queryParams.q = $("#search-term")
        .val()
        .trim();
    let startYear = $("#start-year")
        .val()
        .trim();

    if (parseInt(startYear)) {
        queryParams.begin_date = startYear + "0101";
    }

    let endYear = $("#end-year")
        .val()
        .trim();

    if (parseInt(endYear)) {
        queryParams.end_date = endYear + "0101";
    }

    parseInt(endYear) !== "" ? queryParams.end_date = endYear + "0101" : null;

    return queryURL + $.param(queryParams);
}

function updatePage(NYTData) {
    const numArticles = $("#article-count").val();
    for (const a of numArticles) {
        const article = NYTData.response.a;
        console.log(artcile)
        const articleCount = a + 1;
        console.log(articleCount)
        const $articleList = $("<ul>");
        $articleList.addClass("list-group");
        $("#article-section").append($articleList);
        const headline = article.headline;
        const $articleListItem = $("<li class='list-group-item articleHeadline'>");
        if (headline && headline.main) {
            console.log(headline.main);
            $articleListItem.append(
                "<span class='label label-primary'>" +
                articleCount +
                "</span>" +
                "<strong> " +
                headline.main +
                "</strong>"
            );
        }
        const byline = article.byline;

        if (byline && byline.original) {
            console.log(byline.original);
            $articleListItem.append("<h5>" + byline.original + "</h5>");
        }
        var section = article.section_name;
        console.log(article.section_name);
        if (section) {
            $articleListItem.append("<h5>Section: " + section + "</h5>");
        }
        var pubDate = article.pub_date;
        console.log(article.pub_date);
        if (pubDate) {
            $articleListItem.append("<h5>" + article.pub_date + "</h5>");
        }
        $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
        console.log(article.web_url);
        $articleList.append($articleListItem);
    }
}

function clear() {
    $("#article-section").empty();
}

$("#run-search").on("click", function (event) {
    event.preventDefault();

    clear();

    var queryURL = buildQueryURL();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);
});
$("#clear-all").on("click", clear);