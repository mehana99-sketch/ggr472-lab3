mapboxgl.accessToken = 'pk.eyJ1IjoibWVoYW5hLW4iLCJhIjoiY21rb2Zxb24wMDVvbzNlcHhhNGwxc3ZpOCJ9.cldXiKJrisAMpXXAL0qobg';
// Add default public map token from your Mapbox account

// Create map
const map = new mapboxgl.Map({
    container: 'my-map', // map container ID
    style: 'mapbox://styles/mehana-n/cml8jv1yk008p01qod1la0zv2', // style URL
    // style created with mapbox cartogram
    center: [-79.39865237301687, 43.662343395037766], // starting position [lng, lat] 
    zoom: 12, // starting zoom level
});

// Load and display layers
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
        data: 'https://mehana99-sketch.github.io/ggr472-lab3/data/BicycleParking-Outdoor.geojson'
    });
    map.addSource('TorontoCT', {
        type: 'geojson',
        data: 'https://mehana99-sketch.github.io/ggr472-lab3/data/TorontoCT.geojson',
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
            'circle-color': '#3b065a'
        }
    });
    map.addLayer({
        'id': 'Outdoorparking-point',
        'type': 'circle',
        'source': 'BicycleParking-Outdoor',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#6ab9fa'
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
            'fill-outline-color': 'white'
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

    // Event: add opacity to CT when hovering
    map.on('mousemove', 'TorontoCT', (e) => {
        map.setFilter(
            'TorontoCT-hl',
            ['==', ['get', 'AREA_LONG_CODE'], e.features[0].properties.AREA_LONG_CODE]
        );
    });

    // Add map controls
    map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // These are automatically placed on top

    //Toggle layer filtering
    document.getElementById('layercheck').addEventListener('change', (e) => {
        if (e.target.checked) {
            // Apply filter (only POIs with a URL)
            map.setFilter('POI-point', ['!=', ['get', 'Link_URL'], null]);
        } else {
            // Remove filter (show all POIs)
            map.setFilter('POI-point', null);
        }
    })

    //Mouse visibility
    map.on('mouseenter', 'POI-point', () => {
        map.getCanvas().style.cursor = 'pointer'; // Switch cursor to pointer when mouse is over POI
        map.on('mouseleave', 'POI-point', () => {
            map.getCanvas().style.cursor = ''; // Switch cursor back when leaving POI
        });
    });

    // Popup with external link
    map.on('click', 'POI-point', (e) => {
        new mapboxgl.Popup() // Declare new popup object on each click
            .setLngLat(e.lngLat) // Use method to set coordinates of popup based on mouse click location
            .setHTML("<b>" + e.features[0].properties.Title + "</b>" + "<br>" + //Add title
            "Website: <a target='_blank' href=" + e.features[0].properties.Link_URL + ">Open Link</a>") //Make clickable link
            .addTo(map); // Show popup on map
    });
});