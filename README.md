# ggr472-lab3

## Skills Practiced:
- Drew polygon data type
- Changed layer order (CTs drawn below point layers)
- Event: opacity change when hovering
- Controls: full screen option, navigation
    - Adjusted position
- Added and formatted a legend

## Issues:
- Accidentally added repository (in GitHub desktop) to 'ggr272-lab3' file, rather than 'GitHub' file, and was confused when the repository was empty.
- Wanted to make things easier by coping lab 2 file, changing name, and updating for lab 3. I pushed the changes, and it just committed to the lab 2 repository. What did I do wrong here? How do I fix this problem without creating a new repository?
- I initially tried to convert a gdb to geoJSON using gejson.io, but couldn't make it work.
- (Fixed) page must be published to be able to use GeoJSON link (still some confusion with raw files).
- (Fixed) ==src==="script.js" will not be read if it's in the script body of index.html. It must be in its own script line. 

## Minimum Requirements:
- [ ] A layer with data/symbology that has been classified in some way
- [ ] Pop-up windows that appear on a mouse click or hover
- [x] A method that changes the visualization of a layer based on an event
    - (e.g., use an expression to change symbol size based on zoom level change or update paint/layout properties based on mouse event in map or on HTML elements)
- [ ] A method that filters features shown in the map based on an event
- [x] Map controls and HTML elements
    - (e.g., a button that initiates an action in the map)
- [x] A legend