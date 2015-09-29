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
    var genres = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Genres:", 0);
    var endSymbol = content.indexOf("</p>", firstSymbol);
    if ((firstSymbol > 0) && (endSymbol > 0)) content = content.substr(firstSymbol + 7, endSymbol - firstSymbol - 7);
    if (content) {
        var start1 = content.indexOf("href=", 0);
        while (start1 > 0) {
            var start = content.indexOf("\">", start1);
            var end = content.indexOf("</a>", start + 2);
            if (end > 0) {
                var genre = content.substr(start + 2, end - start - 2);
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
    return "Unknown";
}

function GetRank() {
    return "Unknown";
}

function GetDescription() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Created by:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<p>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</p>", start);
            if (end > 0) {
                var des = content.substr(start + 3, end - start - 3);
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
    var firstSymbol = content.indexOf("width=\"186\"", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("img src=\"", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("\"", start + 10);
            if (end > 0) {
                var imageCover = content.substr(start + 9, end - start - 9);
                if (imageCover) {
                    return imageCover;
                }
            }
        }
    }
    return "Unknown";
}

function GetChaptersPage() {
    var numOfPage = 0;
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf(">Prev<", 0);
    if (firstSymbol > 0) {
        var endSymbol = content.indexOf(">Next<", firstSymbol);
        if (endSymbol > 0) {
            var tmpString = content.substr(firstSymbol + 1, endSymbol - firstSymbol - 1);
            var start = tmpString.indexOf("href=", 0);
            while (start > 0) {
                numOfPage++;
                var startTmp = start;
                start = tmpString.indexOf("href=", startTmp + 5);
            }
        }
    }
    if (numOfPage > 0) {
        return numOfPage;
    }
    return 1;
}

function GetUrlToLoadChapters() {
    var chapterUrls = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Uploaded By", 0);
    var endSymbol = content.indexOf("<tfoot>", firstSymbol);
    if (firstSymbol > 0 && endSymbol > 0) content = content.substr(firstSymbol + 1, endSymbol - firstSymbol - 1);
    var start1 = content.indexOf("<tr", 0);
    if (start1 > 0) {
        var start = content.indexOf("href=\"", start1);
        var end = content.indexOf("\"", start + 6);
        if (start > 0 && end > 0) {
            var url = content.substr(start + 6, end - start - 6);
            if (url) {
                url = "http://www.mangavolume.com" + url;
                return url;
            }
        }
    }
    return "Unknown";
}

function GetChaptersUrl() {
    var chapterUrls = "";
    var chapterName = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("id=\"chapters\"", 0);
    var endSymbol = content.indexOf("</select>", firstSymbol);
    if (firstSymbol > 0 && endSymbol > 0) content = content.substr(firstSymbol, endSymbol - firstSymbol);
    var start = content.indexOf("option value=\"", 0);
    while (start > 0) {
        var end = content.indexOf("</option>", start + 14);
        if (start > 0 && end > 0) {
            var url = content.substr(start + 14, end - start - 14);
            if (url) {
                url = url.replace("\" selected=\"selected\">", "dungda");
                url = url.replace("\" target=\"_self\">", "dungda");
                url = url.replace("\">", "dungda");
                url = "http://www.mangavolume.com" + url;
                chapterUrls = chapterUrls + url + "chapternamelink";
                start = content.indexOf("option value=\"", end);
            }
        }
    }
    if (chapterUrls.length > 0) {
        chapterUrls = chapterUrls.substr(0, chapterUrls.length - 15);
        return chapterUrls;
    }
    return "Unknown";
}