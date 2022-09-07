const url = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

d3.json(url)
  .then(data => {

    // console.log('intial_data: ', data);
    const { countries, land } = data.objects

    // const dataset = topojson.feature(data, countries)
    const dataset = topojson.feature(data, land)

    const projection = d3.geoEqualEarth()

    const path = d3.geoPath(projection)

    const interiors = topojson.mesh(data, countries, (a, b) => a !== b)

    const graticule = d3.geoGraticule()

    // svg dimension
    const width = 960
    const height = 640

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const main = svg.append('g')
      .attr('class', 'mark')

    main.append('path')
      .attr('class', 'sphere')
      .attr('d', path({ type: 'Sphere' }))

    main.append('path')
      .attr('class', 'graticules')
      .attr('d', path(graticule()))

    main.append('g')
      .selectAll('path')
      .data(dataset.features)
      .enter()
      .append('path')
      .attr('class', 'land')
      .attr('d', (d) => path(d))

    main.append('path')
      .attr('class', 'interiors')
      .attr('d', d => path(interiors))


    d3.select('h1')
      .style('margin-left', width / 2 + 'px')
  })