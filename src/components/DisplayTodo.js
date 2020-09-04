import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Fab,Button,Toolbar,IconButton,Slide} from '@material-ui/core';
import {  
  Add,Close
} from '@material-ui/icons';
import {connect} from "react-redux";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import firebase,{firestore} from '../firebase';
import {loadTodos} from '../Redux_part/Actions/TodoAction'




class DisplayTodo extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			     value:0,
	         addDialog:false,
	         edit_mode:false,
	         title:"",
	         description:"",
	         date:"",
	         title_error:"",
	         description_error:"",
	         date_error:"",
	         checked:false,
	         layout_bg:"#fff",
	         editIndex:0
		}
	}

  componentDidMount(){

    let user = firebase.auth().currentUser;
    let name = user.email.split("@")[0];
    if (this.props.todos===null) {
      this.props.loadTodos(name);
    }
  
  }

	deleteTodo = (index) =>{
    console.log(index);
  let user = firebase.auth().currentUser;
  let name = user.email.split("@")[0];
  var delTodo = firestore.collection('USERS').doc("kamandlabalashekhar");
  var removeCapital = delTodo.update({
      ['todos.'+index]: firebase.firestore.FieldValue.delete()
  });
		/*let todos = this.state.todos;
		todos.splice(index,1);
		
		this.setState({
			todos,
		})*/
	}

	addtodo = (todo) =>{
    
		if (this.state.edit_mode || typeof(todo) ==="number") {
			let data = this.state.todos[todo];
      
        this.setState({})

		}else{
		let todos = [...this.state.todos,todo];

		this.setState({
			todos,
			addDialog:false,
			title:"",
			description:"",
			date:"",
			color:"#fff",
			checked:false,
		})
		}
		
	}


	handleChange = (event, newValue) => {
    this.setState({value:newValue})
    };

    handleinpChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value,
    })
    } 


    handleChecked = () =>{
    if (this.state.checked ===false) {
      this.setState({
        checked:true,
      })

    }
    else{
      this.setState({
        checked:false,
      })
    }
  }

  
  editTodo = (index) =>{
    
    this.setState({
      addDialog:true,
    })
  	this.setState({editIndex :index})
  	

  	let data = this.state.todos[index];

  	this.setState({
  		title:data.title,
  		checked:true,
  		description:data.description,
  		layout_bg:data.color,
  		date:data.date,
  	})
    

    this.setState({
      edit_mode:true,
    })
  	this.addtodo(index);

  }

  save = () =>{
    let validData=true;
    this.state.title_error="";
    this.state.description_error="";
    this.state.date_error="";
  
  if (this.state.title==="") {
    this.state.title_error="Requried!";
    validData=false;
  }

  if (this.state.description==="") {
    this.state.description_error="Requried!";   
    validData=false;
  }

  if (this.state.date==="") {
    this.state.date_error="Requried!";
    validData=false;
  }

  if (validData) {
  	if (this.state.edit_mode) {

     this.state.todos[this.state.editIndex].title = this.state.title;
     this.state.todos[this.state.editIndex].description = this.state.description;
     this.state.todos[this.state.editIndex].date = this.state.date;
     this.state.todos[this.state.editIndex].color = this.state.layout_bg;
     
     this.setState({
			addDialog:false,
			title:"",
			description:"",
			date:"",
			color:"#fff",
			checked:false,
	})
  	}
  	else{
      console.log(this.state.layout_bg,this.state.date)
  	let index = this.state.todos.length;
  	let data={
  		title:this.state.title,
  		description:this.state.description,
  		date:this.state.date,
  		color:this.state.layout_bg,
  	    key:index
  	}
  	this.addtodo(data)
  		}
  	
  }

  this.setState({})


  }
  

	

	renderTodos = () =>{

    
    if (this.props.todos) {
      let todos = this.props.todos;
      for(var index = 0;index<this.props.todos.no_of_todos;index++){
  
      return (
        <Box style={{
          background:todos["color_"+(index+1)],
          padding:"20px", 
          marginBottom:"5px",
            boxShadow:"2",
            borderRadius:"10px"}} key={index} >

        <Typography component={'span'}  variant="h4">{todos["title_"+(index+1)]}</Typography>
        <br/><Typography component={'span'}  variant="h6">{todos["desc_"+(index+1)]} </Typography>
        <br/><Typography component={'span'}  variant="caption"> {todos["date_"+(index+1)]}</Typography>
        <Box style={{textAlign:"right"}}>
        <EditIcon style={{cursor:"pointer", color:"white", marginRight:"20px"}} onClick={()=>this.editTodo(index)} />
        <DeleteIcon style={{cursor:"pointer",color:"white"}} onClick={()=>this.deleteTodo(index)}/>
        
        </Box>
        </Box>
        )
    }
    
    }
    
    
  }







	render() {
		return (
    <div>
      <AppBar position="static">
        <Tabs
        style={{background:"tomato"}}
          variant="fullWidth"
          value={this.state.value}
          onChange={this.handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Present" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Upcoming" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Completed" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>
        
		{this.renderTodos()}
		
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        Page Three
      </TabPanel>
      <Fab 
      onClick={e=>
        this.setState({
          addDialog:true,edit_mode:false
        })
      } 
      color="primary" 
      aria-label="add" 
      style={{background:"coral", position:"fixed" ,bottom:"30px",right:"30px"}}>
      <Add />
      </Fab>


      <Dialog fullScreen open={this.state.addDialog} onClose={e=>{this.setState({addDialog:false})}} TransitionComponent={Transition}>
        <AppBar style={{background:"blue"}}  >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={e=>this.setState({
              addDialog:false
            })} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" >
             {this.state.edit_mode?"Edit Section":"Add Section"}
            </Typography>
            <Button 
            style={{position:"absolute" , right:"0"}} 
            autoFocus color="inherit" 
            onClick={e=>this.save()}>
              save
            </Button>
          </Toolbar>
        </AppBar>
   <Toolbar/>
   <Box style={{padding:"14px",background:"#fff" ,boxShadow:"2"}} >
  <TextField
   label="Title" 
   variant="outlined" 
   defaultValue={this.state.title}
   name="title"
   size="small"
   error={this.state.title_error!==""}
   helperText={this.state.title_error}
   onChange={(e)=>this.handleinpChange(e)}
   />
   <br/><br/>
   <TextField
   label="Description" 
   variant="outlined" 
   defaultValue={this.state.description}
   name="description"
   fullWidth
   multiline
   rows={4}
   error={this.state.description_error!==""}
   helperText={this.state.description_error}
   onChange={(e)=>this.handleinpChange(e)}
   />
   <br/><br/>
   <TextField
   variant="outlined" 
   defaultValue={this.state.date}
   name="date"
   type="date"
   size="small"
   error={this.state.date_error!==""}
   helperText={this.state.date_error}
   onChange={(e)=>this.handleinpChange(e)}
   />
   <br/><br/>
   <FormControlLabel
    control={<Switch checked={this.state.checked} onChange={this.handleChecked}/>}
    label="Use extra Styles"
    />

    {this.state.checked ? 
      <Box style={{background:this.state.layout_bg,border:"1px solid black",padding:"15px",marginTop:"10px",borderRadius:"10px"}}>
      <input
        name="layout_bg"
        hidden
        id="standard-basic"
        onChange={
          this.handleinpChange
        }
        type="color"
      />
     <label htmlFor="standard-basic">
        <Button
        component="span"
        >
        layout Background
        </Button>
      </label>
      </Box>
    :null}
   
   </Box>
   </Dialog>

   </div>
			
		)
	}
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}



const mapStateToProps = (state) =>{
  return{
   todos:state.todos
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    loadTodos:(name)=>dispatch(loadTodos(name)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayTodo)