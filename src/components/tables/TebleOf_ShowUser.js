import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';




export default function TebleOf_ShowUser(props) {

  const [rows, setRows] = React.useState([]);


  let navigate = useNavigate()
  React.useEffect(()=>{
    if(props.dateFromServer){
      let arr = props.dateFromServer.map((item)=>{

          let {name,level_permission, email, class_permission } = item
          let date = new Date(item.Date).toLocaleDateString();
          class_permission = !class_permission[0] ? "---": class_permission.map(item2=> ` ${item2} `)
        return createData(name, date, level_permission, email, class_permission )
      })
      setRows(arr)
  
    }
  },[props.dateFromServer])


  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'Date', label: 'Date', minWidth: 100 },
    {
      id: 'level_permission',
      label: 'Level permission',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'class_permission',
      label: 'Class permission',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ]
  
  function createData(name, Date, level_permission, email,class_permission) {
    return { name, Date, level_permission, email, class_permission };
  }

	
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                sx={{fontWeight: 700}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>{props.setUserToEdit(row); console.log("row = ",row)
                  // ;navigate("/admin/editUser");
                  }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
     
    </Paper>
  );
}
