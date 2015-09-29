function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Manga Directory", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</h1>", start);
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
    var firstSymbol = content.indexOf("Author:", 0);
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
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Artist:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</a>", start);
            if (end > 0) {
                var artis = content.substr(start + 2, end - start - 2);
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
    var genres = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Genre:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("search/genre/", firstSymbol);
        while (start > 0) {
            var end = content.indexOf("\"", start);
            if (end > 0) {
                var genre = content.substr(start + 13, end - start - 13);
                if (genre) {
                    genres += genre + ", ";
                    firstSymbol = end;
                    start = content.indexOf("search/genre/", firstSymbol);
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
        var start = content.indexOf("<td>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</td>", start);
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
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Rank:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<td>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</td>", start);
            if (end > 0) {
                var rank = content.substr(start + 4, end - start - 4);
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
    var firstSymbol = content.indexOf("Plot:", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<td>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</td>", start);
            if (end > 0) {
                var des = content.substr(start + 4, end - start - 4);
                if (des) {
                    return des;
                }
            }
        }
    }
    return "Unknown";
}

function GetImageCover() {
    return "Unknown";
}

function GetChaptersPage() {
    var numOfPage = 0;
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("Prev [", 0);
    if (firstSymbol > 0) {
        var endSymbol = content.indexOf("]", firstSymbol);
        if (endSymbol > 0) {
            var tmpString = content.substr(firstSymbol + 1, endSymbol - firstSymbol - 1);
            var start = tmpString.indexOf("<a href=", 0);
            while (start > 0) {
                numOfPage++;
                var startTmp = start;
                start = tmpString.indexOf("<a href=", startTmp + 5);
                document.write("start =  " + start);
            }
        }
    }
    if (numOfPage > 0) {
        return numOfPage + 1;
    }
    return 1;
}

function GetChaptersUrl() {
    var chapterUrls = "";
    var chapterName = "";
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("oLoc", 0);
    while (firstSymbol > 0) {
        var start = content.indexOf("/", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("&quot;)", start + 1);
            if (end > 0) {
                var url = content.substr(start + 1, end - start - 1);
                if (url) {
                    url = "http://www.mangatoshokan.com/" + url;
                    var name = GetChapterName(firstSymbol);
                    chapterUrls = chapterUrls + url + "dungda" + name + "chapternamelink";
                    firstSymbol = content.indexOf("oLoc", end);
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

function GetChapterName(firstStart) {
    var content = document.documentElement.innerHTML;
    var chapterName = "";
    if (firstStart > 0) {
        var firstSymbol1 = content.indexOf("<td width=", firstStart);
        if (firstSymbol1 > 0) {
            var firstSymbol = content.indexOf("40", firstSymbol1);
            var nextSymbol = content.indexOf("title=", firstSymbol + 1);
            if (nextSymbol > 0) {
                var start = content.indexOf("\">", nextSymbol + 1);
                if (start > 0) {
                    var end = content.indexOf("</a>", start + 1);
                    if (end > 0) {
                        chapterName = content.substr(start + 2, end - start - 2);
                        var nextStart = content.indexOf("<span>", end + 1);
                        if (nextStart > 0) {
                            var nextStartEnd = content.indexOf("</span>", end + 1);
                            if (nextStartEnd > 0) {
                                var spendName = content.substr(nextStart + 6, nextStartEnd - nextStart - 6);
                                chapterName = chapterName + spendName;
                            }
                        }
                    }
                }
            }
        }
    }
    if (chapterName.length <= 0) {
        return "Unknown";
    }
    return chapterName;
}