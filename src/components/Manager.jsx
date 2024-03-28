import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ url: "", username: "", password: "" })
    const [passwordsArray, setpasswordsArray] = useState([])
    const [button, setbutton] = useState("Save")

    useEffect(() => {
        let password = localStorage.getItem("passwords");
        if (password) {
            setpasswordsArray(JSON.parse(password));
        }
    }, [])


    const showPassword = () => {

        if (ref.current.src.includes("icons/hide.png")) {
            passwordref.current.type = "text"
            ref.current.src = "icons/open.png"
        } else {
            passwordref.current.type = "password"
            ref.current.src = "icons/hide.png"
        }

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = () => {
        if (form.url != "" && form.username != "" && form.password != "") {
            setpasswordsArray([...passwordsArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]))
            setform({ url: "", username: "", password: "" })
            if (button == 'Edit') {
                setbutton('Save')
            }
        } else {
            alert("Enter the values")
        }
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const editPassword = (id) => {
        if (button == 'Save') {
            setbutton('Edit')
            setform(passwordsArray.filter(i => i.id === id)[0])
            setpasswordsArray(passwordsArray.filter(i => i.id != id))
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you want to delete it?")
        if (c) {
            setpasswordsArray(passwordsArray.filter(i => i.id != id))
            localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(i => i.id != id)))
        }
    }

    return (
        <>
            <ToastContainer />
            <div className=" inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                </div></div>
            <div className="p-2 md:mycontainer">

                <h1 className='text-2xl font-bold text-center'>
                    &lt;SecureKey/&gt;
                </h1>
                <p className='text-lg text-center'>Your own password manager</p>

                <div className="flex flex-col p-4 gap-8 items-center">


                    <input value={form.url} onChange={handleChange} placeholder='Enter website URL' className='rounded-full p-4 py-1 w-full border border-purple-400 ' name="url" type="text" />

                    <div className="flex flex-col md:flex-row w-full gap-8 ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full p-4 py-1 border border-purple-400 w-full' name="username" type="text" />


                        <div className="relative w-full">
                            <input value={form.password} ref={passwordref} onChange={handleChange} placeholder='Enter password' className='rounded-full p-4 py-1 border border-purple-400 w-full' name="password" type="password" />
                            <span className='p-0.5 absolute right-2 top-[4.5px] cursor-pointer hover:bg-gray-200 rounded-full'>
                                {form.password != "" && <img className='' ref={ref} src="icons/hide.png" width={22} alt="img" onClick={showPassword} />}
                            </span>
                        </div>


                    </div>

                    <button className='flex justify-center items-center border border-purple-400 bg-purple-200 hover:bg-purple-100 rounded-full w-fit px-6 p-1 gap-2' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        {button}</button>
                </div>
                <div className="passwords overflow-x-auto">
                        <h1 className='font-bold text-2xl py-4'>Your passwords</h1>
                        {passwordsArray.length === 0 && <div className='px-6 p-2'> No passwords to show </div>}
                        {passwordsArray.length != 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden">
                                <thead className='bg-purple-200'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-purple-50'>
                                    {passwordsArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className='py-2 px-10 border border-white'>

                                                <div className='flex items-center justify-center'>

                                                    <a className="hover:text-blue-500" href={item.url} target='_blank'>
                                                        <span className='truncate'> 
                                                        {item.url}
                                                        </span>
                                                        </a>
                                                    

                                                    <img className='ml-2 w-5 cursor-pointer' src="icons/copy.png" alt="copy" onClick={() => { copyText(item.url) }} />
                                                   

                                                </div>

                                            </td>
                                            <td className='p-2 border border-white text-center max-w-32'>
                                            <div className='flex items-center justify-center'>
                                                   <span className='truncate'> {item.username}</span>
                                                    <img className='ml-2 w-5 cursor-pointer' src="icons/copy.png" alt="copy" onClick={() => { copyText(item.username) }} />
                                               </div>

                                            </td>

                                            <td className='p-2 border border-white text-center max-w-32'>
                                                <div className='flex items-center justify-center'>
                                                   <span className='truncate'> {item.password}</span>
                                                    <img className='ml-2 w-5 cursor-pointer' src="icons/copy.png" alt="copy" onClick={() => { copyText(item.password) }} />
                                                </div>

                                            </td>
                                            <td className='p-2 border border-white text-center'>

                                                <div className='flex items-center justify-center md:gap-6 gap-2'>
                                                    <img className='w-5 cursor-pointer' src="icons/edit.png" alt="edit" onClick={() => { editPassword(item.id) }} />
                                                    <img className='w-5 cursor-pointer' src="icons/bin.png" alt="trash" onClick={() => { deletePassword(item.id) }} />
                                                </div>

                                            </td>
                                        </tr>
                                    }
                                    )}

                                </tbody>
                            </table>}
                    </div>
            </div>

        </>
    )
}

export default Manager