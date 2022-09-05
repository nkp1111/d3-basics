const url = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

d3.csv(url)
  .then(data => {

    const dataset = data.map(item => {
      // convert every digit string to number 
      item.petal_length = +item.petal_length
      item.petal_width = +item.petal_width
      item.sepal_width = +item.sepal_width
      item.sepal_length = +item.sepal_length
      return item
    })

    // console.log('initial-dataset: ', dataset)

    // svg dimension
    const width = 800
    const height = 400
    const margin = { top: 20, bottom: 55, left: 100, right: 20 }

    // main-dimension for svg-child element
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    // shorthand arrow function
    const xValue = d => d.sepal_length
    const yValue = d => d.sepal_width

    // label text
    const xAxisLabel = 'Sepal Length'
    const yAxisLabel = 'Sepal Width'

    // label text offset
    const xlabelOffset = 45
    const ylabelOffset = 38

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    // to apply margin
    const main = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // x-scale
    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, xValue))
      .range([0, innerWidth])
      .nice()

    // y-scale
    const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yValue))
      .range([0, innerHeight])

    // x-axis
    const xAxis = d3.axisBottom(xScale)
    main.append('g')
      .attr('class', 'tick')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis)

    // y-axis
    const yAxis = d3.axisLeft(yScale)
    main.append('g')
      .attr('class', 'tick')
      .call(yAxis)

    // x-axis tick marks- vertical lines
    main.append('g')
      .selectAll('line')
      .data(xScale.ticks())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${xScale(d)}, 0)`)
      .append('line')
      .attr('y2', innerHeight)
      .attr('stroke', '#c0c0bb')

    // y-axis tick marks- horizontal lines
    main.append('g')
      .selectAll('line')
      .data(yScale.ticks())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(0, ${yScale(d)})`)
      .append('line')
      .attr('x2', innerWidth)
      .attr('stroke', '#c0c0bb')

    // circle 
    main.append('g')
      .attr('class', 'mark')
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('cy', (d) => yScale(yValue(d)))
      .attr('cx', (d) => xScale(xValue(d)))
      .append('title')
      .text((d) => yScale(yValue(d)))
      .attr('fill', 'teal')

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

  })

