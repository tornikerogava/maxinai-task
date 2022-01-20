import {useEffect, useState} from "react"
import Papa from "papaparse"
import Table from "./components/table"


interface User {
    id: string
    first_name: string
    last_name: string
    email: string
}


function App() {
    const [data, setData] = useState<User[]>([])
    const [columns, setColumns] = useState<any>([])



    const fetchData = (offset: number, limit: number) => {
        fetch("/data/MOCK_DATA.csv").then(async (res) => {
            const reader = res?.body?.getReader()
            const decoder = new TextDecoder("utf-8")

            const csvData = await reader?.read().then((result) => {
                return decoder.decode(result.value)
            })

            csvData &&
            Papa.parse(csvData, {
                header: true,
                complete: (result: any) => {
                    setColumns(
                        Object.keys(result.data[0]).map((column) => ({
                            Header: column.toUpperCase(),
                            accessor: column,
                        }))
                    )
                    setData((prevState) =>
                        prevState.concat(result.data.slice(offset, offset + limit))
                    )
                },
            })
        })
    }



    const [paginationData, setPaginationData] = useState({offset: 0, limit: 20});

    useEffect(() => {
        fetchData(paginationData.offset, paginationData.limit);
    }, [paginationData])

    const fetchMore = () => {
        setPaginationData((prevState) => ({
            ...prevState,
            offset: prevState.offset + prevState.limit,
        }))
    }

    const onEdit = (id: string) => {
        // Open Modal
        console.log(id)
    }

    const onDelete = (id: string) => {
        setData((prevState) => prevState.filter((profile) => id !== profile.id));
    }


    return (
        <div className="App">
            {data[0] ? (
                <Table
                    onEdit={onEdit}
                    onDelete={onDelete}
                    usersColumns={columns}
                    usersData={data}
                />
            ) : "Loading..."}
        </div>
    )
}

export default App