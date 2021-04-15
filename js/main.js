
var breedsList = document.querySelector('.breeds');
var breedsView = document.querySelector('.breeds-view');
var infoViews = document.querySelector('.info-views');
var header = document.querySelector('header');
var catData = null;

var catbreeds = new XMLHttpRequest();
catbreeds.open('GET', 'https://api.thecatapi.com/v1/breeds?attach_breed=0');
catbreeds.setRequestHeader('x-api-key', '13ac2e7c-3a0a-4430-9b8f-e916a6297cd6');
catbreeds.addEventListener('load', function () {
  var catBreedsArr = JSON.parse(catbreeds.response);
  catData = catBreedsArr;
  for (var i = 0; i < catBreedsArr.length; i++) {
    if (catBreedsArr[i].image !== undefined && catBreedsArr[i].image.url !== undefined) {
      breedsList.appendChild(renderCatListItem(catBreedsArr[i]));
      breedsView.className = 'breeds-view';
      infoViews.className = 'info-views';
    }
  }
});
catbreeds.send();

function renderCatListItem(eachCat) {
  var col = document.createElement('div');
  var catName = document.createElement('h3');
  var catImg = document.createElement('img');
  col.appendChild(catName);
  col.appendChild(catImg);
  col.className = 'col-third';
  catName.className = 'cat-name';
  catImg.className = 'cat-img';
  catName.textContent = eachCat.name;
  col.dataset.view = eachCat.name;
  catImg.setAttribute('src', eachCat.image.url);
  return col;
}

function renderCatDetailView(cat) {
  var infoViewContainer = document.createElement('div');
  infoViewContainer.className = 'info-view-container';
  infoViewContainer.dataset.view = cat.name;

  var infoNameContainer = document.createElement('div');
  infoNameContainer.className = 'info-name-container';

  var infoName = document.createElement('h1');
  infoName.className = 'info-name';
  infoName.textContent = cat.name;

  var star = document.createElement('i');
  star.className = 'far fa-star';

  infoNameContainer.appendChild(infoName);
  infoNameContainer.appendChild(star);
  infoViewContainer.appendChild(infoNameContainer);

  var temperament = document.createElement('p');
  temperament.className = 'info-temp';
  temperament.textContent = cat.temperament;
  infoViewContainer.appendChild(temperament);

  var infoRow = document.createElement('div');
  infoRow.className = 'info-row';

  var imgDesCol = document.createElement('div');
  imgDesCol.className = 'col-half';

  var infoImg = document.createElement('img');
  infoImg.className = 'info-img';
  infoImg.setAttribute('src', cat.image.url);

  var infoDes = document.createElement('p');
  infoDes.className = 'info-des';
  infoDes.textContent = cat.description;

  imgDesCol.appendChild(infoImg);
  imgDesCol.appendChild(infoDes);
  infoRow.appendChild(imgDesCol);

  var infoValues = document.createElement('div');
  infoValues.className = 'col-half half';

  var weightCol = document.createElement('div');
  weightCol.className = 'col-half';

  var weightName = document.createElement('h2');
  weightName.textContent = 'Weight';

  var weightValue = document.createElement('p');
  weightValue.className = 'info-value weight';
  weightValue.textContent = cat.weight.imperial + ' pounds';

  weightCol.appendChild(weightName);
  weightCol.appendChild(weightValue);
  infoValues.appendChild(weightCol);

  var lifeSpanCol = document.createElement('div');
  lifeSpanCol.className = 'col-half';

  var lifeSpanName = document.createElement('h2');
  lifeSpanName.textContent = 'Life Span';

  var lifeSpanValue = document.createElement('p');
  lifeSpanValue.className = 'info-value life-span';
  lifeSpanValue.textContent = cat.life_span + ' years';

  lifeSpanCol.appendChild(lifeSpanName);
  lifeSpanCol.appendChild(lifeSpanValue);
  infoValues.appendChild(lifeSpanCol);

  var energyLevelCol = document.createElement('div');
  energyLevelCol.className = 'col-half';

  var energyLevelName = document.createElement('h2');
  energyLevelName.textContent = 'Energy Level';

  var energyLevelValue = document.createElement('div');
  energyLevelValue.className = 'paws energy';
  for (var i = cat.energy_level; i > 0; i--) {
    var paw = document.createElement('i');
    paw.className = 'fas fa-paw';
    energyLevelValue.appendChild(paw);
  }

  energyLevelCol.appendChild(energyLevelName);
  energyLevelCol.appendChild(energyLevelValue);
  infoValues.appendChild(energyLevelCol);

  var affectionCol = document.createElement('div');
  affectionCol.className = 'col-half';

  var affectionName = document.createElement('h2');
  affectionName.textContent = 'Affection';

  var affectionValue = document.createElement('div');
  affectionValue.className = 'paws affection';
  for (i = cat.affection_level; i > 0; i--) {
    paw = document.createElement('i');
    paw.className = 'fas fa-paw';
    affectionValue.appendChild(paw);
  }

  affectionCol.appendChild(affectionName);
  affectionCol.appendChild(affectionValue);
  infoValues.appendChild(affectionCol);

  var childFriendlyCol = document.createElement('div');
  childFriendlyCol.className = 'col-full';

  var childFriendlyName = document.createElement('h2');
  childFriendlyName.textContent = 'Child Friendly';

  var childFriendlyValue = document.createElement('div');
  childFriendlyValue.className = 'paws child-friendly';
  for (i = cat.child_friendly; i > 0; i--) {
    paw = document.createElement('i');
    paw.className = 'fas fa-paw';
    childFriendlyValue.appendChild(paw);
  }

  childFriendlyCol.appendChild(childFriendlyName);
  childFriendlyCol.appendChild(childFriendlyValue);
  infoValues.appendChild(childFriendlyCol);
  infoRow.appendChild(infoValues);
  infoViewContainer.appendChild(infoRow);

  return infoViewContainer;
}

function getInfo(event) {
  if (event.target.className === 'cat-name' || event.target.className === 'cat-img') {
    for (var i = 0; i < catData.length; i++) {
      if (catData[i].name === event.target.parentNode.dataset.view) {
        infoViews.textContent = '';
        infoViews.appendChild(renderCatDetailView(catData[i]));
        infoViews.className = 'info-view';
        breedsView.className = 'breeds-view hidden';
      }
    }
  }
}

breedsView.addEventListener('click', getInfo);

function linksHandler(event) {
  if (event.target.className === 'breeds-link' || event.target.className === 'title') {
    breedsView.className = 'breeds-view';
    infoViews.className = 'info-views hidden';
  }
}

header.addEventListener('click', linksHandler);
