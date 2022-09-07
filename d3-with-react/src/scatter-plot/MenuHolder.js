import React from 'react'
import Dropdown from '../working-with-select/Dropdown'


const MenuHolder = ({
  width,
  attributes,
  xAttribute,
  setXAttribute,
  yAttribute,
  setYAttribute
}) => {

  return (
    <div className='menu-holder'
      style={{ width }}>
      <div className='menu-item'>
        <label htmlFor="x-value">X: </label>
        <Dropdown
          options={attributes}
          id='x-value'
          selectedOption={xAttribute}
          setSelectedOption={setXAttribute}
        />
      </div>
      <div className='menu-item'>
        <label htmlFor="y-value">Y: </label>
        <Dropdown
          options={attributes}
          id='y-value'
          selectedOption={yAttribute}
          setSelectedOption={setYAttribute}
        />
      </div>
    </div>
  )
}

export default MenuHolder
