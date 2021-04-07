getData()
var search = document.querySelector(".search");
var qouteBody = document.querySelector(".qoute-body")
var qouteAuthor = document.querySelector(".qoute-author")
var resultList = document.querySelector(".search-result");
var authors = []
var arr=[];
var result;
var res;
var randIndex;
var nonRepeatedAuthors
// function create authors array
function createAuthors() {
    for (var i = 0; i < res.length; i++) {
        if (res[i].author != null) {
            authors.push(res[i].author)
        }
    }
    nonRepeatedAuthors = Array.from(new Set(authors))

}
// ****************************
// function to get random number with range
function rand(range) {
    var randNumber = Math.floor(Math.random() * range)
    return randNumber
}
// ****************************
// real time search
function updateResult(query) {
    resultList.innerHTML = "";
    createAuthors()
    nonRepeatedAuthors.map(function (author) {
        if (author.toLowerCase().includes(query.toLowerCase()) && query != "") {
            resultList.innerHTML += `<li onclick="chooseAuthor(this)" class="list-group-item">${author}</li>`;
            result = document.querySelector(".list-group-item")
        }
    })
}
// ****************************
// function to get data from api and show it
function getData() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            res = JSON.parse(this.responseText)
            randIndex = rand(res.length - 1)
            if (res[randIndex].author != null) {
                qouteBody.innerHTML = res[randIndex].text;
                qouteAuthor.innerHTML = res[randIndex].author
                search.value=""
            } else {
                getData()
            };
        }
    });
    xhr.open("GET", "https://type.fit/api/quotes");
    xhr.send();
}
// ****************************
// function to set the value of input
function chooseAuthor(favAuthor) {
    search.value = favAuthor.textContent
    resultList.innerHTML = null
}
// ****************************
// search
function searchAuthor() {
    for (var i = 0; i < res.length; i++) {
        if (res[i].author != null && res[i].author == search.value) {
            arr.push(res[i])
        }
    }
    qouteBody.innerHTML = arr[rand(arr.length - 1)].text;
    qouteAuthor.innerHTML = arr[rand(arr.length - 1)].author;
    arr=[]
}
// ****************************
document.querySelector(".rand").addEventListener("click", getData)
document.querySelector(".search-btn").addEventListener("click", searchAuthor)