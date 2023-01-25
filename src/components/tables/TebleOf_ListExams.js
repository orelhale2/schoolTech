

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';





export default function TebleOf_ListExams(props) {


	
	const columns = [
	  { id: 'index', label: '#', minWidth: 1 },
	  { id: 'name', label: 'Name', minWidth: 50 },
	  { id: 'date', label: 'Date', minWidth: 50 },
	  { id: 'average', label: 'Average', minWidth: 50 },
	];
	

	let style1 = { fontWeight: 700, "font-size": "1.4rem", "width": "15%" }
	let style2 = { fontWeight: 700, "font-size": "1.4rem"}

	const [rows, setRows] = React.useState([]);


	React.useEffect(()=>{
		if(props.AllExams){
			console.log("props.AllExams = ",props.AllExams);
			let arr = props.AllExams.map((item, i)=>{
				let {examName, date, average} = item
				return {index:`${i + 1}.`, name: examName, date: date, average: average}
			})
			// examName
			// console.log("AllExams = ", props.AllExams);
			setRows(arr)
			
		}
		},[])

	return (

		<Paper sx={{width: '85%'}}>
			<TableContainer sx={{ maxHeight: 440 }}>
			<Table stickyHeader aria-label="sticky table">
				<TableHead >
					<TableRow>
					{columns.map((column) => (
						<TableCell sx={column.id == "index" ? style1 : style2}
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
					{rows
					.map((row,index_row) => {
						return (
							<TableRow 
							hover 
							role="checkbox" 
							tabIndex={-1} key={row.code} 
							onClick={()=>{props.AllExams[index_row].examList[0] ? props.setSpecificExam(props.AllExams[index_row]) : props.setNotData("this exam is empty")}}
							>
							{columns.map((column) => {
								const value = row[column.id];
								return (
									<TableCell key={column.id} align={column.align} sx={{"font-size": "1.4rem"}}>
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


