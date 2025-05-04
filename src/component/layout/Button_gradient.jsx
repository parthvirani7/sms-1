import React from 'react'

const Button_gradient = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} className={`${props.Addclass} px-4 py-2 max-[426px]:px-3 max-[426px]:py-[6px] bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold shadow-lg hover:from-blue-400 hover:to-blue-800 transition duration-200 `}>
            {props.Btn_Name}
        </button>
    )
}

export default Button_gradient