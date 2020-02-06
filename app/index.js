/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();



/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */


/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * const app = new Content({
 *  target: document.querySelector('.article-lcd-body-content'),
 *  hydrate: true,
 *  data: {
 *    content
 *  }
 * });
 */



// Common code to get svelte template loaded on the client and hack-ishly
// handle sharing
//
// import Content from '../templates/_index-content.svelte.html
//
// $(document).ready(() => {
//   // Hack to get share back
//   let $share = $('.share-placeholder').size()
//     ? $('.share-placeholder')
//       .children()
//       .detach()
//     : undefined;
//   let attachShare = !$share
//     ? undefined
//     : () => {
//       $('.share-placeholder').append($share);
//     };

//   // Main component
//   const app = new Content({
//     target: document.querySelector('.article-lcd-body-content'),
//     hydrate: true,
//     data: {
//       attachShare
//     }
//   });
// });

import scenario1 from '../sources/model1.json';
import scenario2 from '../sources/model2.json';
import scenario3 from '../sources/model3.json';
import scenario4 from '../sources/model4.json';
import scenario5 from '../sources/model5.json';
import locations from '../sources/locations.json';

var center = [-93.268508, 44.969751];
var zoom = 10;
var minzoom = 10;


mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRyaWJ1bmUiLCJhIjoiY2sxYjRnNjdqMGtjOTNjcGY1cHJmZDBoMiJ9.St9lE8qlWR5jIjkPYd3Wqw';
var map1 = new mapboxgl.Map({
container: 'mapper1',
style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
center: center,
zoom: zoom,
minZoom: minzoom
});
 

var geocoder1 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    filter: function(item) {
        return item.context
            .map(function(i) {
            return (
            i.id.split('.').shift() === 'region' &&
            i.text === 'Minnesota'
            );
            })
            .reduce(function(acc, cur) {
            return acc || cur;
            });
        },
    marker: {
    color: 'gray'
    },
    mapboxgl: mapboxgl
});

map1.scrollZoom.disable();
map1.dragRotate.disable();
// map1.doubleClickZoom.disable();
map1.touchZoomRotate.disableRotation();
map1.addControl(new mapboxgl.NavigationControl());
 
document.getElementById('geocoder1').appendChild(geocoder1.onAdd(map1));

map1.on('load', function() {

    map1.addSource('nb1', {
        type: 'geojson',
        data: scenario1
      });

      map1.addSource('locations', {
        type: 'geojson',
        data: locations
      });

      map1.addLayer({
        'id': 'nb-layer1',
        'interactive': true,
        'source': 'nb1',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#cccccc',
            'fill-outline-color': '#000000'
         }
    }, 'settlement-label');

    map1.addLayer({
        'id': 'locations1',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 5,
        'circle-color': [
            'match',
            ['get', 'model1'],
            'elementary',
            '#89B07D',
            'middle',
            '#b37862',
            'k8',
            '#80ADAD',
            'nonmag',
            '#ffffff',
            '#ccc'
            ]
        }
        });

        map1.addLayer({
            'id': 'poi-labels',
            'type': 'symbol',
            'source': 'locations',
            'layout': {
            'text-size': 5,
            'text-field': ['get', 'name'],
            }
         });

});


var map2 = new mapboxgl.Map({
    container: 'mapper2',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: zoom,
    minZoom: minzoom
    });
     
    var geocoder2 = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: 'us',
        filter: function(item) {
            return item.context
                .map(function(i) {
                return (
                i.id.split('.').shift() === 'region' &&
                i.text === 'Minnesota'
                );
                })
                .reduce(function(acc, cur) {
                return acc || cur;
                });
            },
        marker: {
        color: 'gray'
        },
        mapboxgl: mapboxgl
    });

map2.scrollZoom.disable();
map2.dragRotate.disable();
// map2.doubleClickZoom.disable();
map2.touchZoomRotate.disableRotation();
map2.addControl(new mapboxgl.NavigationControl());
     
document.getElementById('geocoder2').appendChild(geocoder2.onAdd(map2));


