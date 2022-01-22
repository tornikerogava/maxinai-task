import {useTable} from "react-table"
import "../index.scss"

interface User {
    id: string
    first_name: string
    last_name: string
    email: string
}

function Table({
                   usersColumns: columns,
                   usersData: data,
                   onEdit,
                   onDelete,
               }: {
    usersColumns: any
    usersData: User[]
    onEdit: any
    onDelete: any
}) {

    const table = useTable({
        columns,
        data,
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table


    return (
        <table  {...getTableProps()}>
            <thead>
            {
                headerGroups.map((headerGroup) => (
                    <tr  {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column) => (
                                <th  {...column.getHeaderProps()}>
                                    {
                                        column.render("Header")
                                    }
                                </th>
                            ))
                        }
                    </tr>
                ))
            }
            </thead>

            <tbody  {...getTableBodyProps()}>
            {
                rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr  {...row.getRowProps()}>
                            {
                                row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {
                                                cell.render("Cell")
                                            }
                                        </td>
                                    )
                                })
                            }
                            <td className="action-buttons">
                                <button onClick={() => onEdit(row.values.id)}>Edit</button>
                                <button onClick={() => onDelete(row.values.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default Table
