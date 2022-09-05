const url = 'https://gist.githubusercontent.com/Tom-S82/1b76477754ddd9c379cfc00209e4d839/raw/65c8b7b38bbe2db900e6f1908b8df3cae048fc8e/UN_Population_Estimate_By_Country.csv'

d3.csv(url)
  .then(data => {

    const dataset = data.slice(0, 10) // for 10 most populated country
    const width = 800
    const height = 400
    const margin = { top: 20, bottom: 60, left: 210, right: 20 }
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right
    const labelOffset = 40
    const xValue = d => +d['2020'] * 1000
    const yValue = d => d['Country']

    // console.log(dataset[0]);

    //formatting number
    const numberFormat = d3.format(".2s")

    // creating svg
    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    //x-scale
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, xValue)])
      .range([0, innerWidth])

    //y-scale
    const yScale = d3.scaleBand()
      .domain(dataset.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.17)

    // tick marks for x-axis(population) 
    const main = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // tick marks into lines
    main.selectAll('line')
      .data(xScale.ticks())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${xScale(d)}, 0)`)
      .append('line')
      .attr('y2', innerHeight)
      .attr('stroke', '#c0c0bb')

    // rectangle bars
    svg.append('g')
      .attr('class', 'mark')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => yScale(yValue(d)))
      .attr('width', (d) => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .append('title')
      .text((d) => numberFormat(xValue(d)).replace('G', 'B'))

    //population value text
    main.append('g')
      .attr('class', 'tick')
      .selectAll('text')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .data(xScale.ticks())
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${xScale(d)}, 0)`)
      .text((d) => numberFormat(d).replace('G', 'B'))
      .attr('y', innerHeight + 3)
      .attr('dy', '0.71em')

    // text for y-axis(country) 

    // console.log(yScale.domain())
    main.append('g')
      .attr('class', 'tick')
      .selectAll('text')
      .data(yScale.domain())
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(0, ${yScale(d)})`)
      .text(d => d)
      .attr('x', -3)
      .attr('y', (d) => yScale.bandwidth() / 2)
      .attr('dy', '0.32em')
      .style('text-anchor', 'end')

    main.append('text')
      .attr('class', 'axis-bottom')
      .text('Population')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + labelOffset)

  })
