/* Smiley face */
import React from 'react'

const width = 500
const height = 500
const StrokeWidth = 5
const faceRadius = height / 2 - StrokeWidth / 2
const faceColor = 'yellow'
const eyeRadius = 50
const eyeColor = 'black'
const eyeOffset = 100

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

svg.append('circle')
  .attr('r', faceRadius)
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('fill', faceColor)
  .attr('stroke', 'black')
  .attr('stroke-width', 5)

svg.append('circle')
  .attr('r', eyeRadius)
  .attr('cy', height / 3)
  .attr('fill', eyeColor)
  .attr('cx', width / 2 - eyeOffset)

svg.append('circle')
  .attr('r', eyeRadius)
  .attr('cx', width / 2 + eyeOffset)
  .attr('cy', height / 3)
  .attr('fill', eyeColor)

console.log(React);
console.log(ReactDOM);


