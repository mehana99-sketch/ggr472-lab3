# ggr472-lab3

## Skills Practiced:
- Drew polygon data type
- Changed layer order (CTs drawn below point layers)
- Event: opacity change when hovering
- Controls: full screen option, navigation
    - Adjusted position
- Added and formatted a legend
- Filtered POI based on existance of URL (can be toggled for all POI, or just those with URL)
- Mouse changes when hovering over a point (reverts when leaving point)
- Popup on POI click with name and clickable external URL

## Issues:
- Accidentally added repository (in GitHub desktop) to 'ggr272-lab3' file, rather than 'GitHub' file, and was confused when the repository was empty.
- Wanted to make things easier by coping lab 2 file, changing the name, and updating for lab 3. I pushed the changes, and it just committed to the lab 2 repository. What did I do wrong here? How do I fix this problem without creating a new repository?
- I initially tried to convert a gdb to geoJSON using gejson.io, but couldn't make it work.
-  Filter box is checked upon map loading, but filter isn't actually active until I uncheck and check the box again
- I couldn't find an easy way to add a condition to the popup, so that it only displays a website link if the feature includes a URL.
- (Fixed) page must be published to be able to use GeoJSON link (still some confusion with raw files).
- (Fixed) 'src="script.js"' will not be read if it's in the script body of index.html. It must be in its own script line. 
- (Fixed) failed filter 'map.setFilter('POI-point', ['!', ['has', 'Link_URL']]);
' etc.; seems that null is still treated as a value, so I had to maneuver around that


