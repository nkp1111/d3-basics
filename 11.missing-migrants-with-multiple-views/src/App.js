import React from "react";
import useGlobalContext from './context'
import BubbleMap from './BubbleMap'
import DateHistogram from './DateHistogram'

function App() {
  const { width, height, margin, histogramSizeRatio } = useGlobalContext()
  return (
    <>
      <h3 style={{ marginLeft: '5em' }}>Missing Migrants with multiple views</h3>
      <svg width={width}
        height={height}>
        <g className='mark'>
          <BubbleMap />
          <g transform={`translate(${margin.left}, ${height - height * histogramSizeRatio})`}>
            <DateHistogram width={width}
              height={height} />
          </g>
        </g>
      </svg>
    </>
  )
}

export default App;
