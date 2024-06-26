import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Add from '@mui/icons-material/Add';
import { Card } from "../../components/Card";
import { styled } from '@mui/material/styles';
import { addProduct, fetchProduct, modifiedProduct, removeProduct } from "../../feature/ProductSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Statistics } from '../../components/statistics';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 10,
});

const Product = () => {
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');

    const Product = useSelector(state => state.Product);

    const handleAddProductReport = () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("quantity", quantity);
        formData.append("type", type);
        formData.append("image", image);

        dispatch(addProduct({ formData: formData }))
            .then(toast.success('product added'))
            .catch();
        setOpen(false);

    }


    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch])



    const openUpdateDialog = (product) => {
        setName(product.name);
        setQuantity(product.quantity);
        setType(product.type);
        setId(product.id);
        setOpenUpdateModal(true);
    };
    const handleUpdateTask = () => {




        const formData = new FormData();

        formData.append("name", name);
        formData.append("quantity", quantity);
        formData.append("type", type);
        formData.append("image", image);
        formData.append('_method', 'PUT');

        formData.append("id", id);

        dispatch(modifiedProduct({ formData, id }))
            .then(toast.success('product modified successfully'));
        setOpen(false);
    }


    const handleDelete = (id) => {
        dispatch(removeProduct(id))
            .then(toast.success('product deleted successfully'));
        dispatch(fetchProduct());

    }


    return (
        <div className="">
            <Statistics />
            <ToastContainer />

            <div className='pt-12 grid gap-4 md:gap-8 grid-cols-1 rounded-lg '>

                <div className="align-middle inline-block min-w-full shadow overflow-hidden dark:bg-[#343338] shadow-dashboard px-8 pt-3  rounded-lg pb-3">
                    <div className='flex justify-between mb-6 mt-2'>
                        <h1 className='font-bold text-2xl  dark:text-white'>All Products </h1>
                        <React.Fragment>
                            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-900"
                                variant="outlined"
                                color="neutral"
                                startDecorator={ <Add /> }
                                onClick={ () => setOpen(true) }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Add Product</span>
                            </button>
                            <Modal open={ open } onClose={ () => setOpen(false) } className='container mx-auto bg'>
                                <ModalDialog className='w-[900px] dark:bg-[#343338]'>
                                    <h1 className='text-center font-bold text-4xl text-white'>Create new Program</h1>
                                    <div className="w-full mx-auto">
                                        <form className="dark:bg-[#343338] shadow-md rounded px-8 pt-6 pb-8 mb-4" encType="multipart/form-data">
                                            <div className="mb-4">
                                                <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                                                    Name
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="name" type="text" placeholder="Product Name"

                                                    onChange={ (e) => setName(e.target.value) }
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-white text-sm font-bold mb-2" htmlFor="quantity">
                                                    Quantity
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="quantity" type="number" placeholder="Quantity"


                                                    onChange={ (e) => setQuantity(e.target.value) } />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-white text-sm font-bold mb-2" htmlFor="type">
                                                    Type
                                                </label>
                                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="type"
                                                    onChange={ (e) => setType(e.target.value) }

                                                >
                                                    <option value="" disabled>Select Type</option>
                                                    <option value="Herbicide">Herbicide</option>
                                                    <option value="Insecticide">Insecticide</option>
                                                    <option value="Fungicide">Fungicide</option>
                                                    <option value="Nematicide">Nematicide</option>
                                                </select>
                                            </div>


                                            <div className='mb-6 w-full'>
                                                <Button
                                                    component="label"
                                                    role={ undefined }
                                                    variant="contained"
                                                    name="image" accept="image/*"
                                                    tabIndex={ -1 }
                                                    startIcon={ <CloudUploadIcon /> }
                                                    onChange={ (e) => setImage(e.target.files[0]) }
                                                >
                                                    Upload file
                                                    <VisuallyHiddenInput type="file" />
                                                </Button>

                                            </div>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                                                    onClick={ handleAddProductReport }


                                                >
                                                    Create Product
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </ModalDialog>
                            </Modal>
                        </React.Fragment>
                    </div>
                    <table className="w-full dark:bg-[#343338]">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-900 dark:text-white tracking-wider">#</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-900 dark:text-white tracking-wider">Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-900 dark:text-white tracking-wider">Quantity</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-900 dark:text-white tracking-wider">Type</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-900 dark:text-white tracking-wider">Action</th>

                            </tr>
                        </thead>
                        <tbody className="w-full">

                            {
                                Product.productList.map((product) => (
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">

                                            <div class="2 flex ">
                                                <div class="">
                                                    <div class="flex items-center">
                                                        <div class="w-48 flex items-center justify-center">
                                                            { product.image && <img src={ product.image.path } alt="image" /> }
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5 text-gray-900 dark:text-white">{ product.name }</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5 text-gray-900 dark:text-white">{ product.quantity }</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5 text-gray-900 dark:text-white">{ product.type }</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-900 dark:text-white text-sm leading-5  ">

                                            <div className='flex'>
                                                <button
                                                    className=" flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-green-500 dark:bg-green-900"
                                                    variant="outlined"
                                                    color="neutral"
                                                    onClick={ () => openUpdateDialog(product) }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                                <Modal open={ openUpdateModal } onClose={ () => setOpenUpdateModal(false) }>
                                                    <ModalDialog className='w-[900px] dark:bg-[#343338]'>
                                                        <h1 className='text-center font-bold text-4xl text-white'>Update Product</h1>
                                                        <div className="w-full mx-auto">
                                                            <form className="dark:bg-[#343338] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                                                <div className="mb-4">
                                                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                                                                        Name
                                                                    </label>
                                                                    <input
                                                                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                                                                        id="name"
                                                                        type="text"
                                                                        placeholder="Product Name"
                                                                        value={ name }
                                                                        onChange={ (e) => setName(e.target.value) }
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="quantity">
                                                                        Quantity
                                                                    </label>
                                                                    <input
                                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                                                                        id="quantity"
                                                                        type="number"
                                                                        placeholder="Quantity"
                                                                        value={ quantity }
                                                                        onChange={ (e) => setQuantity(e.target.value) }
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="type">
                                                                        Type
                                                                    </label>
                                                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" id="type"
                                                                        onChange={ (e) => setType(e.target.value) }

                                                                    >
                                                                        <option value="" disabled>Select Type</option>
                                                                        <option value="Herbicide">Herbicide</option>
                                                                        <option value="Insecticide">Insecticide</option>
                                                                        <option value="Fungicide">Fungicide</option>
                                                                        <option value="Nematicide">Nematicide</option>
                                                                    </select>
                                                                </div>


                                                                <div className='mb-6 w-full'>
                                                                    <Button
                                                                        component="label"
                                                                        role={ undefined }
                                                                        variant="contained"
                                                                        name="image" accept="image/*"
                                                                        tabIndex={ -1 }
                                                                        startIcon={ <CloudUploadIcon /> }
                                                                        onChange={ (e) => setImage(e.target.files[0]) }
                                                                    >
                                                                        Upload file
                                                                        <VisuallyHiddenInput type="file" />
                                                                    </Button>

                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <button
                                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                        type="button"
                                                                        onClick={ handleUpdateTask }
                                                                    >
                                                                        Update Product
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </ModalDialog>
                                                </Modal>

                                                <button className=" flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-900 ml-3"

                                                    onClick={ () => handleDelete(product.id) }

                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>


                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }




                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Product
