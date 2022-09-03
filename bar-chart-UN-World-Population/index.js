const url = 'https://gist.githubusercontent.com/Tom-S82/1b76477754ddd9c379cfc00209e4d839/raw/65c8b7b38bbe2db900e6f1908b8df3cae048fc8e/UN_Population_Estimate_By_Country.csv'

d3.csv(url)
  .then(data => {
    const dataset = data.slice(0, 10) // for 10 most populated country
    const width = 800
    const height = 400
    const margin = { top: 50, bottom: 50, left: 50, right: 50 }

    console.log(dataset[0]);

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => +d['2020'])])
      .range([0, width - margin.right])

    const yScale = d3.scaleBand()
      .domain(dataset.map(d => d['Country']))
      .range([0, height - margin.bottom])

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



  })
