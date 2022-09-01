/***************************************
 * Start of svg2
 */

/* Assign all the variables */
const side = 300
const width = side
const height = side
const StrokeWidth = 10
const faceColor = 'yellow'
const eyeRadius = 30
const eyeColor = 'black'
const eyeOffsetX = width / 3 - 20
const eyeOffsetY = - width / 5 + 20
const centerX = width / 2
const centerY = height / 2
const mouthWidth = 10
const mouthRadius = 100

const mouthOffset = 30
const svg2 = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

svg2.append('circle')
  .attr('cx', centerX)
  .attr('cy', centerY)
  .attr('r', 100)
  .attr('fill', 'yellow')

// black circle as eye
svg2.append('circle')
  .attr('cx', centerX + eyeOffsetX / 2)
  .attr('cy', centerY + eyeOffsetY)
  .attr('r', 20)
  .attr('fill', 'black')
svg2.append('circle')  // white center 
  .attr('cx', centerX + eyeOffsetX / 2)
  .attr('cy', centerY + eyeOffsetY)
  .attr('r', 10)
  .attr('fill', 'white')
  .attr('class', 'blink')


// black circle as eye
svg2.append('circle')
  .attr('cx', centerX - eyeOffsetX / 2)
  .attr('cy', centerY + eyeOffsetY)
  .attr('r', 20)
  .attr('fill', 'black')
svg2.append('circle')// white center 
  .attr('cx', centerX - eyeOffsetX / 2)
  .attr('cy', centerY + eyeOffsetY)
  .attr('r', 10)
  .attr('fill', 'white')
  .attr('class', 'blink')

const mouth2 = d3.arc()
  .innerRadius(mouthRadius - mouthOffset)
  .outerRadius(mouthRadius + mouthWidth - mouthOffset)
  .startAngle(Math.PI * 0.5)
  .endAngle(Math.PI * 1.5)

const beard = d3.arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius + mouthWidth + 15)
  .startAngle(Math.PI * 0.5)
  .endAngle(Math.PI * 1.5)

svg2.append('g')
  .attr('transform', `translate(${centerX}, ${centerY})`)
  .append('path')
  .attr('d', mouth2)

svg2.append('g')
  .attr('transform', `translate(${centerX}, ${centerY})`)
  .append('path')
  .attr('d', beard)
