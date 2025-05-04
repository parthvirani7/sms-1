import React from 'react'

const ShowMaintenanceDetails = (props) => {
    return (
        <div className={`flex relative lg:items-center md:items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm max-[425px]:flex-col-reverse max-[425px]:content-start mr-5 max-[768px]:mr-0 ${props.Addclass}`}>
            <div className={`absolute left-0 top-[15px] bottom-[15px] w-2 rounded-r-lg ${props.totle_Noch}`}></div>
            <div>
                <p className="text-lg font-medium">{props.total_title}</p>
                <p className={`text-2xl font-bold text-gray-800 max-[365px]:text-lg ${props.textclass}`}>₹ {props.total_price}</p>
            </div>
        </div>
    )
}

export default ShowMaintenanceDetails
