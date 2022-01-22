import {useEffect, useState} from "react"
import './index.scss'
import Table from "./components/Table"
import Modal from 'react-modal'
import {useDispatch, useSelector} from "react-redux"
import {fetchUserList, getCurrentPageUsers, changePage, deleteUser, editUser} from "./store/actions/actions"


function App() {
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


    //this fetches the entire list of users and saves it to a store, I only do this to be able to edit and save
    //the users, since there is no backend
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


    // this fetches the actual batch of users that is displayed on the current page
    useEffect(() => {
        window.scrollTo(0, 0)
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
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    function closeModal() {
        setEditModalIsOpen(false)
        setDeleteModalOpen(false)
    }

    //// MODAL END
    const pagesArray = [...Array(numberOfPages).keys()]


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
                    <button className="page-buttons__prev" disabled={currentPage === 1}
                            onClick={() => dispatch(changePage(currentPage - 1))}>prev
                    </button>
                    <div className="page-buttons__numbers">
                        {
                            pagesArray.map((i,) => {
                                return <button key={i+1}
                                               className="page-buttons__numbers__number"
                                               disabled={currentPage === i + 1}
                                               onClick={() => dispatch(changePage(i + 1))}>{i + 1}</button>
                            })
                        }
                    </div>
                    <button className="page-buttons__next" disabled={currentPage === numberOfPages}
                            onClick={() => dispatch(changePage(currentPage + 1))}>next
                    </button>
                </div>

                {currentEdit && (
                    <Modal
                        isOpen={editModalIsOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Edit Modal"
                        ariaHideApp={false}
                    >
                        <h2 className="modal__title edit-modal__title">Edit User</h2>
                        <div className="edit-modal__inputs">
                            <div className="edit-modal__input-container">
                                <label className="edit-modal__label">First Name</label>
                                <input
                                    className="edit-modal__input"
                                    type="text"
                                    value={currentEdit.first_name}
                                    onChange={(e) => {
                                        setCurrentEdit({...currentEdit, first_name: e.target.value})
                                    }}
                                />
                            </div>
                            <div className="edit-modal__input-container">
                                <label className="edit-modal__label">Last Name</label>
                                <input
                                    className="edit-modal__input"
                                    type="text"
                                    value={currentEdit.last_name}
                                    onChange={(e) => {
                                        setCurrentEdit({...currentEdit, last_name: e.target.value})
                                    }}
                                />
                            </div>
                            <div className="edit-modal__input-container">
                                <label className="edit-modal__label">Email</label>
                                <input
                                    className="edit-modal__input"
                                    type="text"
                                    value={currentEdit.email}
                                    onChange={(e) => {
                                        setCurrentEdit({...currentEdit, email: e.target.value})
                                    }}
                                />
                            </div>
                        </div>
                        <div className="modal__buttons edit-modal__buttons">
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
                        </div>
                    </Modal>)}
                <Modal
                    isOpen={deleteModalOpen}
                    onRequestClose={closeModal}
                    style={modalStyles}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Delete Modal"
                    ariaHideApp={false}

                >
                    <h2 className="modal__title delete-modal__title">Delete User?</h2>
                    <h3 className="delete-modal__user"> {currentEdit?.first_name} {currentEdit?.last_name}</h3>
                    <div className="modal__buttons delete-modal__buttons">
                        <button onClick={() => closeModal()}>cancel</button>
                        <button onClick={() => {
                            dispatch(deleteUser(currentEdit?.id))
                            closeModal()
                        }}>Delete
                        </button>
                    </div>
                </Modal>
            </div>

        </div>
    )
}

export default App
