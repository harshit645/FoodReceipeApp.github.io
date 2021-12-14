const searchForm=document.querySelector('form');
const searchResultDiv=document.querySelector('.search-result');
const containerDiv=document.querySelector('.container');
let searchQuery='';
const APP_ID='aac91da3';
const APP_KEY='d994090bc79c1e8f07e9c079c74255cb';


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;   // fetch the input value / fetch the recipe name
    fetchAPI();
});

async function fetchAPI(){
    const baseURL= `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=100`;   //dynamic js
    const response=await fetch(baseURL);
    const data=await response.json();   // convert into object / array format
    console.log(data);
    generateHTML(data.hits);  //we generate html for hits only
};


function generateHTML(results){
    containerDiv.classList.remove('initial');   // remove the initial class after searching 
    var generatedHTML='';
// ek ek karke every item ke liye html generate karega and finally generated html mai sara items ka HTML code hoga
    results.map(result =>{      //fetch dynamic data for particular item
        generatedHTML+=`
        <div class="item">
                    <img src="${result.recipe.image}"
                        alt="${result.recipe.label}"/>
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                    </div>
                    <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Diet Label : ${result.recipe.dietLabels.length>0 ? result.recipe.dietLabels : 'No Data Found'}</p>
                    <p class="item-data">Cuisine Type : ${result.recipe.cuisineType}</p>
                    <p class="item-data">Health Label : ${result.recipe.healthLabels.length>0 ? result.recipe.healthLabels : 'No Data Found'}</p>
                </div>
        `
    })

    searchResultDiv.innerHTML=generatedHTML;
}


// alternative of target="_blank"
$(function() {
    $('a[class*=OpenInBlank]').click( function() {
        window.open(this.href);
        return false;
    });
});