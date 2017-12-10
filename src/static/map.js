import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyB0S7OJbqD7Oth6aJnY7TFIyNZspaSjOD4'

// A registry where we keep all maps that were already initialized
// because we reuse them in bindNextMapsInstance
// https://stackoverflow.com/questions/10485582/what-is-the-proper-way-to-destroy-a-map-instance
const mapRegister = [
]

// 'global' library placeholder
var google

// fill the placeholder
// loadedGoogle : Promise Google
const loadGoogle = new Promise( ( resolve, reject ) => {
  GoogleMapsLoader.load( loadedGoogle => {
    google = loadedGoogle
    resolve(google)
  })
})

const bindNextMapsInstance = el => {
  const freeInstance = mapRegister.find( entry => {
    return !entry.getDiv().parentElement
  })

  if (freeInstance) {
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

// makeMap : Node -> Effect node
const makeMap = el => loadGoogle.then( () => bindNextMapsInstance(el) )

// watchNewNodesAndBind : Node -> Effect Node
const watchNewNodesAndBind = rootEl => {
  // prepare observer
  const observer = new MutationObserver(function(mutations) {
    mutations.map( mutation => {
      Array.from(mutation.addedNodes).map( node => {
        node.tagName === 'GMAP' && !node.firstChild
          ? makeMap(node)
          : 'noop'

      })
      Array.from(mutation.removedNodes).map( node => {
      })
    })

  });
  // configure observer
  const subtree = {
    attributes: false,
    childList: true,
    subtree: true,
    characterData: false
  };
  // Start the actual observation
  observer.observe( rootEl, subtree )
}

// init : Node -> Effect Node
const init = rootEl=> {
  // Observe nodes that are already in place
  Array.from(rootEl.querySelectorAll('gmap')).map( mapEl => makeMap(mapEl))
  // Observe new nodes that come in from outer space
  watchNewNodesAndBind(rootEl)
}


 
// pass in the target node, as well as the observer options
// later, you can stop observing
// observer.disconnect()
export default rootEl => {
  setTimeout(() => init(rootEl || document.querySelector('body')), 100)
}
