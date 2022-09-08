import React, { useRef } from 'react'
import useGlobalContext from '../context'
import { timeFormat, scaleTime, extent, axisBottom, bin, sum, scaleLinear, axisLeft, timeMonths, brushX, select } from 'd3'
import Axis from './Axis'
import Label from './Label'

function DateHistogram({ width, height }) {

  const { migrantData, margin, setBrushExtent, innerHeight, innerWidth, xValue, yValue } = useGlobalContext()

  const format = timeFormat('%d/%m/%Y')

  const xScale = scaleTime()
    .domain(extent(migrantData, xValue))
    .range([0, innerWidth])
    .nice()


  //x-axis
  const xAxis = axisBottom(xScale)
    .tickFormat((d) => format(d))

  const [start, stop] = xScale.domain()

  //bin 
  const binData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(migrantData)
    .map(arr => {
      return {
        y: sum(arr, yValue),
        x0: arr.x0,
        x1: arr.x1
      }
    })

  // y-scale
  const yScale = scaleLinear()
    .domain(extent(binData, (d) => d.y))
    .range([innerHeight, 0])
    .nice()
  const yAxis = axisLeft(yScale)

  const brushRef = useRef(null)
  React.useEffect(() => {
    const brush = brushX()
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on('brush end', (e) => {
        setBrushExtent(e.selection && e.selection.map(item => (xScale.invert(item))))
      })
    select(brushRef.current).call(brush)
  }, [innerWidth, innerHeight, xScale, setBrushExtent])

  return (
    <>
      <rect width={width} height={height} fill='white'></rect>
      <g className='histogram'
        transform={`translate(${margin.left}, ${margin.top})`}>
        <Label />
        <Axis xScale={xScale}
          yScale={yScale}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          xAxis={xAxis}
          yAxis={yAxis}
        />
        {binData.map((d, ind) => {
          return (
            <rect key={ind}
              x={xScale(d.x0)}
              y={yScale(d.y)}
              width={xScale(d.x1) - xScale(d.x0)}
              height={innerHeight - yScale(d.y)}
              fill='teal'
            >
              <title>{d.y}</title>
            </rect>
          )
        })}
        <g ref={brushRef}></g>
      </g>
    </>
  )
}

export default DateHistogram

