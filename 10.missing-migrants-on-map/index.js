const worldUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

d3.json(worldUrl)
  .then(data => {

    const { countries, land } = data.objects

    // const dataset = topojson.feature(data, countries)
    const dataset = topojson.feature(data, land)

    let projection = d3.geoEqualEarth()

    const path = d3.geoPath(projection)

    const interiors = topojson.mesh(data, countries, (a, b) => a !== b)

    const graticule = d3.geoGraticule()

    // svg dimension
    let width = 960
    let height = 640

    let svg = d3.select('body')
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
      .style('margin-left', innerWidth / 3 + 'px')

    const positionUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv'

    d3.csv(positionUrl)
      .then(data => {

        const migrantData = data.map(d => {
          d['position'] = d['Location Coordinates']
            .split(',')
            .map(d => +d)
            .reverse()
          d['Total Dead and Missing'] = +d['Total Dead and Missing']
          return d
        })

        const coordinateData = migrantData.map(d => {
          const [x, y] = projection(d.position)
          d.lng = x
          d.lat = y
          return d
        })

        // console.log(cityCoord);
        // data column (long. , lat.)
        const xValue = d => d.lng
        const yValue = d => d.lat

        // radius
        const MaxRadius = 15
        const radiusValue = d => d['Total Dead and Missing']

        // scale for radius
        const radiusScale = d3.scaleSqrt()
          .domain([0, d3.max(coordinateData, radiusValue)])
          .range([0, MaxRadius])

        svg.append('g')
          .selectAll('circle')
          .data(coordinateData)
          .enter()
          .append('circle')
          .attr('r', (d) => radiusScale(radiusValue(d)))
          .attr('cx', xValue)
          .attr('cy', yValue)
          .attr('opacity', 0.5)
          .attr('fill', '#137880')

      })

  })