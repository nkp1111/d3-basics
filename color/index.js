const url = 'https://gist.githubusercontent.com/nkp1111/f76b8e2af492dd4fc0fe022821465547/raw/098ee80bd81621cd1effa3a2bbf0bc1768eab5fa/cssColor.csv'


// const fetchData = async (url) => {
//   const response = await fetch(url)
//   const data = await response.text()
//   const newArr = d3.csvParse(data)
// }

d3.csv(url).then(data => {
  const newArr = data
  const width = window.innerWidth / 2
  const height = window.innerHeight
  const recHeight = height / newArr.length

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  svg.selectAll('rect')
    .data(newArr)
    .enter()
    .append('rect')
    .attr('width', width)
    .attr('height', recHeight)
    .attr('x', 0)
    .attr('y', (d, i) => i * recHeight)
    .attr('fill', (d) => d['RGB hex value'])

  const svg2 = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const pieArc = d3.arc()
    .innerRadius(0)
    .outerRadius(width / 2)

  svg2.append('g')
    .style('transform', 'translate(50%, 50%)')
    .selectAll('path')
    .data(newArr)
    .enter()
    .append('path')
    .attr('d', (d, i) => pieArc({
      startAngle: i / newArr.length * 2 * Math.PI,
      endAngle: (i + 1) / newArr.length * 2 * Math.PI
    }))
    .attr('fill', (d) => d['RGB hex value'])
})

// fetchData(url)

