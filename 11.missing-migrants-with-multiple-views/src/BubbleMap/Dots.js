import React from 'react'
import useGlobalContext from '../context'

function Dots() {

  const { coordinateData, radiusScale, radiusValue } = useGlobalContext()

  return (
    <>
      {coordinateData.map((position, ind) => {
        return (
          <circle key={ind}
            r={radiusScale(radiusValue(position))}
            cx={position.lng}
            cy={position.lat}
            opacity='0.5'>
          </circle>
        )
      })}
    </>
  )
}

export default Dots


