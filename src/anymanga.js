function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("keywords", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("content=\"", firstSymbol);
        if (start > 0) {
            var end = content.indexOf(",", start);
            if (end > 0) {
                var name = content.substr(start + 9, end - start - 9);
                if (name) {
                    return name;
                }
            }
        }
    }
    return "Unknown";
}

function GetAuthor() {
    return "Unknown";
}

function GetArtist() {
    return "Unknown";
}

function GetDemographic() {
    return "Unknown";
}

function GetGenre() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Categories:", 0);
    var start = content.indexOf("<strong>", firstSymbol);
    if (start > 0) {
        var end = content.indexOf("</strong>", start + 2);
        if (end > 0) {
            var genre = content.substr(start + 8, end - start - 8);
            if (genre) {
                return genre;
            }
        }
    }
    return "Unknown";
}

function GetStatus() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Status:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<strong>", firstSymbol);
        var end = content.indexOf("</strong>", start);
        if ((start > 0) && (end > 0)) {
            var status = content.substr(start + 8, end - start - 8);
            if (status) {
                return status;
            }
        }
    }
    return "Unknown";
}

function GetRank() {
    return "Unknown";
}

function GetDescription() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Series Brief Review", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<div", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</div>", start);
            if (end > 0) {
                var des = content.substr(start, end - start + 6);
                if (des) {
                    return des;
                }
            }
        }
    }
    return "Unknown";
}

function GetImageCover() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("colspan=", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("img src=\"", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("\"", start + 10);
            if (end > 0) {
                var imageCover = content.substr(start + 9, end - start - 9);
                if (imageCover) {
                    imageCover = "http://anymanga.com" + imageCover;
                    return imageCover;
                }
            }
        }
    }
    return "Unknown";
}

function GetChaptersPage() {
    return 1;
}

function GetChaptersUrl() {
    var chapterUrls = "";
    var chapterName = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("colspan=", 0);
    if (firstSymbol > 0) {
        var start1 = content.indexOf("<li><span", firstSymbol);
        while (start1 > 0) {
            var start = content.indexOf("href=\"", start1);
            var end = content.indexOf("</a>", start + 1);
            if (start > 0 && end > 0) {
                var url = content.substr(start + 6, end - start - 6);
                if (url) {
                    url = url.replace("\" target=\"_self\">", "dungda");
                    url = url.replace("\">", "dungda");
                    url = "http://anymanga.com" + url;
                    chapterUrls = chapterUrls + url + "chapternamelink";
                    start1 = content.indexOf("<li><span", end);
                }
            }
        }
    }
    if (chapterUrls.length > 0) {
        chapterUrls = chapterUrls.substr(0, chapterUrls.length - 15);
        return chapterUrls;
    }
    return "Unknown";
}