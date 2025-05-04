
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { FaEdit, FaFileImage, FaFilePdf, FaTrashAlt } from 'react-icons/fa';
import { FaSquarePlus } from 'react-icons/fa6';
import AddExpenseForm from '../../../../Modals/AddExpenseForm';
import { DeleteExpense, GetExpanse } from '../../../../services/Api/api';
import { GrFormView } from 'react-icons/gr';
import EditExpensesModal from '../../../../Modals/EditExpensesModal';
import ViewExpenseModal from '../../../../Modals/ViewExpenseModal';
import DeleteModal from '../../../../layout/DeleteLoding';
import useSidbarTogal from '../../../../layout/useSidbarTogal';

const Expense = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);

  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen })

  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);


  // Add
  const [AddExpense, setAddExpense] = useState(false);
  const [loadingExpenses, setloadingExpenses] = useState(false)
  const Open = () => setAddExpense(true);
  const Close = () => setAddExpense(false);

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = async () => {
    setloadingExpenses(true)
    setError(null);
    GetExpanse((data) => {
      if (data && Array.isArray(data)) {
        setExpenses(data);
        setloadingExpenses(false)
      } else {
        setError('Failed to load data or data is invalid.');
      };
    });
  };

  // view

  const [View, setView] = useState(false);
  const [ViewId, setViewId] = useState('')

  const ViewOpen = (_id) => {
    setView(true);
    setViewId(_id)
  };

  const CloseView = () => setView(false);

  // Delete 

  const [Remove, setRemove] = useState(false);
  const [RemoveId, setRemoveId] = useState('')
  const RemoveView = () => {
    setRemove(false)
  };
  const [loading, setLoading] = useState(false);


  const RemoveOpen = (_id) => {
    setRemove(true);
    setRemoveId(_id)
  }

  const DeleteExpanse = () => {
    setLoading(true)
    DeleteExpense(RemoveId, Fdata, RemoveView, setLoading)
  }

  // Edit

  const [EditData, setEditData] = useState(false);
  const [EditId, setEditId] = useState('')

  const EditOpen = (_id) => {
    setEditData(true)
    setEditId(_id)
  };
  const CloseForm = () => setEditData(false);

  return (
    <div>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getdata}px] max-[425px]:ml-0`}>
        <Header toggleNav={toggleNav} />
        <div className="p-4 md:p-8 bg-slate-100">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 md:mb-6 p-4">
              <h1 className="text-xl lg:text-2xl font-semibold">Add Expenses Details</h1>
              <button
                className="bg-blue-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-blue-800 text-md md:text-base flex items-center"
                onClick={Open}
              >
                <FaSquarePlus className="mr-2 text-sm" /> Add
              </button>
              {AddExpense && <AddExpenseForm Fdata={Fdata} setAddExpense={Close} />}
            </div>
            {error}
            <div className="p-4 bg-white rounded-lg shadow-lg overflow-auto max-h-svh">
              {loadingExpenses ? (
                <div className='flex justify-center'>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
              ) : (
                
                <table className="min-w-full bg-[#eef1fd] rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b font-medium text-left">
                    Title
                    </th>
                    <th className="px-6 py-3 border-b font-medium ">
                    Description
                    </th>
                    <th className="px-6 py-3 border-b font-medium ">
                    Date
                    </th>
                    <th className="px-6 py-3 border-b font-medium ">
                    Amount
                    </th>
                    <th className="px-6 py-3 border-b font-medium ">
                    Bill Format
                    </th>
                    <th className="px-6 py-3 border-b font-medium ">
                    Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {expenses.map((expense, index) => (
                      <tr key={index} className="border-b bg-white hover:bg-gray-50 font-medium text-center md:font-semibold overflow-x-scroll">
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 text-start">{expense.Title}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{expense.Description}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 text-center">{new Date(expense.Date).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-green-500 text-center">₹ {expense.Amount}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">
                          {expense.format === 'PDF' ? (
                            <span className="flex items-center space-x-1 justify-center">
                              <FaFilePdf className="text-red-500 bg-slate-200 w-4 md:w-6 h-4 md:h-6 py-1 rounded-sm" />
                              <span>PDF</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1 justify-center">
                              <FaFileImage className="text-blue-500 bg-slate-200 w-4 md:w-6 h-4 md:h-6 py-1 rounded-sm" />
                              <span>JPG</span>
                            </span>
                          )}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex space-x-2 md:space-x-2 justify-center">
                          <button aria-label="Edit" onClick={() => EditOpen(expense._id)} className="text-green-500 p-1">
                            <FaEdit />
                          </button>

                          <button aria-label="View" onClick={() => ViewOpen(expense._id)} className="text-blue-500 text-2xl rounded">
                            <GrFormView />
                          </button>

                          <button aria-label="Delete" onClick={() => RemoveOpen(expense._id)} className="text-red-500 p-1">
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                    }
                </tbody>
              </table>
              )}

              {EditData && <EditExpensesModal _id={EditId} lodData={Fdata} Close={CloseForm} />}
              {View && <ViewExpenseModal _id={ViewId} Close={CloseView} />}
              {Remove && <DeleteModal loading={loading} close={RemoveView} DeleteClick={DeleteExpanse} />}
            </div>
          </div >
        </div >
      </div >
    </div >
  );
};

export default Expense;
