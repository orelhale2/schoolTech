
import * as React from 'react';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';


import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


let ListButtonOfTeacher = (props)=> {
	
	const drawerWidth = 240;
	const navigate = useNavigate()
	

	return (
		<List sx={{mb:drawerWidth /14+ "px",mt:drawerWidth /14+ "px"}}>

			<Toolbar sx={{ display: 'inline-flex',width:"90%" , justifyContent:'center'}}>
			<FormControl fullWidth>
				<InputLabel variant="standard" htmlFor="uncontrolled-native" style={{color: "#1976d2"}}>
				Classes list 
				</InputLabel >
				<NativeSelect onChange={(e)=>{props.setNameClass(e.target.value); navigate("/teacher")}}
				defaultValue={props.list[0]} >
					{props.list.map((item,i)=>{
						return <option color='primary' value={item}>{item}</option>
					})}
				</NativeSelect>
			</FormControl>
			</Toolbar>



			 <ListItem key={"list"} disablePadding onClick={()=>{navigate("tableListStudent")}}>
			 <ListItemButton>
				 <ListItemIcon>
					 <RuleOutlinedIcon color='primary' /> 
				 </ListItemIcon>
				 <ListItemText primary={"list"} />
			 </ListItemButton>
			 </ListItem>

			 <ListItem key={"exams"} disablePadding onClick={()=>{navigate("showAllExams")}}>
			 <ListItemButton>
				 <ListItemIcon>
				   <WysiwygIcon color='primary'/>
				 </ListItemIcon>
				 <ListItemText primary={"exams"} />
			 </ListItemButton>
			 </ListItem>
		</List>
	);
}


export default ListButtonOfTeacher



// let listOfExams = (
// 	<>
// 	  <ListItem sx={{backgroundColor:"gainsboro"}} disablePadding  onClick={()=>{navigate("createExam")}}>
// 	  <ListItemButton>
// 		  <ListItemIcon>
// 			  <RuleOutlinedIcon color='primary' /> 
// 		  </ListItemIcon>
// 		  <ListItemText primary={"create exam"} />
// 	  </ListItemButton>
// 	  </ListItem>

// 	  <ListItem sx={{backgroundColor:"gainsboro"}} disablePadding  onClick={()=>{navigate("showAllExams")}}>
// 	  <ListItemButton>
// 		  <ListItemIcon>
// 			<WysiwygIcon color='primary'/>
// 		  </ListItemIcon>
// 		  <ListItemText primary={"list exams"} />
// 	  </ListItemButton>
// 	  </ListItem>
// 	</>
//   )



// const [checkOpenListExams, setCheckOpenListExams] = React.useState(false);
// const openListOfExams = () => {
// 	setCheckOpenListExams(checkOpenListExams ? false: true)
// 	console.log("openListOfExams");
// };