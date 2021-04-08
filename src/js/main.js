
const appDiv = document.getElementById("app");



export default() =>{

appDiv.innerHTML = "<h1>Hello World</h1>";

getRandomQuestion();
getJeopardyGifs();
getRandomCategory();

}

const randomQuestionBtn = document.getElementById("randomButton");
const randomQuestion = document.getElementById("randomQuestion");

const jeopardyGifBtn = document.getElementById('getJeopardyGifs');
const answer = document.getElementById("answer");

const randomCategoryBtn = document.getElementById("randomCategory");

function getRandomQuestion(){
    const randomQuestionBtn = document.getElementById("randomButton");
    randomQuestionBtn.addEventListener('click', function(){ 
    fetch("https://jservice.io/api/random")
    .then((response)=> response.json())
    .then((data) => renderQuestion(data))
     .catch(err => console.log(err))
    });
}
  
function renderQuestion(data){
    const category = document.getElementById("category");

    randomQuestion.innerHTML = "Clue: "  + `</br>` + data[0].question;
    category.innerHTML = "Category: " + `</br>` + data[0].category.title;
    answer.innerHTML = "Answer: "  + `</br>` + data[0].answer;
    const numCluesToCat = document.getElementById('clues');
    numCluesToCat.innerHTML = ""
}
function getRandomCategory(){
    let randomCategoryID = Math.floor(Math.random() * 20) + 1
    let url = `https://jservice.io/api/category?&id=${randomCategoryID}`
    randomCategoryBtn.addEventListener('click', function(){
    fetch(url)
    .then((response) => response.json())
    .then((data) => renderCategory(data))
     .catch(err => console.log(err))
    });
}
  
  function renderCategory(data){
    const category = document.getElementById("category");
    
    category.innerHTML = "Category: " + `</br>` + data.title;
  
    const numCluesToCat = document.getElementById('clues');
    numCluesToCat.innerHTML = "Number of clues in this category: " + data.clues_count;
    randomQuestion.innerHTML = "Sample Clue: " + data.clues[0].question;
    answer.innerHTML = "Answer: " + data.clues[0].answer;
    getRandomCategory();
}
  
function getJeopardyGifs(){
    let j = "jeopardy";
    let url = `https://api.giphy.com/v1/gifs/search?api_key=jmjJFqTHamOzxVHDd4CIlOnFV2tPeZJE&q=${j}&limit=500&offset=0&rating=pg&lang=en`;
    jeopardyGifBtn.addEventListener('click', function(){
        fetch(url)
        .then(response => response.json())
        .then(content => {
                let fig = document.createElement("figure");
                let img = document.createElement("img");
                let caption = document.createElement("figcaption");
                let i = Math.floor(Math.random() * 50) + 1;
                img.src = content.data[i].images.downsized.url;
                img.alt = content.data[i].title;
                caption.textContent = content.data[i].title;
                fig.appendChild(img);
                fig.appendChild(caption);
                let app = document.getElementById("app");
                app.insertAdjacentElement('afterbegin', fig);
                 
            })
        .catch(err => console.log(err))
  
    });
}
  