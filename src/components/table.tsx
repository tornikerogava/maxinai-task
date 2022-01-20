import {useTable} from "react-table"

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
    //   const data = useMemo(() => usersData, []);
    //   const columns = useMemo(() => usersColumns, []);
    const table = useTable({
        columns,
        data,
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table


    return (
        <table {...getTableProps()}>
            <thead>
            {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            // Loop over the headers in each row
                            headerGroup.headers.map((column) => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps()}>
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
            <tbody {...getTableBodyProps()}>
            {
                // Loop over the table rows
                rows.map((row) => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                        // Apply the row props
                        <tr  {...row.getRowProps()}>
                            {
                                // Loop over the rows cells
                                row.cells.map((cell) => {
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
                            <button onClick={() => onEdit(row.values.id)}>Edit</button>
                            <button onClick={() => onDelete(row.values.id)}>Delete</button>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default Table
