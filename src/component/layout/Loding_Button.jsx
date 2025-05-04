import React from 'react'

const Loding_Button = (props) => {
    return (
        <button type={props.type || "button"} onClick={props.onClick} className={`bg-gray-100 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:text-white text-black font-semibold px-5 py-2 rounded ${props.Addclass} ${props.loading && 'opacity-50 cursor-progress'}`}
            disabled={props.loading}>
            {props.loading ? 'Saving...' : props.Btn_Name}
        </button>
    )
}

export default Loding_Button
