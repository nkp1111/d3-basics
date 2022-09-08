import React, { useState } from "react";
import { csv, json, geoEqualEarth, geoPath, geoGraticule, scaleSqrt, max, } from 'd3'
import { feature, mesh } from 'topojson'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  // svg dimension
  const width = 960
  const height = 640
  const margin = { top: 0, bottom: 70, left: 45, right: 70 }
  const histogramSizeRatio = 0.4
  const innerHeight = (height * histogramSizeRatio) - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const xlabelOffset = 35
  const ylabelOffset = 55

  const worldUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'
  const positionUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv'

  const [worldData, setWorldData] = useState('')
  const [positionData, setPositionData] = useState('')
  const [brushExtent, setBrushExtent] = useState('')

  const xValue = d => d['Reported Date']
  const xAxisLabel = 'Time'

  const yValue = d => d['Total Dead and Missing']
  const yAxisLabel = 'Total Dead and Missing'

  const MaxRadius = 15
  const radiusValue = d => d['Total Dead and Missing']

  React.useEffect(() => {
    json(worldUrl)
      .then(data => {
        setWorldData(data)
      })

    csv(positionUrl)
      .then(data => {
        setPositionData(data)
      })
  }, [])


  if (!worldData || !positionData) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  // World data 
  const { countries, land } = worldData.objects
  const dataset = feature(worldData, land)
  let projection = geoEqualEarth()
  const path = geoPath(projection)
  const interiors = mesh(worldData, countries, (a, b) => a !== b)
  const graticule = geoGraticule()

  // position data
  const migrantData = positionData.map(d => {
    d['position'] = d['Location Coordinates']
      .split(',')
      .map(d => +d)
      .reverse()
    d['Total Dead and Missing'] = +d['Total Dead and Missing']
    d['Reported Date'] = new Date(d['Reported Date'])
    return d
  })


  const filteredData = brushExtent
    ? migrantData.filter(d => {
      const date = xValue(d)
      return date > brushExtent[0] && date < brushExtent[1]
    })
    : migrantData

  const coordinateData = filteredData.map(d => {
    const [x, y] = projection(d.position)
    d.lng = x
    d.lat = y
    return d
  })

  // scale for radius
  const radiusScale = scaleSqrt()
    .domain([0, max(coordinateData, radiusValue)])
    .range([0, MaxRadius])

  return (
    <AppContext.Provider
      value={{
        width,
        height,
        innerHeight,
        innerWidth,
        dataset,
        path,
        projection,
        interiors,
        graticule,
        coordinateData,
        xValue,
        yValue,
        radiusScale,
        radiusValue,
        migrantData,
        histogramSizeRatio,
        margin,
        setBrushExtent,
        xlabelOffset,
        ylabelOffset,
        xAxisLabel,
        yAxisLabel
      }}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return React.useContext(AppContext)
}

export default useGlobalContext
export { AppProvider }