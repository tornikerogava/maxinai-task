import {useEffect, useState} from "react"
import './index.scss'
import Table from "./components/table"
import Modal from 'react-modal'
import {useDispatch, useSelector} from "react-redux"
import {fetchUserList, getCurrentPageUsers, changePage, deleteUser, editUser} from "./store/actions/actions"


function App() {
    const [data, setData] = useState<User[]>([])
    const [columns, setColumns] = useState<any>([])
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    const [currentEdit, setCurrentEdit] = useState<User>()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState<number>()

    const dispatch = useDispatch()
    const allUsers = useSelector((state: any) => state.reducer.allUsers)
    const perPage = useSelector((state: any) => state.reducer.usersPerPage)
    const currentPage = useSelector((state: any) => state.reducer.currentPage)
    const currentPageUsers = useSelector((state: any) => state.reducer.currentPageUsers)

    interface User {
        id: number
        first_name: string
        last_name: string
        email: string
    }

    useEffect(() => {
        dispatch(fetchUserList())
        setColumns(
            [{
                Header: 'ID',
                accessor: 'id',
            }, {
                Header: 'First Name',
                accessor: 'first_name',
            }, {
                Header: 'Last Name',
                accessor: 'last_name',
            }, {
                Header: 'Email',
                accessor: 'email',
            }]
        )
    }, [])

    useEffect(() => {
        dispatch(getCurrentPageUsers(allUsers, currentPage, perPage))
        setNumberOfPages(Math.ceil(allUsers.length / perPage))
    }, [allUsers, currentPage])


    const getUserByID = (id: number) => {
        let index = 0

        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id === id) {
                index = i
                break
            }
        }
        return allUsers[index]
    }

    const onEdit = (id: number) => {
        const user = getUserByID(id)
        setCurrentEdit(user)
        setEditModalIsOpen(true)
    }

    const onDelete = (id: number) => {
        const user = getUserByID(id)
        setCurrentEdit(user)
        setDeleteModalOpen(true)
    }


    ///////// MODAL
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    let subtitle: any


    function afterOpenModal() {
        subtitle.style.color = '#f00'
    }

    function closeModal() {
        setEditModalIsOpen(false)
        setDeleteModalOpen(false)
    }

    //// MODAL END


    return (
        <div className="container">
            <div className="app">
                <Table
                    onEdit={onEdit}
                    onDelete={onDelete}
                    usersColumns={columns}
                    usersData={currentPageUsers}
                />
                <div className="page-buttons">
                    <button className="page-buttons__prev" disabled={currentPage == 1} onClick={() => dispatch(changePage(currentPage - 1))}>prev</button>
                   <div className="page-buttons__numbers">
                       {
                           [...Array(numberOfPages).keys()].map((i) => {

                               return <button className="page-buttons__numbers__number" disabled={currentPage === i + 1}
                                              onClick={() => dispatch(changePage(i + 1))}>{i + 1}</button>
                           })
                       }
                   </div>
                    <button className="page-buttons__next" disabled={currentPage == numberOfPages}
                            onClick={() => dispatch(changePage(currentPage + 1))}>next
                    </button>
                </div>

                {currentEdit && (
                    <Modal
                        isOpen={editModalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Edit Modal"
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
                        <button onClick={() => closeModal()}>cancel</button>
                        <button onClick={() => {
                            if (!currentEdit.first_name.length || !currentEdit.last_name.length || !currentEdit.email.length) {
                                alert("Please Fill in All Fields")
                            } else {
                                dispatch(editUser(currentEdit))
                                closeModal()
                            }
                        }}>Save
                        </button>
                    </Modal>)}

                    <Modal
                        isOpen={deleteModalOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Delete Modal"
                    >
                        <h2 ref={_subtitle => (subtitle = _subtitle)}>Delete User?</h2>
                        <h3> {currentEdit?.first_name} {currentEdit?.last_name}</h3>

                        <button onClick={() => closeModal()}>cancel</button>
                        <button onClick={() => {
                            dispatch(deleteUser(currentEdit?.id))
                            closeModal()
                        }}>Delete
                        </button>

                    </Modal>
            </div>

        </div>
    )
}

export default App
