import React from 'react'

function Lines({ xScale, innerHeight, innerWidth, yScale }) {
  return (
    <>
      <g>{xScale.ticks().map((tick, index) => {
        return <line key={index}
          transform={`translate(${xScale(tick)}, 0)`}
          y2={innerHeight}
          stroke='#c0c0bb'
        ></line>
      })}</g>
      <g>{yScale.ticks().map((tick, index) => {
        return <line key={index}
          transform={`translate(0, ${yScale(tick)})`}
          x2={innerWidth}
          stroke='#c0c0bb'
        ></line>
      })}</g>
    </>
  )
}

export default Lines
