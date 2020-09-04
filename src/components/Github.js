import React from 'react'
import {
	Box,
	TextField,
	Button,
	Typography,
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';


export class Github extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 name:"",
			 github:"",
		}
	}

	handleChange = (e) =>{
		this.setState({
			[e.target.name]:e.target.value,
		})
	}

	formSubmitted = () =>{
		let validData = true;
		this.state.name_error=null;

		if (this.state.name === "") {
			this.state.name_error="Requried!"
			validData = false;
		}

		this.setState({});

		if (validData) {
			let url = "https://api.github.com/users/"+this.state.name
		fetch(url).then((res)=>
        res.json()
		).then((res)=>{
			
			this.setState({github:res})
			console.log(this.state.github)
		})
		}
	}

	componentDidMount(){
		let url = "https://api.github.com/users/"+this.state.name
		fetch(url).then((res)=>
        res.json()
		).then((res)=>{
			console.log(res)
		})
	}


	render() {
		return (
			<div>
			<TextField
	          label="Name"
	          fullWidth
	          error={this.state.name_error!=null}
	          helperText={this.state.name_error}
	          onChange={this.handleChange}
	          name="name"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          <Button 
	          fullWidth
	          variant="contained" 
	          color="secondary"
	          onClick={this.formSubmitted}>
              Login
              </Button>
              <br/><br/>


              {this.state.github ? this.state.github.message ? 
              	<Box  boxShadow="2" style={{padding:"20px",borderRadius:"10px",background:"#db6cf2"}} >
              	<Typography variant="h5" >NO USER FOUND </Typography>
              	</Box>
              	:<Box boxShadow="2" style={{display:"flex",flexWrap:"wrap", padding:"20px",borderRadius:"10px",background:"#db6cf2"}} >
              	<Box style={{flex:"1",textAlign:"center"}}>
              	<img src={this.state.github.avatar_url} alt="img" height="80px" style={{borderRadius:"50%"}} />
              	<Typography variant="h5" >{this.state.github.name}</Typography>
              	</Box>
              	<Box style={{flex:2}}>
              	<Chip style={{marginBottom:"6px"}} label={"followers : "+this.state.github.followers}/><br/>
              	<Chip style={{marginBottom:"6px"}} label={"Following : "+this.state.github.following}/><br/>
              	<Chip style={{marginBottom:"6px"}} label={"Repositories : "+this.state.github.public_repos}/>
              	<Typography> Following : {this.state.github.following} </Typography>
              	<Typography> Repositories : {this.state.github.public_repos} </Typography>
              	</Box></Box>
              :null}
				<h1>Github</h1>
			</div>
		)
	}
}



export default Github