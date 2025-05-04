import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { GiMultipleTargets } from 'react-icons/gi';
import { FaPoll, FaStar } from 'react-icons/fa';
import { BiText, BiBarChartAlt2 } from 'react-icons/bi';
import { PostOwnpoll } from '../../../Api/api';

const CreatePoll = ({ closeCreatePoll, Fdata }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  // Helper function to format the date and time as dd-mm-yyyy hh:mm am/pm
  const formatDateTime = () => {
    const date = new Date();

    // Format the date parts
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Format the time parts
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert hour "0" to "12"

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${day}/${month}/${year} ${formattedTime}`;
  };

  // Set the current date and time when the component mounts
  useEffect(() => {
    const currentDateTime = formatDateTime();
    setValue('createdAt', currentDateTime); // set hidden field value
  }, [setValue]);

  const onSubmit = (data) => {
    PostOwnpoll(data, Fdata, closeCreatePoll);
    reset();
  };

  const options = [
    { value: 'multichoice', label: 'Multichoice polls', icon: <GiMultipleTargets /> },
    { value: 'ranking', label: 'Ranking polls', icon: <FaPoll /> },
    { value: 'rating', label: 'Rating polls', icon: <FaStar /> },
    { value: 'numeric', label: 'Numeric polls', icon: <BiBarChartAlt2 /> },
    { value: 'text', label: 'Text polls', icon: <BiText /> },
  ];

  const customOption = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="p-2 flex items-center cursor-pointer hover:bg-gray-100">
      {data.icon}
      <span className="ml-2">{data.label}</span>
    </div>
  );

  const handleSelectChange = (selectedOption) => {
    setValue('pollType', selectedOption.value, { shouldValidate: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Create Poll</h2>
        <hr />
        {/* Hidden Input for Author (if needed) */}
        <input type="hidden" {...register('author')} />

        {/* Hidden Input for Timestamp */}
        <input type="hidden" {...register('createdAt')} />

        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-black mb-2">
            Polls <span className="text-red-500">*</span>
          </label>
          <Select
            options={options}
            placeholder="Select Poll Type"
            onChange={handleSelectChange}
            components={{ Option: customOption }}
            className="basic-single"
          />
          {errors.pollType && <p className="text-red-500 text-sm mt-2">{errors.pollType.message}</p>}
        </div>

        {/* Question */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Question <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ask a question"
            {...register('question', { required: 'Question is required' })}
            className="border rounded w-full p-2"
          />
          {errors.question && <p className="text-red-500 text-sm mt-2">{errors.question.message}</p>}
        </div>

        {/* Option 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Option 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Add"
            {...register('option1', { required: 'Option 1 is required' })}
            className="border rounded w-full p-2"
          />
          {errors.option1 && <p className="text-red-500 text-sm mt-2">{errors.option1.message}</p>}
        </div>

        {/* Option 2 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Option 2 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Add"
            {...register('option2', { required: 'Option 2 is required' })}
            className="border rounded w-full p-2"
          />
          {errors.option2 && <p className="text-red-500 text-sm mt-2">{errors.option2.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-evenly">
          <button
            type="button"
            onClick={closeCreatePoll}
            className="px-14 py-2 bg-white text-black rounded-md hover:bg-gray-300 border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-14 py-2 text-black bg-gray-100 rounded-md font-semibold hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
