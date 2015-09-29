function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol1 = content.indexOf("leftContent", 0);
    var firstSymbol = content.indexOf("name", firstSymbol1);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</span>", start);
            if (end > 0) {
                var name = content.substr(start + 2, end - start - 2);
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
    var firstSymbol = content.indexOf("Автор:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</a>", start);
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
    var genres = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Жанры:", 0);
    var endSymbol = content.indexOf("</p>", firstSymbol);
    if ((firstSymbol > 0) && (endSymbol > 0)) content = content.substr(firstSymbol, endSymbol - firstSymbol);
    if (content) {
        var start1 = content.indexOf("/list/genre/", 0);
        while (start1 > 0) {
            var start = content.indexOf("\">", start1);
            var end = content.indexOf("</a>", start + 2);
            if (end > 0) {
                var genre = content.substr(start + 2, end - start - 2);
                if (genre) {
                    genres += genre + ", ";
                    firstSymbol = end;
                    start1 = content.indexOf("/list/genre/", end);
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
    var firstSymbol = content.indexOf("Перевод:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("</b>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</p>", start + 4);
            if (end > 0) {
                var status = content.substr(start + 4, end - start - 4);
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
    var firstSymbol = content.indexOf("mangaDescription", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<p", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<div", start);
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
    var firstSymbol = content.indexOf("theme-default", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("a href=\"", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("\"", start + 9);
            if (end > 0) {
                var imageCover = content.substr(start + 8, end - start - 8);
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
    var firstSymbol = content.indexOf("chapters-link", 0);
    if (firstSymbol > 0) {
        var endSymbol = content.indexOf("</table>", firstSymbol);
        if (endSymbol > 0) {
            content = content.substr(firstSymbol, endSymbol - firstSymbol);
        }
        var start = content.indexOf("href=\"", 0);
        while (start > 0) {
            var end = content.indexOf("\"", start + 6);
            if (end > 0) {
                var url = content.substr(start + 6, end - start - 6);
                if (url) {
                    url = "http://readmanga.me" + url;
                    var nameStart = content.indexOf(">", end);
                    var name = "";
                    if (nameStart) {
                        var nameEnd = content.indexOf("<", nameStart + 1);
                        name = content.substr(nameStart + 1, nameEnd - nameStart - 1);
                    }
                    chapterUrls = chapterUrls + url + "dungda" + name + "chapternamelink";
                    start = content.indexOf("href=\"", end);
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