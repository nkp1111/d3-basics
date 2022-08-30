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

// path element to create path 
svg1.append('path')
  .attr('d', mouth)


/***************************************
* End of svg1
*/


/* 
Since arc are created with respect to top-left position at (0,0)
So whole face has to shift to align face to its place

Alternatively 
the g element can be created only for path element 
and move to required place
*/

/***************************************
 * Start of svg2
 */

const mouthOffset = 30
const svg2 = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

svg2.append('circle')
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('r', 100)
  .attr('fill', 'yellow')

// black circle as eye
svg2.append('circle')
  .attr('cx', width / 2 + eyeOffsetX / 2)
  .attr('cy', height / 3)
  .attr('r', 20)
  .attr('fill', 'black')
svg2.append('circle')  // white center 
  .attr('cx', width / 2 + eyeOffsetX / 2)
  .attr('cy', height / 3)
  .attr('r', 10)
  .attr('fill', 'white')
  .attr('class', 'blink')


// black circle as eye
svg2.append('circle')
  .attr('cx', width / 2 - eyeOffsetX / 2)
  .attr('cy', height / 3)
  .attr('r', 20)
  .attr('fill', 'black')
svg2.append('circle')// white center 
  .attr('cx', width / 2 - eyeOffsetX / 2)
  .attr('cy', height / 3)
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

/***************************************
* End of svg1
*/