import React from 'react'

function ColorLegend({
  colorScale,
  circleRadius,
  tickSpacing = 30,
  legendXOffset = 20,
  onHover,
}) {
  return (
    <>
      {colorScale.domain().map((color, ind) => {
        return (
          <g
            transform={`translate(-20, ${tickSpacing * (ind + 1)})`}
            className='legend'
            onMouseEnter={() => onHover(color)}
            key={ind}
          >
            <circle
              r={circleRadius}
              fill={colorScale(color)}
            ></circle>
            <text
              x={legendXOffset}
              dy='0.32em'>{color}</text>
          </g>
        )
      })
      }
    </>
  )
}

export default ColorLegend
