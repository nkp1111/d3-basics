The world map data has been taken from [unpkg of countries-50m file](https://unpkg.com/world-atlas@2.0.2/countries-50m.json) 

for different specification visit https://unpkg.com/browse/world-atlas@2.0.2/

![world-map](https://github.com/nkp1111/html-svg-d3-basics/blob/main/6.world-map/Screenshot%202022-09-06%20121419.png?raw=true)

Methods used-
D3 :
  - **d3.json(url)**: 
  input- url, 
  output- promise*(data or error)*

  - **d3.geoEqualEarth()**: 
  input- none, 
  output- projection

  - **d3.geoPath(projection)**: 
  input- projection, 
  output- path

  - **d3.geoGraticule()**: 
  input- none, 
  output- function(), 
  *to draw latitude and longitude on map*

topojson:
  - **topojson.feature(data, data.objects.countries)**: 

  - **topojson.mesh(data, data.objects.countries, (a, b) => a !== b)**:
 
