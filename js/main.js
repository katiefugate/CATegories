
var listView = document.querySelector('.breeds');
var catbreeds = new XMLHttpRequest();
catbreeds.open('GET', 'https://api.thecatapi.com/v1/breeds?attach_breed=0');
catbreeds.setRequestHeader('x-api-key', '13ac2e7c-3a0a-4430-9b8f-e916a6297cd6');
catbreeds.addEventListener('load', function () {
  var catBreedsArr = JSON.parse(catbreeds.response);
  for (var i = 0; i < catBreedsArr.length; i++) {
    if (catBreedsArr[i].image !== undefined && catBreedsArr[i].image.url !== undefined) {
      listView.appendChild(addCats(catBreedsArr[i]));
    }
  }
});
catbreeds.send();

function addCats(eachCat) {
  var col = document.createElement('div');
  var catName = document.createElement('h3');
  var catImg = document.createElement('img');
  col.appendChild(catName);
  col.appendChild(catImg);
  col.className = 'col-third';
  catName.className = 'cat-name';
  catImg.className = 'cat-img';
  catName.textContent = eachCat.name;
  catImg.setAttribute('src', eachCat.image.url);
  return col;
}
