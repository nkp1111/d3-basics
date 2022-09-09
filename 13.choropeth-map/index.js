const worldUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

d3.json(worldUrl)
  .then(data => {

    // console.log('intial_data: ', data);
    const { countries, land } = data.objects

    const dataset = topojson.feature(data, countries)
    let projection = d3.geoEqualEarth()
    const path = d3.geoPath(projection)
    const graticule = d3.geoGraticule()
    let interiors = topojson.mesh(data, countries, (a, b) => a !== b)

    // svg dimension
    let width = 960
    let height = 640

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

    // Map: to convert country code to country id
    const countryCodeUrl = 'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv'
    let countryCodeMap = new Map()
    d3.csv(countryCodeUrl)
      .then(data => {
        data.forEach(item => {
          countryCodeMap.set(item['country-code'], item['alpha-3'])
        })
      })

    const aidsInfoUrl = 'https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv'
    d3.csv(aidsInfoUrl)
      .then(data => {

        let selectedYear = '2017'
        const aidsData = data.map(d => {
          d.aids = +d['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)']
          return d
        })

        const missingDataColor = 'gray'
        const filteredData = aidsData.filter(d => d['Year'] === selectedYear ? d : '')

        // Since aidsInfoUrl only contains country name and code
        // and worldUrl only contains country id and name(different in some cases)
        const countryCodeToData = new Map()
        filteredData.forEach(item => {
          countryCodeToData.set(item.Code, item)
        })

        const colorValue = d => d.aids
        const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
          .domain([0, d3.max(filteredData, colorValue)])

        main.append('g')
          .selectAll('path')
          .data(dataset.features)
          .enter()
          .append('path')
          .attr('class', 'countries')
          .attr('d', (d) => path(d))
          .attr('fill', (d) => {
            const countryId = d.id
            const countryCode = countryCodeMap.get(countryId)
            const countryData = countryCodeToData.get(countryCode)
            return countryData ? colorScale(colorValue(countryData)) : missingDataColor
          })

        main.append('path')
          .attr('d', path(interiors))
          .attr('class', 'interiors')

        // to center heading
        d3.select('h1')
          .style('margin-left', innerWidth / 4 + 'px')
      })
  })