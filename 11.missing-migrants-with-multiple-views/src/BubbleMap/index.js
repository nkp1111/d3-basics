import React, { useMemo } from 'react'
import useGlobalContext from '../context'
import Dots from './Dots'

function WorldAtlas() {

  const { path, dataset, graticule, interiors } = useGlobalContext()

  return (
    <>
      {useMemo(() => {
        return <>
          <path className='sphere'
            d={path({ type: 'Sphere' })}>
          </path>
          <path className='graticules'
            d={path(graticule())}>
          </path>
        </>
      }, [path, graticule])}

      <g>
        {dataset.features.map((feature, ind) => {
          return (
            <path key={ind}
              className='land'
              d={path(feature)}>
            </path>
          )
        })}
      </g>
      <Dots />
      {useMemo(() => {
        return <path className='interiors'
          d={path(interiors)}></path>
      }, [path, interiors])}

    </>
  )
}

export default WorldAtlas

