import React from 'react'

const CloseButton = (props) => {
  return (
    <button type={props.type} onClick={props.onClick} className={`bg-white border rounded-lg font-semibold text-gray-700 px-4 py-2 mr-2  hover:bg-[#f0f5fb] ${props.Addclass}`}>
        {props.CloseName}
    </button>
  )
}

export default CloseButton
