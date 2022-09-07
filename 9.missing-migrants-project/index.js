const url = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv'

d3.csv(url)
  .then(data => {

    // time format
    const format = d3.timeFormat('%d/%m/%Y')

    const dataset = data.map(d => {
      d['Total Dead and Missing'] = +d['Total Dead and Missing']
      d['Reported Date'] = new Date(d['Reported Date'])
      return d
    })

    // console.log('initial data: ', dataset[0])

    // svg dimension
    const width = 800
    const height = 500
    const margin = { top: 20, bottom: 55, left: 85, right: 40 }

    // main-dimension for svg-child element
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    // shorthand arrow function
    const xValue = d => d['Reported Date']
    const yValue = d => d['Total Dead and Missing']

    // label text
    const xAxisLabel = 'Time'
    const yAxisLabel = 'Total Dead and Missing'

    // label text offset
    const xlabelOffset = 45
    const ylabelOffset = 55

    const circleRadius = 2

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
    //x-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((d) => format(d))

    main.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .attr('class', 'tick')
      .call(xAxis)

    const [start, stop] = xScale.domain()

    //bin 
    const binData = d3.bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(d3.timeMonths(start, stop))(dataset)
      .map(arr => {
        return {
          y: d3.sum(arr, yValue),
          x0: arr.x0,
          x1: arr.x1
        }
      })

    // y-scale
    const yScale = d3.scaleLinear()
      .domain(d3.extent(binData, (d) => d.y))
      .range([innerHeight, 0])
      .nice()
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
      .selectAll('rect')
      .data(binData)
      .enter()
      .append('rect')
      .attr('height', (d) => innerHeight - yScale(d.y))
      .attr('y', (d) => yScale(d.y))
      .attr('x', (d) => xScale(d.x0))
      .attr('width', (d) => xScale(d.x1) - xScale(d.x0))
      .append('title')
      .text((d) => d.y)

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


    d3.select('h1')
      .style('margin-left', innerWidth / 3 + 'px')
  })
