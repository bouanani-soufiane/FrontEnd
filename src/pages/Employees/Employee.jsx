import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { fetchUser } from '../../store/UserSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Statistics } from "../../components/statistics";
import { addTask } from "../../feature/TaskSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NoData } from '../../components/NoData';

const Employee = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { UserList } = useSelector(state => state.user);

    const [name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [DateStart, setDateStart] = useState("");
    const [DateEnd, setDateEnd] = useState("");
    const [Status, setStatus] = useState("Pending");
    const [employee_id, setEmployee_id] = useState("");
    const [TypeTask, setTypeTask] = useState("");
    const [role, setRole] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchUser())


    }, []);
    const handleAssignTaskClick = (userId, role) => {
        setOpen(true);
        setEmployee_id(userId);
        setRole(role);


        console.log(role);
    }
    const formatDate = (date) => {
        let year = date.getFullYear();
        let month = (`0${date.getMonth() + 1}`).slice(-2);
        let day = (`0${date.getDate()}`).slice(-2);
        let hours = (`0${date.getHours()}`).slice(-2);
        let minutes = (`0${date.getMinutes()}`).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const today = new Date();
    const minDate = formatDate(today);


    const validate = () => {
        let tempErrors = {};
        let now = new Date();
        tempErrors.name = name ? "" : "Name is required";
        if (!Description) tempErrors.Description = "Description is required";

        let startDate = new Date(DateStart);
        let endDate = new Date(DateEnd);

        if (!DateStart || startDate < now) tempErrors.DateStart = "DateStart is invalid";

        if (!DateEnd || endDate < now) tempErrors.DateEnd = "DateEnd is invalid";


        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    }


    const handleAddTask = (e) => {

        e.preventDefault();
        if (!validate()) return;
        dispatch(addTask(

            {
                name: name,
                Description: Description,
                DateStart: DateStart,
                DateEnd: DateEnd,
                Status: Status,
                TypeTask: TypeTask,
                employee_id: employee_id,
            }


        )).then(toast.success('Task added successfully!'))
        setOpen(false);


    }

    return (
        <div className="">

            <ToastContainer />
            <Statistics />
            <div className='pt-12 grid gap-4 md:gap-8 grid-cols-1 '>

                <div className="align-middle inline-block min-w-full shadow overflow-hidden dark:bg-[#343338] shadow-dashboard px-8 pt-3  rounded-lg pb-12">
                    <h1 className='font-bold text-2xl mb-8 mt-2 dark:text-white'>All Employees </h1>
                    <div className='flex'>
                        {
                            UserList?.length <= 0 && (<NoData name="Employee" />)
                        }
                    </div>
                    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {
                            UserList.map((user) => (

                                <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                    <div class="flex w-full items-center justify-between space-x-6 p-6">
                                        <div class="flex-1 truncate">
                                            <div class="flex items-center space-x-3">
                                                <span class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500">{ user.role }</span>
                                            </div>
                                            <h1 class="mt-3   text-gray-900"> name : <span className='font-bold'>{ user.name }</span></h1>
                                            <p class="mt-1 truncate text-sm text-gray-500">{ user.email }</p>
                                        </div>
                                        <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2023-10/231015-Yahya-Sinwar-Hamas-mb-0731-95501d.jpg" alt="" />
                                    </div>
                                    <div>
                                        <div class="flex justify-center items-center content-center p-3">

                                            <div class=" flex w-0 flex-1">
                                                <React.Fragment>
                                                    <button className="flex items-center justify-center  px-5 py-2 mx-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none font-semibold"
                                                        variant="outlined"
                                                        color="neutral"
                                                        onClick={ () => handleAssignTaskClick(user.id, user.role) }>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className='mx-2'>assign task  </span>
                                                    </button>
                                                    <Modal open={ open } onClose={ () => setOpen(false) } className='container mx-auto bg'>
                                                        <ModalDialog className='w-[700px]  dark:bg-[#343338]'>
                                                            <h1 className='text-center font-bold text-4xl dark:text-white'>Assign new task</h1>
                                                            <div className="w-full mx-auto">
                                                                <form className="dark:bg-[#343338] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                                                    <div className="mb-4">
                                                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="Title">
                                                                            Title
                                                                        </label>
                                                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="Title" type="text" placeholder="Title" name="name" onChange={ (e) => {
                                                                            setName(e.target.value);
                                                                        } } />

                                                                        { errors.name && <p className="text-red-500 text-xs mt-1"> { errors.name }</p> }

                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="Description">
                                                                            Description
                                                                        </label>
                                                                        <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="Description" type="text" placeholder="Description" name="Description" onChange={ (e) => {
                                                                            setDescription(e.target.value);
                                                                        } } />
                                                                        { errors.Description && <p className="text-red-500 text-xs mt-1"> { errors.Description }</p> }
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="stock">
                                                                            Date Start
                                                                        </label>
                                                                        <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="stock"
                                                                            min={ minDate }
                                                                            type="datetime-local" name="DateStart" placeholder="date start" onChange={ (e) => {
                                                                                setDateStart(e.target.value);
                                                                            } } />
                                                                        { errors.DateStart && <p className="text-red-500 text-xs mt-1"> { errors.DateStart }</p> }
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="stock">
                                                                            Date End
                                                                        </label>
                                                                        <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="stock"
                                                                            min={ minDate } type="datetime-local" name="DateEnd" placeholder="date end" onChange={ (e) => {
                                                                                setDateEnd(e.target.value);
                                                                            } } />

                                                                        { errors.DateEnd && <p className="text-red-500 text-xs mt-1"> { errors.DateEnd }</p> }
                                                                    </div>
                                                                    {
                                                                        role !== 'Magazinier' &&

                                                                        <div className="mb-4">
                                                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="type">
                                                                                Type
                                                                            </label>
                                                                            <select className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="type" name="TypeTask" onChange={ (e) => {
                                                                                setTypeTask(e.target.value);
                                                                            } } >
                                                                                <option value="" disabled>Select Type</option>
                                                                                <option value="Traitement">Traitement</option>
                                                                                <option value="Surviance">Surviance</option>
                                                                                <option value="Irrigation">Irrigation</option>
                                                                                <option value="Fertigation">Fertigation</option>
                                                                            </select>

                                                                            { errors.TypeTask && <p className="text-red-500 text-xs mt-1"> { errors.role }</p> }
                                                                        </div>

                                                                    }


                                                                    <input type="hidden" name="Status" value="Pending" />
                                                                    <input type="hidden" name="employee_id" value={ employee_id } />

                                                                    <div className="flex items-center justify-between">
                                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={ (e) => handleAddTask(e) }
                                                                        >
                                                                            Assign task
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>

                                                        </ModalDialog>
                                                    </Modal>
                                                </React.Fragment>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }





                    </ul>

                </div>
            </div>
        </div>

    )
}

export default Employee
