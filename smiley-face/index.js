/* Smiley face */

const side = 500
const width = side
const height = side
const StrokeWidth = 10
const faceColor = 'yellow'
const eyeRadius = 30
const eyeColor = 'black'
const eyeOffsetX = 100
const eyeOffsetY = -80
const centerX = width / 2
const centerY = height / 2

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${centerX}, ${centerY})`)

svg.append('circle')
  .attr('r', height / 2 - StrokeWidth / 2)
  .attr('fill', faceColor)
  .attr('stroke', 'black')
  .attr('stroke-width', StrokeWidth)

svg.append('circle')
  .attr('r', eyeRadius)
  .attr('cy', eyeOffsetY)
  .attr('fill', eyeColor)
  .attr('cx', - eyeOffsetX)

svg.append('circle')
  .attr('r', eyeRadius)
  .attr('cx', eyeOffsetX)
  .attr('cy', eyeOffsetY)
  .attr('fill', eyeColor)


const mouth = d3.arc()
  .innerRadius(140)
  .outerRadius(150)
  .startAngle(Math.PI * 1 / 2)
  .endAngle(Math.PI * 3 / 2)

svg.append('path')
  .attr('d', mouth)