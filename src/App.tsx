import {useEffect, useState} from "react"
import Table from "./components/table"
import Modal from 'react-modal';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserList} from "./api/user-list-api";


// TODO: are you sure you want to delete this user prompt
// TODO: reload the current batch of users when a user gets deleted
// TODO: thunk
// TODO: add pages to the table
// TODO: edit modal
// TODO: responsiveness
// TODO: styling - (center it on desktop)
// TODO: cache changes?
// TODO: must fill out all fields

interface User {
    id: string
    first_name: string
    last_name: string
    email: string
}


function App() {
    const [data, setData] = useState<User[]>([])
    const [columns, setColumns] = useState<any>([])


    const dispatch = useDispatch()


    const testaaa = useSelector((state: any) => state.reducer.data);


    useEffect(() => {
        dispatch(fetchUserList())
        setColumns(
            [{
                Header: 'First Name',
                accessor: 'first_name',
            }, {
                Header: 'Last Name',
                accessor: 'last_name',
            }, {
                Header: 'Email',
                accessor: 'email',
            }]

        );

    }, [])





    // const [paginationData, setPaginationData] = useState({offset: 0, limit: 20});

    // useEffect(() => {
    //     fetchData(paginationData.offset, paginationData.limit);
    // }, [paginationData])

    // const fetchMore = () => {
    //     setPaginationData((prevState) => ({
    //         ...prevState,
    //         offset: prevState.offset + prevState.limit,
    //     }))
    // }

    const onEdit = (id: string) => {
        let index = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                index = i;
                break;
            }
        }
        openModal(data[index])
    }

    const onDelete = (id: string) => {
        setData((prevState) => prevState.filter((profile) => id !== profile.id));
    }




    /////////
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    let subtitle: any;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentEdit, setCurrentEdit] = useState<User>();

    function openModal(edit: User) {
        setCurrentEdit(edit);
        setIsOpen(true);


    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const test = () => {
        axios.get("/data/im-a-real-api.json").then(response => {
            console.log(response.data)
        })
    }

    return (
        <div className="App">
            <Table
                onEdit={onEdit}
                onDelete={onDelete}
                usersColumns={columns}
                usersData={testaaa}
            />
            <button onClick={test}>test</button>
            {currentEdit &&( <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit User</h2>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={currentEdit.first_name}
                        onChange={(e) => {
                            setCurrentEdit({...currentEdit, first_name: e.target.value})
                        }}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={currentEdit.last_name}
                        onChange={(e) => {
                            setCurrentEdit({...currentEdit, last_name: e.target.value})
                        }}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={currentEdit.email}
                        onChange={(e) => {
                            setCurrentEdit({...currentEdit, email: e.target.value})
                        }}
                    />
                </div>
                <button onClick={() => {
                    setData((prevState) => {
                        const newData = prevState.map((profile) => {
                            if (profile.id === currentEdit.id) {
                                return currentEdit
                            }
                            return profile
                        })
                        return newData
                    })
                    closeModal()
                }}>Save</button>
            </Modal>)}

        </div>
    );
    // return (
    //     <div className="App">
    //         {data[0] ? (
    //             <Table
    //                 onEdit={onEdit}
    //                 onDelete={onDelete}
    //                 usersColumns={columns}
    //                 usersData={data}
    //             />
    //         ) : "Loading..."}
    //         <Modal
    //             isOpen={modalIsOpen}
    //             onAfterOpen={afterOpenModal}
    //             onRequestClose={closeModal}
    //             style={customStyles}
    //             contentLabel="Example Modal"
    //         >
    //             <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
    //             <button onClick={()=>console.log(currentEdit)}>close</button>
    //             <div>I am a modal</div>
    //             <div>{currentEdit.id}</div>
    //
    //             <form>
    //                 <input />
    //
    //             </form>
    //         </Modal>
    //     </div>
    // )
}

export default App