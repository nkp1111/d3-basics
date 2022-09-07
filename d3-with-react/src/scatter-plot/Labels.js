import React from 'react'

function XLabel({ innerHeight, innerWidth, xAxisLabel, xlabelOffset }) {
  return (
    <text
      className='label'
      x={innerWidth / 2}
      y={innerHeight + xlabelOffset}>
      {xAxisLabel}
    </text>
  )
}

function YLabel({ innerHeight, innerWidth, yAxisLabel, ylabelOffset }) {
  return (
    <text
      className='label'
      transform={`translate(${-ylabelOffset}, ${innerHeight / 2}) rotate(-90)`}>
      {yAxisLabel}
    </text>
  )
}
export { XLabel, YLabel }
