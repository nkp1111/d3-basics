const worldUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

d3.json(worldUrl)
  .then(data => {

    // console.log('intial_data: ', data);
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

    const cityUrl = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv'

    d3.csv(cityUrl)
      .then(data => {

        const cityData = data.map(d => {
          d.lat = +d.lat
          d.lng = +d.lng
          d.population = +d.population
          return d
        })

        // console.log(cityData);
        const cityCoord = cityData.map(d => {
          const [x, y] = projection([d.lng, d.lat])
          d.lng = x
          d.lat = y
          return d
        })

        // data column (long. , lat.)
        const xValue = d => d.lng
        const yValue = d => d.lat

        // radius
        const MaxRadius = 15
        const radiusValue = d => d.population

        // scale for radius
        const radiusScale = d3.scaleSqrt()
          .domain([0, d3.max(cityCoord, radiusValue)])
          .range([0, MaxRadius])

        svg.append('g')
          .selectAll('circle')
          .data(cityCoord)
          .enter()
          .append('circle')
          .attr('r', (d) => radiusScale(radiusValue(d)))
          .attr('cx', xValue)
          .attr('cy', yValue)
          .attr('opacity', 0.5)
          .attr('fill', '#137880')

      })

  })