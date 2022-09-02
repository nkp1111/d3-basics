const url = 'https://gist.githubusercontent.com/nkp1111/f76b8e2af492dd4fc0fe022821465547/raw/098ee80bd81621cd1effa3a2bbf0bc1768eab5fa/cssColor.csv'


// const fetchData = async (url) => {
//   const response = await fetch(url)
//   const data = await response.text()
//   const newArr = d3.csvParse(data)
// }

d3.csv(url).then(data => {
  const newArr = data
  const size = window.innerWidth / 10
  const textCoor = 25

  d3.select('body')
    .selectAll('svg')
    .data(newArr)
    .enter()
    .append('svg')
    .style('margin', '0')
    .attr('width', size)
    .attr('height', size)
    .style('background-color', (d) => d['hex-value'])
    // .style('background-color', (d) => d[1])
    .append('title')
    .text(d => d['keyword'])
    // .text(d => d[0])
    .attr('x', textCoor)
    .attr('y', textCoor)
    .style('font-weight', 700)
    .style('font-size', 30)
})

// fetchData(url)

