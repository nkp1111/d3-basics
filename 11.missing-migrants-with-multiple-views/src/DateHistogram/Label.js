import React from 'react'
import useGlobalContext from '../context'


function Label() {

  const { innerWidth,
    innerHeight,
    xlabelOffset,
    ylabelOffset,
    xAxisLabel,
    yAxisLabel } = useGlobalContext()

  return (
    <>
      <text x={innerWidth / 2}
        y={innerHeight + xlabelOffset}
        className='label'>{xAxisLabel}</text>
      <text transform={`translate(${-ylabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        className='label'>{yAxisLabel}</text>
    </>
  )
}

export default Label
