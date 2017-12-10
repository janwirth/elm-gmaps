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
    google.maps.event.trigger(freeInstance, "resize")
  } else {
    // display 'gmap' element
    el.style = 'display: block'
    const newMap = new google.maps.Map( el, mapOptions )
    google.maps.event.trigger(newMap, "resize")
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
      node.tagName === 'GMAP' && !node.firstChild
        ? makeMap(node)
        : 'noop'
      node.tagName === 'GMAP'
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

const init = rootEl=> {
  Array.from(rootEl.querySelectorAll('gmap')).map( mapEl => makeMap(mapEl))
  observer.observe( rootEl, config )
}


 
// pass in the target node, as well as the observer options
// later, you can stop observing
// observer.disconnect()
export default rootEl => {
  setTimeout(() => init(rootEl), 100)
}
