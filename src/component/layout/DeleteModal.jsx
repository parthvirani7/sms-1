import React from 'react'
import CloseBtn from './CloseButton'

const DeleteModal = (props) => {
    return (
        <div
            className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
            onClick={(e) => { if (e.target === e.currentTarget) props.close(); }}>
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Delete Complain?</h1>
                </div>
                <div className="p-5">
                    <p className='text-md text-[#a7a7a7]'>Are you sure you want to delete this Complain?</p>
                    <div className="flex justify-end mt-4">
                        <CloseBtn
                            type="button"
                            onClick={props.close}
                            CloseName='Cancel'
                            Addclass='w-1/2'
                        />
                        <button
                            onClick={props.DeleteClick}
                            className="bg-[#e74c3c] hover:bg-orange-600 text-white w-1/2 font-semibold py-1 rounded-lg text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
