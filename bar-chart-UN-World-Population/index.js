const url = 'https://gist.githubusercontent.com/Tom-S82/1b76477754ddd9c379cfc00209e4d839/raw/65c8b7b38bbe2db900e6f1908b8df3cae048fc8e/UN_Population_Estimate_By_Country.csv'

d3.csv(url)
  .then(data => {
    const dataset = data.slice(0, 10) // for 10 most populated country
    const width = 800
    const height = 400
    const margin = { top: 20, bottom: 20, left: 20, right: 20 }

    // console.log(dataset[0]);

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => +d['2020'])])
      .range([0, width - margin.right - margin.left])

    const yScale = d3.scaleBand()
      .domain(dataset.map(d => d['Country']))
      .range([0, height - margin.bottom - margin.top])

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => yScale(d['Country']))
      .attr('width', (d) => xScale(+d['2020']))
      .attr('height', yScale.bandwidth())

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('line')
      .data(xScale.ticks())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${xScale(d)}, 0)`)
      .append('line')
      .attr('y2', height - margin.bottom - margin.top)
      .attr('stroke', 'black')
      .append('text')
      .text((d) => d)
      .attr('y', (d) => height - margin.bottom)


  })
