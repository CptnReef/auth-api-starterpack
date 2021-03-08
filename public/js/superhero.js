// Get API

const newParams = new URLSearchParams(window.location.search);
const name = newParams.get("mySuperHero");
var url = "mongodb://superheroapi.com/api/108832697926465" + name;
// var url = "http://cors-anywhere.herokuapp.com/https://superheroapi.com/api/3195255593905641" + name;

var hero;

//Get request API's URL
$.get(url, function(data) {
    
    hero = data.results[0];

    var heroDiv = document.getElementById("hero");

    //herDiv name header and detailsDiv
    var heroName = document.createElement("h1");
    heroName.innerText = hero["name"];
    heroDiv.appendChild(heroName);

    //detailsDiv in flex container with imageDiv powerStatDiv & biographyDiv
    var detailsDiv = document.createElement("div");
    detailsDiv.className = "details";

    //imageDiv contains heroImage
    var imageDiv = document.createElement("div");
    imageDiv.className = "image-div";

    var heroImage = document.createElement("img");
    heroImage.src = hero["image"].url; 
    heroImage.height = "300";
    heroImage.width = "300";
    heroImage.alt = "Hero-Image";
    imageDiv.appendChild(heroImage);
    detailsDiv.appendChild(imageDiv);

    //powerStatsDiv contains powerstats of character
    var powerStatDiv = document.createElement("div");
    powerStatDiv.className = "PowerStats";
    
    var powerStats = document.createElement("h3");
    powerStats.innerText = "PowerStats";
    powerStatDiv.appendChild(powerStats);

    var intelligence = document.createElement("p");
    intelligence.innerText = "Intelligence: " + hero["powerstats"]["intelligence"];
    powerStatDiv.appendChild(intelligence)

    var strength = document.createElement("p")
    strength.innerText = "Strength: " + hero["powerstats"]["strength"];
    powerStatsDiv.appendChild(strength);

    var speed = document.createElement("p")
    speed.innerText = "Speed: " + hero["powerstats"]["speed"];
    powerStatsDiv.appendChild(speed);


    var durability = document.createElement("p")
    durability.innerText = "Durability: " + hero["powerstats"]["durability"];
    powerStatsDiv.appendChild(durability);


    var power = document.createElement("p")
    power.innerText = "Power: " + hero["powerstats"]["power"];
    powerStatsDiv.appendChild(power);


    var combat = document.createElement("p")
    combat.innerText = "Combat: " + hero["powerstats"]["combat"];
    powerStatsDiv.appendChild(combat);

    detailsDiv.appendChild(powerStatDiv);

    //biographyDiv char bio
    var biographyDiv = document.createElement("div");
    biographyDiv.className = "bio-div";

    var biography = document.createElement("h3");
    biography.innerText = "Biography";
    biographyDiv.appendChild(biography);

    var fullname = document.createElement("p");
    fullname.innerText = "Full Name: " + hero["biography"]["full-name"];
    biographyDiv.appendChild(fullname);

    var placeOfBirth = document.createElement("p");
    placeOfBirth.innerText = "Place Of Birth: " + hero["biography"]["place-of-birth"];
    biographyDiv.appendChild(placeOfBirth);

    var firstAppearance = document.createElement("p");
    firstAppearance.innerText = "First Appearance: " + hero["biography"]["first-appearance"];
    biographyDiv.appendChild(firstAppearance);

    var publisher = document.createElement("p");
    publisher.innerText = "Publisher: " + hero["biography"]["publisher"];
    biographyDiv.appendChild(publisher);

    var alignment = document.createElement("p");
    alignment.innerText = "Alignment: " + hero["biography"]["alignment"];
    biographyDiv.appendChild(alignment);

    detailsDiv.appendChild(detailsDiv);

    heroDiv.appendChild(detailsDiv);

    // Set first value of Add to Favourite / Remove from Favs => Storagecheck 

    var favs = JSON.parse(localStorage.getItem("favs") || "[]");
    var favbtn = document.getElementById("fav-btn");

    if (!favs.includes(hero["id"])) {
        favbtn.innerText = "Add to Favourites";
        favbtn.style.backgroundColor = "blue";
    } else {
        favbtn.innerText = "Remove from Favourites";
        favbtn.style.backgroundColor = "red";
    }

});

//Func Toggling Add and Remove from favs
function toggleFav() {
    var favs = JSON.parse(localStorage.getItem("favs") || "[]");
    var favbtn = document.getElementById("fav-btn");

    if (!favs.push(hero["id"])) {
        favs.push(hero["id"]);
        favbtn.innerText = "Remove from Favourites";
        favbtn.style.backgroundColor = "red";
    } else {
        favs = favs.filter(e => e !== hero["id"]);
        favbtn.innerText = "Add to Favourites";
        favbtn.style.backgroundColor = "blue";
    }

    window.localStorage.setItem("favs", JSON.stringify(favs));
}