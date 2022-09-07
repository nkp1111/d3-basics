import React from 'react'
import { select, scaleLinear, scaleOrdinal, extent, axisBottom, axisLeft } from 'd3'
import Marks from './Marks'
import Lines from './Lines'
import { XLabel, YLabel } from './Labels'
import MenuHolder from './MenuHolder'
import ColorLegend from './ColorLegend'


function SVG({ width, height, data }) {

  const margin = { top: 20, bottom: 55, left: 100, right: 190 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  // taken from data
  const attributes = [
    { value: 'sepal_length', label: 'Sepal Length' },
    { value: 'sepal_width', label: 'Sepal Width' },
    { value: 'petal_length', label: 'Petal Length' },
    { value: 'petal_width', label: 'Petal Width' },
    { value: 'species', label: 'Species' },
  ]

  const getLabel = (label) => {
    for (let i = 0; i < attributes.length; i++) {
      if (label === attributes[i].value) {
        return attributes[i].label
      }
    }
  }

  // x-axis
  const initialXValue = 'sepal_length'
  const [xAttribute, setXAttribute] = React.useState(initialXValue)
  const xValue = d => d[xAttribute]
  const xAxisLabel = getLabel(xAttribute)
  const xlabelOffset = 45

  // y-axis
  const initialYValue = 'sepal_width'
  const [yAttribute, setYAttribute] = React.useState(initialYValue)
  const yValue = d => d[yAttribute]
  const yAxisLabel = getLabel(yAttribute)
  const ylabelOffset = 40

  const [hoveredValue, setHoveredValue] = React.useState(null)

  // console.log(hoveredValue)
  const colorValue = d => d.species

  const filteredData = data.filter(d => hoveredValue === colorValue(d))

  const circleRadius = 7
  const fadeOpacity = 0.2

  // legend
  const legendYOffset = 20 // between circle and text
  const legendXOffset = 20 // between circle and text
  const legendBlockXOffset = 70 // moves whole legends element together towards right
  const legendBlockYOffset = 20 // moves whole legends element together towards bottom
  const legendText = 'Species'

  // x-scale
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()
  const xAxis = axisBottom(xScale)
  select('.x-axis')
    .call(xAxis)

  // y-scale
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice()
  const yAxis = axisLeft(yScale)
  select('.y-axis')
    .call(yAxis)

  // color-scale
  const colorScale = scaleOrdinal()
    .domain(data.map(d => d.species))
    .range(['#E6842A', '#137B80', ' #8E6C8A'])

  return (
    <>
      <MenuHolder {...{
        width,
        attributes,
        xAttribute,
        setXAttribute,
        yAttribute,
        setYAttribute
      }} />
      <svg width={width}
        height={height}>

        <g
          transform={`translate(${margin.left}, ${margin.top})`}>

          {/* axisBottom */}
          <g className='tick x-axis'
            transform={`translate(0, ${innerHeight})`}
          >
          </g>
          {/* axisLeft */}
          <g className='tick y-axis'>
          </g>

          <Lines
            xScale={xScale}
            yScale={yScale}
            innerHeight={innerHeight}
            innerWidth={innerWidth} />

          {/* Legend */}
          <g className='legend'
            transform={`translate(${innerWidth + legendBlockXOffset}, ${legendBlockYOffset})`}>
            <text className='label'>{legendText}</text>
            <ColorLegend
              colorScale={colorScale}
              colorValue={colorValue}
              circleRadius={circleRadius}
              tickSpacing={legendYOffset}
              legendXOffset={legendXOffset}
              onHover={(species) => setHoveredValue(species)}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>

          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={data}
              xScale={xScale}
              xValue={xValue}
              yScale={yScale}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              circleRadius={circleRadius} />
          </g>

          <Marks
            data={filteredData}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            circleRadius={circleRadius} />

          <XLabel
            {...{ innerHeight, innerWidth, xAxisLabel, xlabelOffset }} />
          <YLabel
            {...{ innerHeight, innerWidth, yAxisLabel, ylabelOffset }} />
        </g>
      </svg >
    </>
  )
}

export default SVG
