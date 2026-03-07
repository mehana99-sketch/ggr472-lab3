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
    // Wasn't working before; must be within "map.on('load', () => {..." section
    // Add an existing data source from a GeoJSON file
    map.addSource('StrollTO-POI', {
        type: 'geojson',
        data: 'https://mehana99-sketch.github.io/ggr472-lab2/data/StrollTO-POI.geojson'
    // URL to your geojson file, taken from github pages
    });
    map.addSource('BicycleParking-Indoor', {
        type: 'geojson',
        data: 'https://mehana99-sketch.github.io/ggr472-lab2/data/BicycleParking-Indoor.geojson'
    });
    map.addSource('BicycleParking-Outdoor', {
        type: 'geojson',
        data: 'https://mehana99-sketch.github.io/ggr472-lab2/data/BicycleParking-Outdoor.geojson'
    });
    map.addSource('TorontoCT', {
        type: 'geojson',
        data: 'https://mehana99-sketch.github.io/ggr472-lab2/data/TorontoCT.geojson'
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
});