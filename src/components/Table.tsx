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


    const Table = useTable({
        columns,
        data,
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = Table


    return (
        <table  {...getTableProps()}>
            <thead >
            {
                // Loop over the header rows
                headerGroups.map((headerGroup,index) => (
                    // Apply the header row props
                    <tr  {...headerGroup.getHeaderGroupProps()}>
                        {
                            // Loop over the headers in each row
                            headerGroup.headers.map((column,index) => (
                                // Apply the header cell props
                                <th  {...column.getHeaderProps()}>
                                    {
                                        // Render the header
                                        column.render("Header")
                                    }
                                </th>
                            ))
                        }
                    </tr>
                ))
            }
            </thead>
            {/* Apply the table body props */}
            <tbody  {...getTableBodyProps()}>
            {
                // Loop over the table rows
                rows.map((row,index) => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                        // Apply the row props
                        <tr  {...row.getRowProps()}>
                            {
                                // Loop over the rows cells
                                row.cells.map((cell,index) => {
                                    // Apply the cell props
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {
                                                // Render the cell contents
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
