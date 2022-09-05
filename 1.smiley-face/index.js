/* Smiley face */

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

/* Created an svg element inside body */

/***************************************
 * Start of svg1
 */
const svg1 = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')  // grouped every element inside to transform it at the center of svg1 
  .attr('transform', `translate(${centerX}, ${centerY})`)

svg1.append('circle')
  .attr('r', height / 2 - StrokeWidth / 2)
  .attr('fill', faceColor)
  .attr('stroke', 'black')
  .attr('stroke-width', StrokeWidth)

svg1.append('circle')
  .attr('r', eyeRadius)
  .attr('cy', eyeOffsetY)
  .attr('fill', eyeColor)
  .attr('cx', - eyeOffsetX)

svg1.append('circle')
  .attr('r', eyeRadius)
  .attr('cx', eyeOffsetX)
  .attr('cy', eyeOffsetY)
  .attr('fill', eyeColor)

// arc method to create arc
const mouth = d3.arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius + mouthWidth)
  .startAngle(Math.PI * 1 / 2)  // at top position at 0
  .endAngle(Math.PI * 3 / 2)

console.log(mouth)
// path element to create path 
svg1.append('path')
  .attr('d', mouth)


/***************************************
* End of svg1
*/