map2.on('load', function() {

    map2.addSource('nb2', {
        type: 'geojson',
        data: scenario2
      });

      map2.addSource('locations', {
        type: 'geojson',
        data: locations
      });

      map2.addLayer({
        'id': 'nb-layer2',
        'interactive': true,
        'source': 'nb2',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#cccccc',
            'fill-outline-color': '#000000'
         }
    }, 'settlement-label');


     map2.addLayer({
        'id': 'locations2',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 5,
        'circle-color': [
            'match',
            ['get', 'model2'],
            'elementary',
            '#89B07D',
            'middle',
            '#b37862',
            'k8',
            '#80ADAD',
            'nonmag',
            '#ffffff',
            '#ccc'
            ]
        }
        });

        map2.addLayer({
            'id': 'poi-labels',
            'type': 'symbol',
            'source': 'locations',
            'layout': {
            'text-size': 5,
            'text-field': ['get', 'name'],
            }
         });

});



var map3 = new mapboxgl.Map({
    container: 'mapper3',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: zoom,
    minZoom: minzoom
    });
 
var geocoder3 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    filter: function(item) {
        return item.context
            .map(function(i) {
            return (
            i.id.split('.').shift() === 'region' &&
            i.text === 'Minnesota'
            );
            })
            .reduce(function(acc, cur) {
            return acc || cur;
            });
        },
    marker: {
    color: 'gray'
    },
    mapboxgl: mapboxgl
});

map3.scrollZoom.disable();
map3.dragRotate.disable();
// map3.doubleClickZoom.disable();
map3.touchZoomRotate.disableRotation();
map3.addControl(new mapboxgl.NavigationControl());
 
document.getElementById('geocoder3').appendChild(geocoder3.onAdd(map3));

map3.on('load', function() {

    map3.addSource('nb3', {
        type: 'geojson',
        data: scenario3
      });

    map3.addSource('locations', {
        type: 'geojson',
        data: locations
      });

      map3.addLayer({
        'id': 'nb-layer3',
        'interactive': true,
        'source': 'nb3',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#cccccc',
            'fill-outline-color': '#000000'
         }
    }, 'settlement-label');
    
    map3.addLayer({
        'id': 'locations3',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 5,
        'circle-color': [
            'match',
            ['get', 'model3'],
            'elementary',
            '#89B07D',
            'middle',
            '#b37862',
            'k8',
            '#80ADAD',
            'nonmag',
            '#ffffff',
            '#ccc'
            ]
        }
        });

        map3.addLayer({
            'id': 'poi-labels',
            'type': 'symbol',
            'source': 'locations',
            'layout': {
            'text-size': 5,
            'text-field': ['get', 'name'],
            }
         });

});


var map4 = new mapboxgl.Map({
    container: 'mapper4',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: zoom,
    minZoom: minzoom
    });
 
var geocoder4 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    filter: function(item) {
        return item.context
            .map(function(i) {
            return (
            i.id.split('.').shift() === 'region' &&
            i.text === 'Minnesota'
            );
            })
            .reduce(function(acc, cur) {
            return acc || cur;
            });
        },
    marker: {
    color: 'gray'
    },
    mapboxgl: mapboxgl
});

map4.scrollZoom.disable();
map4.dragRotate.disable();
// map4.doubleClickZoom.disable();
map4.touchZoomRotate.disableRotation();
map4.addControl(new mapboxgl.NavigationControl());
 
document.getElementById('geocoder4').appendChild(geocoder4.onAdd(map4));

map4.on('load', function() {

    map4.addSource('nb4', {
        type: 'geojson',
        data: scenario4
      });

    map4.addSource('locations', {
        type: 'geojson',
        data: locations
      });

      map4.addLayer({
        'id': 'nb-layer4',
        'interactive': true,
        'source': 'nb4',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#cccccc',
            'fill-outline-color': '#000000'
         }
    }, 'settlement-label');

     map4.addLayer({
        'id': 'locations4',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 5,
        'circle-color': [
            'match',
            ['get', 'model4'],
            'elementary',
            '#89B07D',
            'middle',
            '#b37862',
            'k8',
            '#80ADAD',
            'nonmag',
            '#ffffff',
            '#ccc'
            ]
        }
        });

        map4.addLayer({
            'id': 'poi-labels',
            'type': 'symbol',
            'source': 'locations',
            'layout': {
            'text-size': 5,
            'text-field': ['get', 'name'],
            }
         });

});


var map5 = new mapboxgl.Map({
    container: 'mapper5',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: zoom,
    minZoom: minzoom
    });
 
