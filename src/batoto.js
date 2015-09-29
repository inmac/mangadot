function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("ipsType_pagetitle", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf(">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</h1>", start);
            if (end > 0) {
                var name = content.substr(start + 1, end - start - 1);
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
        var start = content.indexOf("artist_name=", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("\"", start);
            if (end > 0) {
                var author = content.substr(start + 12, end - start - 12);
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
    var firstSymbol = content.indexOf("Genres:", 0);
    var endSymbol = content.indexOf("</tr>", firstSymbol);
    if ((firstSymbol > 0) && (endSymbol > 0)) content = content.substr(firstSymbol + 7, endSymbol - firstSymbol - 7);
    var start1 = content.indexOf("alt=", 0);
    while (start1 > 0) {
        var start = content.indexOf("\"", start1);
        var end = content.indexOf("\"", start + 1);
        if (end > 0) {
            var genre = content.substr(start + 1, end - start - 1);
            if (genre) {
                genres += genre + ", ";
                start1 = content.indexOf("alt=", end);
            }
        }
    }
    if (genres.length >= 2) {
        genres = genres.substr(0, genres.length - 2);
    }
    if (genres.length > 0) {
        return genres;
    }
    return "Unknown";
}

function GetStatus() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Status:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<td>", firstSymbol);
        var end = content.indexOf("</td>", start);
        if ((start > 0) && (end > 0)) {
            var status = content.substr(start + 4, end - start - 4);
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
    var firstSymbol = content.indexOf("Description:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<td>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</td>", start);
            if (end > 0) {
                var des = content.substr(start, end - start + 5);
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
    var firstSymbol = content.indexOf("ipsBox", 0);
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

function GetUrlToLoadChapters() {
    return "Unknown";
}

function GetChaptersUrl() {
    var chapterUrls = "";
    var chapterName = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Chapters</h3>", 0);
    var endSymbol = content.indexOf("</table>", firstSymbol);
    if (endSymbol > 0) {
        content = content.substr(firstSymbol + 1, endSymbol - firstSymbol - 1);
        firstSymbol = 1;
    }
    if (firstSymbol > 0) {
        var start = content.indexOf("http://www.batoto.net/read/", firstSymbol);
        while (start > 0) {
            var end = content.indexOf("\"", start + 1);
            if (start > 0 && end > 0) {
                var url = content.substr(start, end - start);
                if (url) {
                    var nameStart = content.indexOf(";\">", end);
                    var nameEnd = content.indexOf("</a>", nameStart);
                    var name = content.substr(nameStart + 3, nameEnd - nameStart - 3);
                    name = name.replace("Read Online", "");
                    url = url + "dungda" + name;
                    chapterUrls = chapterUrls + url + "chapternamelink";
                    start = content.indexOf("http://www.batoto.net/read/", end);
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