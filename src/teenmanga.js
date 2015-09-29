function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("head", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<title>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</title>", start);
            if (end > 0) {
                var name = content.substr(start + 7, end - start - 7);
                if (name) {
                    return name;
                }
            }
        }
    }
    return "Unknown";
}

function GetAuthor() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Author:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf(">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start);
            if (end > 0) {
                var author = content.substr(start + 1, end - start - 1);
                if (author) {
                    return author;
                }
            }
        }
    }
    return "Unknown";
}

function GetArtist() {
    return "Unknown";
}

function GetDemographic() {
    return "Unknown";
}

function GetGenre() {
    var genres = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Categories:", 0);
    var endSymbol = content.indexOf("</td>", firstSymbol);
    if ((firstSymbol > 0) && (endSymbol > 0)) content = content.substr(firstSymbol, endSymbol - firstSymbol);
    if (content) {
        var start1 = content.indexOf("href=", 0);
        while (start1 > 0) {
            var start = content.indexOf("arrow1.gif\">", start1);
            var end = content.indexOf("</a>", start + 2);
            if (end > 0) {
                var genre = content.substr(start + 12, end - start - 12);
                if (genre) {
                    genres += genre + ", ";
                    firstSymbol = end;
                    start1 = content.indexOf("href=", end);
                }
            }
        }
        if (genres.length >= 2) {
            genres = genres.substr(0, genres.length - 2);
        }
        if (genres.length > 0) {
            return genres;
        }
    }
    return "Unknown";
}

function GetStatus() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Status:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start + 2);
            if (end > 0) {
                var status = content.substr(start + 2, end - start - 2);
                if (status) {
                    return status;
                }
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
    var firstSymbol = content.indexOf("Summary", 0);
    if (firstSymbol > 0) {
        var start1 = content.indexOf("br", firstSymbol);
        if (start1 <= 0) start1 = firstSymbol;
        var start = content.indexOf(">", start1 + 2);
        var end = content.indexOf("<div", start);
        if (end > 0) {
            var des = content.substr(start + 1, end - start - 1);
            if (des) {
                return des;
            }
        }
    }
    return "Unknown";
}

function GetImageCover() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("cmtList", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("src=\"", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("\"", start + 6);
            if (end > 0) {
                var imageCover = content.substr(start + 5, end - start - 5);
                if (imageCover) {
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
    var firstSymbol = content.indexOf("Chapter Name", 0);
    if (firstSymbol > 0) {
        var endSymbol = content.indexOf("</table>", firstSymbol);
        if (endSymbol > 0) {
            content = content.substr(firstSymbol, endSymbol - firstSymbol);
        }
    }
    var start = content.indexOf("<tr", 0);
    while (start > 0) {
        var startUrl = content.indexOf("href=\"", start);
        var end = content.indexOf("</a>", startUrl + 6);
        if (end > 0) {
            var url = content.substr(startUrl + 6, end - startUrl - 6);
            if (url) {
                url = url.replace("\" target=\"_self", "dungda");
                url = url.replace("\">", "dungda");
                url = url.replace("dungdadungda", "dungda");
                url = "http://www.tenmanga.com" + url;
                chapterUrls = chapterUrls + url + "chapternamelink";
                start = content.indexOf("<tr", end);
            }
        }
    }
    if (chapterUrls.length > 0) {
        chapterUrls = chapterUrls.substr(0, chapterUrls.length - 15);
        return chapterUrls;
    }
    return "Unknown";
}