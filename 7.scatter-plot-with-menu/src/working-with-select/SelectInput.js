import React, { useState } from 'react'
import Dropdown from './Dropdown'

function SelectInput() {

  const options = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'parrot', label: 'Parrot' },
    { value: 'spider', label: 'Spider' },
    { value: 'goldfish', label: 'Goldfish' },
  ]

  const initialVal = 'hampster'
  const [selectedOption, setSelectedOption] = useState(initialVal)

  console.log(selectedOption);
  return (
    <div>
      <label htmlFor="pet-select">Choose a pet: </label>
      <Dropdown
        options={options}
        id='pet-select'
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption} />
    </div>
  )
}

export default SelectInput
