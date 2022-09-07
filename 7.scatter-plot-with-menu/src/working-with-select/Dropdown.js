import React from 'react'

const Dropdown = ({ options,
  id,
  selectedOption,
  setSelectedOption
}) => {
  return (
    <select
      name="pets"
      id={id}
      onChange={(e) => setSelectedOption(e.target.value)}
      value={selectedOption}>
      {options.map(option => {
        const { label, value } = option
        return <option
          key={value}
          value={value}
        >{label}</option>
      })}
    </select>
  )
}

export default Dropdown
