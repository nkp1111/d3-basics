const data = {
  nodes: [
    { id: 'Neeraj', gender: 'male' },
    { id: 'Ram', gender: 'male' },
    { id: 'Rita', gender: 'female' },
    { id: 'Surya', gender: 'male' },
    { id: 'Gita', gender: 'female' },
    { id: 'Sachin', gender: 'male' },
    { id: 'Kalpana', gender: 'female' },
    { id: 'Neha', gender: 'female' },
    { id: 'Vishal', gender: 'female' },
  ],
  links: [
    { source: 'Neeraj', target: 'Ram' },
    { source: 'Rita', target: 'Sachin' },
    { source: 'Surya', target: 'Vishal' },
    { source: 'Sachin', target: 'Ram' },
    { source: 'Neeraj', target: 'Neha' },
    { source: 'Kalpana', target: 'Vishal' },
    { source: 'Kalpana', target: 'Ram' },
    { source: 'Vishal', target: 'Gita' },
    { source: 'Gita', target: 'Rita' },
  ]
}

const width = 600
const height = 400
const radius = 10

let tooltip = d3.select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)

const createElement = (data) => {

  svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(data.links)
    .enter()
    .append('line')
    .attr('stroke', 'black')


  svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('r', radius)
    .attr('fill', d => {
      return d.gender === 'male' ? 'blue' : 'red'
    })
    .on('mouseenter', (e, d) => {
      const x = e.pageX + 'px'
      const y = e.pageY + 'px'
      const html = d.id
      tooltip.style('opacity', 0.9)
        .html(html)
        .style('top', y)
        .style('left', x)
    })
    .on('mouseleave', (d) => {
      tooltip.style('opacity', 0)
        .html('')
    })
}

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

createElement(data)

let simulation = d3.forceSimulation()
  .force('links', d3.forceLink().id(d => d.id))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2))

simulation.nodes(data.nodes)
  .on('tick', d => {
    updateElement()
  })

simulation.force('links').links(data.links)

const updateElement = () => {
  d3.select('.nodes')
    .selectAll('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)

  d3.select('.links')
    .selectAll('line')
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
}
