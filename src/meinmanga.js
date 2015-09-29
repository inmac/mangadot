function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("mangainfo", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("height=\"80\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start);
            if (end > 0) {
                var name = content.substr(start + 12, end - start - 12);
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
    var firstSymbol = content.indexOf("Autor", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\"top\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start);
            if (end > 0) {
                var author = content.substr(start + 6, end - start - 6);
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
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Genre", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\"top\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start);
            if (end > 0) {
                var genre = content.substr(start + 6, end - start - 6);
                if (genre) {
                    return genre;
                }
            }
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
    var firstSymbol = content.indexOf("mangaintro", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<p", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</div>", start);
            if (end > 0) {
                var des = content.substr(start, end - start);
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
    var firstSymbol = content.indexOf("mangainfo", 0);
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
    return 2;
}

function GetUrlToLoadChapters() {
    var chapterUrls = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Kapitelname", 0);
    var start = content.indexOf("<a href=\"", firstSymbol);
    if (start > 0) {
        var end = content.indexOf("\"", start + 10);
        if (start > 0 && end > 0) {
            var url = content.substr(start + 9, end - start - 9);
            if (url) {
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
    var firstSymbol = content.indexOf("onchange", 0);
    var endSymbol = content.indexOf("</select>", firstSymbol);
    if (firstSymbol > 0 && endSymbol > 0) content = content.substr(firstSymbol, endSymbol - firstSymbol);
    var start = content.indexOf("<option value=\"", 0);
    while (start > 0) {
        var end = content.indexOf("</option>", start + 15);
        if (start > 0 && end > 0) {
            var url = content.substr(start + 15, end - start - 15);
            if (url) {
                url = url.replace("\" selected=\"\">", "dungda");
                url = url.replace("\">", "dungda");
                url = url.replace("dungdadungda", "dungda");
                chapterUrls = chapterUrls + url + "chapternamelink";
                start = content.indexOf("<option value=\"", end);
            }
        }
    }
    if (chapterUrls.length > 0) {
        chapterUrls = chapterUrls.substr(0, chapterUrls.length - 15);
        return chapterUrls;
    }
    return "Unknown";
}