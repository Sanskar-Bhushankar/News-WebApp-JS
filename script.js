//const apiKey = 'c8feed95dc2f41a7a2c4fe8e1211adec';
const apiKey = "Your_API_Key";

const blogcontainer = document.getElementById("blog-container");

const searchfield =document.getElementById("search-input");

const searchbutton =document.getElementById("search-button");


 async function fetchrandomnews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=12&apiKey=${apiKey}`;
        const response =await fetch(apiUrl);
        const data =await response.json();
        //console.log(data);
        return data.articles;
    }catch(error){
        console.error("error fetching random news",error);
        return [];
    }
}

function removeCardOnError(blogCard) {
    console.warn('Removing blog card due to missing data or resource error');
    blogCard.remove(); // Remove the blog card from the DOM
}

function displayBlogs(articles){
    blogcontainer.innerHTML="";

    articles.forEach(article=>{
        const blogCard=document.createElement("div");
        blogCard.classList.add("blog-card");

        const img =document.createElement("img");
        img.src=article.urlToImage;
        
        img.onerror = function () {
            removeCardOnError(blogCard);  // Call the function to remove the card
        };

        const title = document.createElement("h2");
        //title.textContent=article.title;
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "...." :article.title;
        title.textContent=truncatedTitle;

        const description =document.createElement("p");
        description.textContent=article.description;

        
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click',()=>{
            window.open(article.url,"_blank")
        })

        blogcontainer.appendChild(blogCard);
        
    });
}

searchbutton.addEventListener('click', async ()=>{
    const query =searchfield.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.log("error fetching news by query");
        }
    }
});

async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response =await fetch(apiUrl);
        const data =await response.json();
        //console.log(data);
        return data.articles;
    }catch(error){
        console.error("error fetching random news",error);
        return [];
    }
}

(async ()=>{
    try{
        const articles=await fetchrandomnews();
        //console.log(articles);
        displayBlogs(articles);
    }catch(error){
        console.error("error fetching data");
    }
})();