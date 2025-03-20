// API Endpoint
// https://api.freeapi.app/api/v1/public/quotes/quote/random

// Documentation
// https://freeapi.hashnode.space/api-guide/apireference/getARandomQuote


const quoteText = document.querySelector(".quote")
const authorText = document.querySelector(".author")
const mainDiv = document.querySelector(".mainDiv")
const random = document.querySelector(".random")
const newQuoteBtn = document.querySelector("#newContent")
const shareOnTwitter = document.querySelector("#shareQuote")

let author = ""
let content = ""

// API
const imagesUrl = "https://picsum.photos/1000/500"
const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random"

function generateImages() {
    random.innerHTML = "";
    
    return fetch(imagesUrl)
        .then((response) => {
            const randomImages = document.createElement("img")
            randomImages.src = response.url;
            random.appendChild(randomImages);
        })

        .catch((error) => {
            console.log(error);

        })
}

function generateQuote() {
   return  fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((quote) => {
            content = quote.data.content
            author = quote.data.author
            quoteText.innerText = `Quote : "${content}"`
            authorText.innerText = `Author : ${author}`
            random.append(quoteText, authorText)
        })
        .catch((error) => {
            console.log(error);
        })
}

// Share Quote on tweeter post
function shareQuote() {
    const tweetText = encodeURIComponent(`" ${quoteText.innerText} " \n \n Author : ${authorText.innerText}`)
    const twitterUrl = "https://twitter.com/intent/tweet?text=" + tweetText
    window.open(twitterUrl, "_blank")  // _blank opens links in new tab
}


newQuoteBtn.addEventListener('click', () => {
    Promise.all([generateQuote(), generateImages()]);
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteText.innerText);
    alert("Quote copied to clipboard")
})


shareOnTwitter.addEventListener('click', shareQuote)

Promise.all([generateQuote(), generateImages()]);