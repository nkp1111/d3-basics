import React from 'react'

function Marks({ data,
  xScale,
  yScale,
  xValue,
  yValue,
  colorScale,
  colorValue,
  circleRadius }) {

  return (data.map((d, ind) => {

    return (<circle
      key={ind}
      r={circleRadius}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      className='mark'
    >
      <title>
        {ind}
      </title>
    </circle>)
  })
  )
}

export default Marks
