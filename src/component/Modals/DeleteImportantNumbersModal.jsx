import React, { useState } from 'react'
import { ImportantNumbersDelete } from '../services/Api/api'
import Close_Button from '../layout/CloseButton';


const DeleteImportantNumbersModal = ({ _id, ClosedeleteContact, contacts, setContacts }) => {

    const [loading, setLoading] = useState(false);

    const deletedata = () => {
        setLoading(true)
        ImportantNumbersDelete(_id, contacts, setContacts, ClosedeleteContact, setLoading)
    }
    return (
        <div
            className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
            onClick={(e) => { if (e.target === e.currentTarget) ClosedeleteContact(); }}>
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Delete Complain?</h1>
                </div>
                <div className="p-5">
                    <p className='text-md text-[#a7a7a7]'>Are you sure you want to delete this Complain?</p>
                    <div className="flex justify-end mt-4">
                        <Close_Button
                            Addclass='w-1/2'
                            onClick={ClosedeleteContact}
                            CloseName='Cancel'
                        />
                        <button onClick={deletedata} className={`bg-[#e74c3c] hover:bg-orange-600 text-white w-1/2 font-semibold py-1 rounded-lg text-sm ${loading && 'opacity-50 cursor-not-allowed cursor-progress'}`} disabled={loading}>
                            {loading ? 'Deleteing...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteImportantNumbersModal
