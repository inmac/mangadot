function GetName() {
    var content = document.documentElement.innerHTML;
    var firstSymbol1 = content.indexOf("leftContent", 0);
    var firstSymbol = content.indexOf("\"name\"", firstSymbol1);
    if (firstSymbol > 0) {
        var start = content.indexOf("\">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</span>", start);
            if (end > 0) {
                var name = content.substr(start + 2, end - start - 2);
                if (name) {
                    return name.replace(/\s\s+/g, ' ');
                }
            }
        }
    }
    return "Unknown";
}

function GetAuthor() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("person-link", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf(">", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</a>", start);
            if (end > 0) {
                var author = content.substr(start + 1, end - start - 1);
                if (author) {
                    return author.replace(/\s\s+/g, ' ');
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
            return genres.replace(/\s\s+/g, ' ');
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
                    return status.trim();
                }
            }
        }
    }
    return "Unknown";
}

function GetRank() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf(" Рейтинг: ", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("<b>", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("</b>", start);
            if (end > 0) {
                var name = content.substr(start + 3, end - start - 3);
                if (name) {
                    return name.replace(/\s\s+/g, ' ');
                }
            }
        }
    }
    return "Unknown";
}

function CleanupTag(str, tag) {
	do {
		var start = str.indexOf("<"+tag, 0);
        if (start < 0) start = str.indexOf("</"+tag, 0);
        if (start >= 0) {
     		var end = str.indexOf(">", start);
            str = str.substr(0, start) + str.substr(end+1);
		}
    } while (start >= 0);
  	return str;
}

function GetDescription() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("manga-description", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf(">", firstSymbol);
        if (start > 0) {
        	start += 1;
            var end = content.indexOf("<div", start);
            if (end > 0) {
                var des = content.substr(start, end - start);
                if (des) {
                    return CleanupTag(des, "span").replace(/[ ]{2,}/g, ' ').trim();
                }
            }
        }
    }
    return "Unknown";
}

function GetImageCover() {
    var content = document.documentElement.innerHTML;
    var firstSymbol = content.indexOf("flex-row", 0);
    if (firstSymbol > 0) {
        var start = content.indexOf("src=\"", firstSymbol);
        if (start > 0) {
            var end = content.indexOf("\"", start + 5);
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

function buildRequest(s,a,b,c,d,e,f) {
	var r = '';
	r += a+String.fromCharCode(s);
	r += a+b+String.fromCharCode(s);
	r += b+c+String.fromCharCode(s);
	r += c-d+String.fromCharCode(e);
	r += String.fromCharCode(f)+String.fromCharCode(e);
	r += String.fromCharCode(f)+String.fromCharCode(s);
	r += String.fromCharCode(b-a-c+d-1) + String.fromCharCode(f-5);
	r += String.fromCharCode(b-a-c+d-1);
	return 'http://' + r;
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
                    url = "http://readmanga.me" + url + '?mature=1';
                    var nameStart = content.indexOf(">", end);
                    var name = "";
                    if (nameStart) {
                        var nameEnd = content.indexOf("<", nameStart + 1);
                        name = content.substr(nameStart + 1, nameEnd - nameStart - 1).replace(/\s\s+/g, ' ');
                    }
                    chapterUrls = chapterUrls + buildRequest(46,31,153,75,66,47,109) + '?url=' + encodeURIComponent(url) + "dungda" + name + "chapternamelink";
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