var geocoder5 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    filter: function(item) {
        return item.context
            .map(function(i) {
            return (
            i.id.split('.').shift() === 'region' &&
            i.text === 'Minnesota'
            );
            })
            .reduce(function(acc, cur) {
            return acc || cur;
            });
        },
    marker: {
    color: 'gray'
    },
    mapboxgl: mapboxgl
});

map5.scrollZoom.disable();
map5.dragRotate.disable();
// map5.doubleClickZoom.disable();
map5.touchZoomRotate.disableRotation();
map5.addControl(new mapboxgl.NavigationControl());
 
document.getElementById('geocoder5').appendChild(geocoder5.onAdd(map5));

map5.on('load', function() {

    map5.addSource('nb5', {
        type: 'geojson',
        data: scenario5
      });

    map5.addSource('locations', {
        type: 'geojson',
        data: locations
      });

      map5.addLayer({
        'id': 'nb-layer5',
        'interactive': true,
        'source': 'nb5',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#cccccc',
            'fill-outline-color': '#000000'
         }
    }, 'settlement-label');

     map5.addLayer({
        'id': 'locations5',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 5,
        'circle-color': [
            'match',
            ['get', 'model5'],
            'elementary',
            '#89B07D',
            'middle',
            '#b37862',
            'k8',
            '#80ADAD',
            'nonmag',
            '#ffffff',
            '#ccc'
            ]
        }
        });

        map5.addLayer({
            'id': 'poi-labels',
            'type': 'symbol',
            'source': 'locations',
            'layout': {
            'text-size': 5,
            'text-field': ['get', 'name'],
            }
         });
    

});

var map6 = new mapboxgl.Map({
    container: 'mapper6',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: zoom,
    minZoom: minzoom
    });
 
var geocoder6 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    filter: function(item) {
        return item.context
            .map(function(i) {
            return (
            i.id.split('.').shift() === 'region' &&
            i.text === 'Minnesota'
            );
            })
            .reduce(function(acc, cur) {
            return acc || cur;
            });
        },
    marker: {
    color: 'gray'
    },
    mapboxgl: mapboxgl
});

map6.scrollZoom.disable();
map6.dragRotate.disable();
// map5.doubleClickZoom.disable();
map6.touchZoomRotate.disableRotation();
map6.addControl(new mapboxgl.NavigationControl());
 
document.getElementById('geocoder5').appendChild(geocoder6.onAdd(map6));

map6.on('load', function() {

    map6.addSource('nb1', {
        type: 'geojson',
        data: scenario1
      });

    map6.addSource('locations', {
        type: 'geojson',
        data: locations
      });

      map6.addLayer({
        'id': 'nb-layer6',
        'interactive': true,
        'source': 'nb1',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#cccccc',
            'fill-outline-color': '#000000'
         }
    }, 'settlement-label');

     map6.addLayer({
        'id': 'locations6',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 5,
        'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'capacity_pct'],
            0.3,
            '#DAE1E7',
            0.4,
            '#C6D1D9',
            0.5,
            '#A8B9C5',
            0.6,
            '#7F98AA',
            0.8,
            '#556E7F',
            0.9,
            '#2C3942',
            1,
            '#ffffff'
            ]
        }
        });

        map6.addLayer({
            'id': 'poi-labels',
            'type': 'symbol',
            'source': 'locations',
            'layout': {
            'text-size': 5,
            'text-field': ['get', 'name'],
            }
         });
    

});

$(".reset").on("click", function(){
    map1.flyTo({center: center, zoom: zoom});
    map2.flyTo({center: center, zoom: zoom});
    map3.flyTo({center: center, zoom: zoom});
    map4.flyTo({center: center, zoom: zoom});
    map5.flyTo({center: center, zoom: zoom});
    map6.flyTo({center: center, zoom: zoom});
    $('.mapboxgl-ctrl-geocoder--input').val('');
    $('.mapboxgl-marker').hide();
});


!function(){"use strict";window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"])for(var e in a.data["datawrapper-height"]){var t=document.getElementById("datawrapper-chart-"+e)||document.querySelector(".dataframe iframe[src*='"+e+"']");t&&(t.style.height=a.data["datawrapper-height"][e]+"px")}})}();