function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("\"content\"", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("itemprop=\"name\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</td>", start);
            if (end > 0) {
                var name = content.substr(start + 16, end - start - 16);
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
    var firstSymbol = content.indexOf("Author(s)", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start);
            if (end > 0) {
                var author = content.substr(start + 2, end - start - 2);
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
    var firstSymbol = content.indexOf("Genre(s)", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start);
            if (end > 0) {
                var genre = content.substr(start + 2, end - start - 2);
                if (genre) {
                    return genre;
                }
            }
        }
    }
    return "Unknown";
}

function GetStatus() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Status", 0);
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
        var start = content.indexOf("<span", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</span>", start + 2);
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
    var firstSymbol = content.indexOf("divThickBorder", 0);
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
        var endSymbol = content.indexOf("</div>", firstSymbol);
        if (endSymbol > 0) {
            content = content.substr(firstSymbol, endSymbol - firstSymbol);
            firstSymbol = 0;
        }
    }
    var start = content.indexOf("href=\"", firstSymbol);
    while (start > 0) {
        var end = content.indexOf("</a>", start + 6);
        if (end > 0) {
            var url = content.substr(start + 6, end - start - 6);
            if (url) {
                url = url.replace("\" target=\"_self\"><strong>", "dungda");
                url = url.replace("\"><strong>", "dungda");
                url = url.replace("</strong>", "");
                url = url.replace("dungdadungda", "dungda");
                chapterUrls = chapterUrls + url + "chapternamelink";
                start = content.indexOf("href=\"", end);
            }
        }
    }
    if (chapterUrls.length > 0) {
        chapterUrls = chapterUrls.substr(0, chapterUrls.length - 15);
        return chapterUrls;
    }
    return "Unknown";
}