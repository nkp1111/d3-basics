const url = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

d3.json(url)
  .then(data => {

    console.log('intial_data: ', data);
    const { countries } = data.objects

    const dataset = topojson.feature(data, countries)

    console.log(dataset.features);

    const projection = d3.geoEqualEarth()
    // const projection = d3.geoAzimuthalEquidistant()
    // const projection = d3.geoGnomonic()
    // const projection =  d3.geoOrthographic()
    // const projection = d3.geoStereographic()
    // const projection = d3.geoAlbersUsa()
    const path = d3.geoPath(projection)

    // svg dimension
    const width = 800
    const height = 500

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    svg.append('g')
      .attr('class', 'mark')
      .selectAll('path')
      .data(dataset.features)
      .enter()
      .append('path')
      .attr('d', (d) => path(d))


  })