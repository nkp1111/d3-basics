import React from 'react'
import { select } from 'd3'

function Axis({ xScale, yScale, innerHeight, innerWidth, xAxis, yAxis }) {

  const xRef = React.useRef(null)
  const yRef = React.useRef(null)

  React.useEffect(() => {

    select(xRef.current).call(xAxis)
    select(yRef.current).call(yAxis)
  }, [xAxis, yAxis])

  return (
    <>
      <g className='tick'
      >
        {xScale.ticks().map((tick, ind) => {
          return (
            <line
              key={ind}
              transform={`translate(${xScale(tick)}, 0)`}
              y2={innerHeight}></line>
          )
        })}
      </g>
      <g ref={xRef}
        transform={`translate(0, ${innerHeight})`}></g>
      <g ref={yRef}></g>
      <g className='tick'
        ref={yRef}>
        {yScale.ticks().map((tick, ind) => {
          return (
            <line key={ind}
              transform={`translate(0, ${yScale(tick)})`}
              x2={innerWidth}></line>
          )
        })}
      </g>
    </>
  )
}

export default Axis
