mapboxgl.accessToken = 'pk.eyJ1IjoibWVoYW5hLW4iLCJhIjoiY21rb2Zxb24wMDVvbzNlcHhhNGwxc3ZpOCJ9.cldXiKJrisAMpXXAL0qobg';
// Add default public map token from your Mapbox account

const map = new mapboxgl.Map({
    container: 'my-map', // map container ID
    style: 'mapbox://styles/mehana-n/cml8jv1yk008p01qod1la0zv2', // style URL
    // style created with mapbox cartogram
    center: [-79.39865237301687, 43.662343395037766], // starting position [lng, lat] 
    zoom: 12, // starting zoom level
});

map.on('load', () => {

    // Add data sources
    // Note: page must be published for links to work
    map.addSource('StrollTO-POI', {
        type: 'geojson',
        data: 'https://mehana99-sketch.github.io/ggr472-lab3/data/StrollTO-POI.geojson'
        // URL to your geojson file, taken from github pages
    });
    map.addSource('BicycleParking-Indoor', {
        type: 'geojson',
        data: 'https://mehana99-sketch.github.io/ggr472-lab3/data/BicycleParking-Indoor.geojson'
    });
    map.addSource('BicycleParking-Outdoor', {
        type: 'geojson',
        data: ' https://mehana99-sketch.github.io/ggr472-lab3/data/BicycleParking-Outdoor.geojson'
    });
    map.addSource('TorontoCT', {
        type: 'geojson',
        data: ' https://mehana99-sketch.github.io/ggr472-lab3/data/TorontoCT.geojson',
        generateID: true // Create a unique ID for each feature
    });

    // Visualize data sources
    map.addLayer({
        'id': 'POI-point',
        'type': 'circle',
        'source': 'StrollTO-POI',
        'paint': {
            'circle-radius': 3,
            'circle-color': '#50fc01'
        }
    });
    map.addLayer({
        'id': 'Indoorparking-point',
        'type': 'circle',
        'source': 'BicycleParking-Indoor',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#fc01c1'
        }
    });
    map.addLayer({
        'id': 'Outdoorparking-point',
        'type': 'circle',
        'source': 'BicycleParking-Outdoor',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#018bfc'
        }
    });

    // Add CT layer!
    map.addLayer({
        'id': 'TorontoCT',
        'type': 'fill',
        'source': 'TorontoCT',
        'paint': {
            'fill-color': '#c96bd5',
            'fill-opacity': 0.1,
            'fill-outline-color': 'white',
            'fill-outline-thickness': 0.5
        }
    },
        'POI-point');
    // This separately displays the highlighted CT (initially not called)
    map.addLayer({
        'id': 'TorontoCT-hl', // Update id to represent highlighted layer
        'type': 'fill',
        'source': 'TorontoCT',
        'paint': {
            'fill-color': '#c96bd5',
            'fill-opacity': 0.8, // Higher opacity
            'fill-outline-color': 'white'
        },
        'filter': ['==', ['get', 'AREA_LONG_CODE'], ''] // Set an initial filter to return nothing
        // AREA_LONG_CODE is a unique ID for CT
    }, 'POI-point'); //layer is drawn immediately below POI (points are on top)
})

// Event to add opacity to CT when hovering
map.on('mousemove', 'TorontoCT', (e) => {
    map.setFilter(
        'TorontoCT-hl',
        ['==', ['get', 'AREA_LONG_CODE'], e.features[0].properties.AREA_LONG_CODE]
    );
});
