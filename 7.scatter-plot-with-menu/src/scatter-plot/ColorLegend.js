import React from 'react'

function ColorLegend({
  colorScale,
  circleRadius,
  tickSpacing = 30,
  legendXOffset = 20,
  onHover,
  hoveredValue,
  fadeOpacity
}) {
  return (
    <>
      {colorScale.domain().map((species, ind) => {
        return (
          <g
            transform={`translate(-20, ${tickSpacing * (ind + 1)})`}
            className='legend'
            onMouseEnter={() => onHover(species)}
            onMouseOut={() => onHover(null)}
            key={ind}
            opacity={hoveredValue && species !== hoveredValue ? fadeOpacity : 1}
          >
            <circle
              r={circleRadius}
              fill={colorScale(species)}
            ></circle>
            <text
              x={legendXOffset}
              dy='0.32em'>{species}</text>
          </g>
        )
      })
      }
    </>
  )
}

export default ColorLegend
