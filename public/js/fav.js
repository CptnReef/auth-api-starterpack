var favs = JSON.parse(localStorage.getItem("favs") || "[]");
var favContainer = document.getElementById("favs");

for (i in favs) {
    var id = favs[i];

    var url = "mongodb://superheroapi.com/api/108832697926465" + id;

    $.get(url, function(hero) {
        var heroDive = document.createElement("div");
        heroDive.className = "hero-tile";

        var heroImage = document.createElement("img");
        heroImage.className = hero.image.url;

        var heroName = document.createElement("h3");
        heroName.className = hero.name;

        var removeFav = document.createElement("button");
        removeFav.innerText = "Remove";
        removeFav.className = "remove-btn";
        removeFav.id = hero.id; 

        heroDive.appendChild(heroImage);
        heroDive.appendChild(heroName);
        heroDive.appendChild(removeFav);

        favContainer.appendChild(heroDive);

    });
}

var buttons;

$(document).ajaxStop( function() {
    buttons = document.getElementsByClassName("remove-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {

            var favs = JSON.parse(localStorage.getItem("favs") || "[]");
            var index = favs.indexOf(this.id);
            favs.splice(index, 1);
            window.localStorage.setItem("favs", JSON.stringify(favs));
            location.reload();
        });
    }
})

