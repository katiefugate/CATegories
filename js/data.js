/* exported data */

var data = {
  view: 'breeds',
  favorites: []
};

var previousDataJSON = localStorage.getItem('cat-data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function store(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('cat-data', dataJSON);
}

window.addEventListener('beforeunload', store);
