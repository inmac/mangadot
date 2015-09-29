function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("\"keywords\"", 0);
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
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("/author/", 0);
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
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Artist(s)", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("label>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</li>", start);
            if (end > 0) {
                var artis = content.substr(start + 6, end - start - 6);
                if (artis) {
                    return artis;
                }
            }
        }
    }
    return "Unknown";
}

function GetDemographic() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Demographic:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</a>", start);
            if (end > 0) {
                var demographic = content.substr(start + 2, end - start - 2);
                if (demographic) {
                    return demographic;
                }
            }
        }
    }
    return "Unknown";
}

function GetGenre() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Genre(s):", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("</label>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start + 8);
            if (end > 0) {
                var genre = content.substr(start + 8, end - start - 8);
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
    var firstSymbol = content.indexOf("Status:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("label>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start + 6);
            if (end > 0) {
                var status = content.substr(start + 6, end - start - 6);
                if (status) {
                    status = status.replace("&nbsp;", "");
                    return status;
                }
            }
        }
    }
    return "Unknown";
}

function GetRank() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Rank:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("label>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("<", start);
            if (end > 0) {
                var rank = content.substr(start + 6, end - start - 6 - 2);
                if (rank) {
                    return rank;
                }
            }
        }
    }
    return "Unknown";
}

function GetDescription() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Summary:", 0);
    if (firstSymbol > 0) {
        var start1 = content.indexOf("<p id=\"show\"", firstSymbol);
        if (start1 > 0) {
            var start = content.indexOf(">", start1 + 13);
            var end = content.indexOf("<a href=", start);
            if (end > 0) {
                var des = content.substr(start + 1, end - start - 1);
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
    var firstSymbol = content.indexOf("manga_detail", 0);
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
    return 1;
}

function GetChaptersUrl() {
    var chapterUrls = "";
    var chapterName = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol1 = content.indexOf("detail_list", 0);
    var firstSymbol = content.indexOf("color_0077", firstSymbol1);
    if (firstSymbol > 0) {
        var endSymbol = content.indexOf("</ul>", firstSymbol);
        if (endSymbol > 0) {
            content = content.substr(firstSymbol, endSymbol - firstSymbol);
        }
    }
    var start = content.indexOf("href=\"", 0);
    while (start > 0) {
        var end = content.indexOf("\"", start + 6);
        if (end > 0) {
            var url = content.substr(start + 6, end - start - 6);
            if (url) {
                var name = GetChapterName(end, content);
                chapterUrls = chapterUrls + url + "dungda" + name + "chapternamelink";
                start = start = content.indexOf("href=\"", end);
            }
        }
    }
    if (chapterUrls.length > 0) {
        chapterUrls = chapterUrls.substr(0, chapterUrls.length - 15);
        return chapterUrls;
    }
    return "Unknown";
}

function GetChapterName(firstStart, content) {
    firstStart = content.indexOf(">", firstStart);
    var chapterName = "";
    if (firstStart > 0) {
        var firstSymbol = content.indexOf("</span>", firstStart + 1);
        if (firstSymbol > 0) {
            var endSymbol = content.indexOf("</span>", firstSymbol);
            if (endSymbol > 0) {
                chapterName = content.substr(firstStart + 1, endSymbol - firstStart - 1);
                chapterName = chapterName.replace("</span>", "");
                chapterName = chapterName.replace("<span>", "");
                chapterName = chapterName.replace("</a>", "");
                chapterName = chapterName.replace("<span class=\"mr6\">", " ");
            }
        }
    }
    if (chapterName.length <= 0) {
        return "Unknown";
    }
    return chapterName;
}