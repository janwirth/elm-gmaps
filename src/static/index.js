// pull in desired CSS/SASS files
require( './styles/main.scss' );

const rootEl = document.getElementById( 'main' )
// inject bundled Elm app into div#main
var Elm = require( '../elm/Main' );
Elm.Main.embed( rootEl );


import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyB0S7OJbqD7Oth6aJnY7TFIyNZspaSjOD4'

const mapRegister = [
]

const bindFreeMapsInstance = google => el => {
  const freeInstance = mapRegister.find( entry => {
    return !entry.getDiv().parentElement
  })

  if (freeInstance) {
    console.log('replacing')
    el.parentElement.replaceChild(freeInstance.getDiv(), el)
  } else {
    console.log('creating')
    mapRegister.push(new google.maps.Map( el, mapOptions ))
  }
}
const mapOptions ={
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
}

const makeMap = el => {
  GoogleMapsLoader.load( google => {
    bindFreeMapsInstance(google)(el)
  })
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.map( mutation => {
    Array.from(mutation.addedNodes).map( node => {
      node.className === 'gmap' && !node.firstChild
        ? makeMap(node)
        : 'noop'
      node.className === 'gmap'
        ? console.log(node)
        : 'noop'
    })
    Array.from(mutation.removedNodes).map( node => {
    })
  })

});
 
// configuration of the observer:
var config = {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: false
};
 
// pass in the target node, as well as the observer options
observer.observe( rootEl, config );
 
// later, you can stop observing
// observer.disconnect();
