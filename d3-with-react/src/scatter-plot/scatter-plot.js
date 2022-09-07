import React from 'react'
import { csv } from 'd3'
import SVG from './SVG'

const ScatterPlot = () => {

  const url = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

  const [data, setData] = React.useState([])
  // console.log('initial-dataset: ', data)
  const width = 800
  const height = 400

  React.useEffect(() => {
    csv(url)
      .then(data => {

        const dataset = data.map(item => {
          // convert every digit string to number 
          item.petal_length = +item.petal_length
          item.petal_width = +item.petal_width
          item.sepal_width = +item.sepal_width
          item.sepal_length = +item.sepal_length
          return item
        })

        setData(dataset)
      })
  }, [])

  return (
    <>
      <SVG width={width}
        height={height}
        data={data} />
    </>
  )
}

export default ScatterPlot







