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
        var start = content.indexOf("</b>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<br", start);
            if (end > 0) {
                var author = content.substr(start + 4, end - start - 4);
                if (author) {
                    return author;
                }
            }
        }
    }
    return "Unknown";
}

function GetArtist() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Artist:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("</b>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<br", start);
            if (end > 0) {
                var artist = content.substr(start + 4, end - start - 4);
                if (artist) {
                    return artist;
                }
            }
        }
    }
    return "Unknown";
}

function GetDemographic() {
    return "Unknown";
}

function GetGenre() {
    var genres = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Categories:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("/category/", firstSymbol);
        while (start > 0) {
            var end = content.indexOf("/", start + 10);
            if (end > 0) {
                var genre = content.substr(start + 10, end - start - 10);
                if (genre) {
                    genres += genre + ", ";
                    start = content.indexOf("/category/", end);
                }
            }
        }
        genres = genres.substr(0, genres.length - 2);
    }
    if (genres.length > 0) {
        return genres;
    }
    return "Unknown";
}

function GetStatus() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Chapters:", 0);
    if (firstSymbol > 0) {
        var start1 = content.indexOf("</b>", firstSymbol);
        if (start1 > 0) {
            var start = content.indexOf("-", start1 + 4);
            var end = content.indexOf("<br", start);
            if ((start > 0) && (end > 0)) {
                var status = content.substr(start + 1, end - start - 1);
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
    var firstSymbol = content.indexOf("series_description", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</h6>", start);
            if (end > 0) {
                var des = content.substr(start + 2, end - start - 2);
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
    var firstSymbol = content.indexOf("series_stats", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("img src=\"", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("\"", start + 10);
            if (end > 0) {
                var imageCover = content.substr(start + 9, end - start - 9);
                if (imageCover) {
                    imageCover = "http://mangable.com" + imageCover;
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
    var firstSymbol = content.indexOf("newlist", 0);
    var endSymbol = content.indexOf("</ul>", firstSymbol);
    if ((firstSymbol > 0) && (endSymbol > 0)) {
        content = content.substr(firstSymbol, endSymbol - firstSymbol);
    }
    var start = content.indexOf("<a href=\"", 0);
    while (start > 0) {
        var end = content.indexOf("\"", start + 9);
        if (end > 0) {
            var url = content.substr(start + 9, end - start - 9);
            if (url) {
                var nameStart = content.indexOf("<b>", end);
                var nameEnd = content.indexOf("</b>", end);
                var name = content.substr(nameStart + 4, nameEnd - nameStart - 4);
                name = name.replace("<img src=\"/imgs/new_icon.gif\">", "");
                chapterUrls = chapterUrls + url + "dungda" + name + "chapternamelink";
                start = content.indexOf("<a href=\"", end);
            }
        }
    }
    if (chapterUrls.length > 0) {
        chapterUrls = chapterUrls.substr(0, chapterUrls.length - 15);
        return chapterUrls;
    }
    return "Unknown";
}

function GetChapterName(firstStart) {
    var chapterName;
    var content = document.documentElement.innerHTML;
    if (firstStart > 0) {
        var firstSymbol = content.indexOf("<b>", firstStart);
        if (firstSymbol > 0) {
            var endSymbol = content.indexOf("</b>", firstSymbol + 1);
            if (endSymbol > 0) {
                chapterName = content.substr(firstSymbol + 4, endSymbol - firstSymbol - 4);
            }
        }
    }
    if (chapterName.length <= 0) {
        return "Unknown";
    }
    return chapterName;
}