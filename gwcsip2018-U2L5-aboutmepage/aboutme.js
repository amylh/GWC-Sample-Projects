
alert("Welcome to my page!");
imgID = 0;

function bigImg(x) {
    x.style.height = "400px";
    x.style.width = "400px";
}

function normalImg(x) {
    x.style.height = "70px";
    x.style.width = "70px";
}

function showHideSection(section){
  var x = document.getElementById(section);
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("show/hide-" + section).innerHTML = ("Hide " + section);
  } else {
    x.style.display = "none";
    document.getElementById("show/hide-" + section).innerHTML = ("Show " + section);
  }
}

function nextImg(){
  img = document.getElementById("update-penguins");
	if (imgID == 0) {
    img.innerHTML = '<h2>Robo Penguin</h2><p>This penguin has wheels and synthetic (but still cuddly) fluff</p><img src="https://images2.sw-cdn.net/product/picture/710x528_6211899_2832503_1459312498.jpg" height=400px alt="Robo Penguin">';
	} else if (imgID == 1) {
    img.innerHTML = '<h2>Fluffy Penguin</h2><p>This penguin is a very good fluffy boi</p><img  src="https://image1.masterfile.com/getImage/NzAwLTAyNjcwNjA1ZW4uMDAwMDAwMDA=ALb51J/700-02670605en_Masterfile.jpg" height=400px alt="Fluffy Penguin">';
	} else if (imgID == 2) {
    img.innerHTML = '<h2>Round Penguin</h2><p>R O U N D  P E N G U I N</p><img  src="https://cdn3.volusion.com/9nxdj.fchy5/v/vspfiles/photos/AR-29294-2.jpg?1510391766" height=400px alt="Round Penguin">';
  } else {
    img.innerHTML = '<h2>Pingu</h2><p>NOOT NOOT</p><img  src="https://vignette.wikia.nocookie.net/p__/images/c/cc/Pingu_1.png/revision/latest?cb=20130826005309&path-prefix=protagonist" height=400px alt="Pingu">';
  }
  imgID = (imgID+1)%4;
}
