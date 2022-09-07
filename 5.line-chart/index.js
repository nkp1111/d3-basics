const url = 'https://gist.githubusercontent.com/curran/60b40877ef898f19aeb8/raw/9476be5bd15fb15a6d5c733dd79788fb679c9be9/week_temperature_sf.csv'

d3.csv(url)
  .then(data => {

    // time format
    const format = d3.timeFormat('%a')

    const dataset = data.map(d => {
      d.temperature = +d.temperature
      d.timestamp = new Date(d.timestamp)
      return d
    })

    // console.log('initial data: ', dataset, format(dataset[0]['timestamp']))

    // svg dimension
    const width = 800
    const height = 500
    const margin = { top: 20, bottom: 55, left: 80, right: 20 }

    // main-dimension for svg-child element
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    // shorthand arrow function
    const xValue = d => d.timestamp
    const yValue = d => d.temperature

    // label text
    const xAxisLabel = 'Time'
    const yAxisLabel = 'Temperature'

    // label text offset
    const xlabelOffset = 45
    const ylabelOffset = 38

    const circleRadius = 0

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    // apply margin
    const main = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // x-scale
    const xScale = d3.scaleTime()
      .domain(d3.extent(dataset, xValue))
      .range([0, innerWidth])
      .nice()

    // y-scale
    const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yValue))
      .range([innerHeight, 0])
      .nice()

    //x-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((d) => format(d))

    main.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .attr('class', 'tick')
      .call(xAxis)

    // y-axis 
    const yAxis = d3.axisLeft(yScale)

    main.append('g')
      .attr('class', 'tick')
      .call(yAxis)

    //tick lines for x-axis vertical lines
    main.append('g')
      .attr('class', 'tick')
      .selectAll('line')
      .data(xScale.ticks())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${xScale(d)}, 0)`)
      .append('line')
      .attr('y2', innerHeight)

    //tick lines for y-axis horizontal lines
    main.append('g')
      .attr('class', 'tick')
      .selectAll('line')
      .data(yScale.ticks())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(0, ${yScale(d)})`)
      .append('line')
      .attr('x2', innerWidth)

    // circle
    main.append('g')
      .attr('class', 'mark')
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('r', circleRadius)
      .attr('cy', (d) => yScale(yValue(d)))
      .attr('cx', (d) => xScale(xValue(d)))
      .append('title')
      .text((d) => `(${xValue(d)}, ${yValue(d)})`)

    // x-axis label
    main.append('text')
      .attr('class', 'label')
      .text(xAxisLabel)
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + xlabelOffset)

    // y-axis label
    main.append('text')
      .attr('class', 'label')
      .text(yAxisLabel)
      .attr('transform', `translate(${-ylabelOffset}, ${innerHeight / 2}) rotate(-90)`)

    // line - path
    const line = d3.line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(d3.curveNatural)

    main.append('path')
      .attr('class', 'line-path')
      .datum(dataset)
      .attr('d', line)


    d3.select('h1')
      .style('margin-left', innerWidth / 2 + 'px')
  })

