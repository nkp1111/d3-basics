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

    console.log('initial-dataset: ', dataset)
    // data contains: petal_length, petal_width, sepal_length, sepal_width, species

    const width = 800
    const height = 400
    const margin = { top: 20, bottom: 20, left: 50, right: 20 }
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right
    const labelOffset = 40
    const xValue = d => d.petal_width
    const yValue = d => d.petal_length

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    // x-scale
    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, xValue))
      .range([0, innerWidth])

    // y-scale
    const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yValue))
      .range([0, innerHeight])

    // x-axis
    const xAxis = d3.axisBottom(xScale)

    // y-axis
    const yAxis = d3.axisLeft(yScale)

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${innerHeight})`)
      .call(xAxis)

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', d => xScale(xValue(d)))
      .attr('cy', d => yScale(yValue(d)))

    svg.append('g')
      .selectAll('line')
      .data()


  })