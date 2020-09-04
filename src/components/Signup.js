import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {firebaseAuth} from '../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import {Link} from 'react-router-dom';
import Logo from '../media/Logo.png';

class Signup extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 show_progress:false,
			 snakbar:false,
			 email:"",
			 password:"",
			 confirm_Password:"",
			 name:"",
			 number:"",
		}
	}

	handleChange = (e) =>{
		
		this.setState({
			[e.target.name]:e.target.value,
		})
	}

	handleClose = () => {
     this.setState({ snakbar:false});
    };


	formSubmitted=()=>{

		let validData=true;
		this.setState({
		 email_error:null,
		 password_error:null,
		 confirm_password_error:null,
		 name_error:null,
		 number_error:null,
	    })

		if (this.state.email === "") {
			this.state.email_error="Requried";
			validData=false;
			
		}
		if (this.state.password === "") {
			this.state.password_error="Requried";
			validData=false;
	
		}

		if (this.state.confirm_Password !== this.state.password) {
			this.state.confirm_password_error="Password does not Match!";
			validData=false;
		}

		if (this.state.name==="") {
			this.state.name_error="Requried!"
			validData=false
		}


        var a = /^\d{10}$/;  
        if (a.test(this.state.number))   
        {  
            this.state.number_error=null;
        }   
        else   
        {  
            this.state.number_error="Not Valid Number!"
			validData=false  
        }  
    

		

		this.setState({
			update:true,
		})

		if (validData) {
			this.setState({
				show_progress:true
			})
		}

		if (validData) {
			firebaseAuth
			 .createUserWithEmailAndPassword(this.state.email, this.state.password)
			 .then((res)=>{
			 this.setState({
			 	show_progress:false
			 });
			 
			 return res.user.updateProfile({
			 	displayName: this.state.name,
			 	phoneNumber:parseInt(this.state.number),
			 	photoURL:"https://userpic.codeforces.com/1212274/avatar/951dfd1d6eeb8cce.jpg"
			 })

			 }).catch((err)=>{
			 	console.log(err);
			 	this.setState({
			 	show_progress:false
			 })
			 	if (err.code==="auth/weak-password") {
			 		this.setState({
			 			snakbar:true,
			 			snackbar_error:"Week Password !",
			 		})
			 	}
			 	if (err.code==="auth/invalid-email") {
			 		this.setState({
			 			email_error:"Invalid email!",
			 		})
			 	}
			 	if (err.code==="auth/email-already-in-use") {
			 		this.setState({
			 			snakbar:true,
			 			snackbar_error:"Email already in use !",
			 		})
			 	}


			 })
		}

	}


	render() {
		return (
		    <Container 
		    maxWidth="xs" 
		    style={{marginTop:"50px",textAlign:"center"}} >
			 <Box 
			 bgcolor="white" 
			 boxShadow="2" 
			 textAlign="center" 
			 p="24px" 
			 mt="50px" 
			 borderRadius="13px">
			 <img src={Logo} alt="logo" height="60px" width="60px"/><br/>
			 <Typography variant="h4" color="secondary">
             SIGN UP 
             </Typography>
             <br/><br/>
			  <TextField
	          label="Email"
	          fullWidth
	          error={this.state.email_error!=null}
	          helperText={this.state.email_error}
	          type="email"
	          onChange={this.handleChange}
	          name="email"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          <TextField
	          label="nick name"
	          fullWidth
	          error={this.state.name_error!=null}
	          helperText={this.state.name_error}
	          type="text"
	          onChange={this.handleChange}
	          name="name"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          <TextField
	          label="phone Number"
	          fullWidth
	          error={this.state.number_error!=null}
	          helperText={this.state.number_error}
	          type="number"
	          onChange={this.handleChange}
	          name="number"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          <TextField
	          label="Password"
	          error={this.state.password_error!=null}
	          helperText={this.state.password_error}
	          type="password"
	          onChange={this.handleChange}
	          name="password"
	          fullWidth
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          <TextField
	          label="confirm Password"
	          error={this.state.confirm_password_error!=null}
	          helperText={this.state.confirm_password_error}
	          type="password"
	          onChange={this.handleChange}
	          name="confirm_Password"
	          fullWidth
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          {this.state.show_progress?
	          	<CircularProgress color="secondary" />:
	          null}
	          
	          <br/><br/>
	          <Button 
	          fullWidth
	          variant="contained" 
	          color="secondary"
	          onClick={this.formSubmitted}>
              Sign Up
              </Button>
              <br/><br/>
              <Typography>
              Already have an account ?  
              <Link to="/Login" >
               Sign In
              </Link>
              </Typography>
              <Snackbar
		        anchorOrigin={{
		          vertical: 'bottom',
		          horizontal: 'left',
		        }}
		        open={this.state.snakbar}
		        autoHideDuration={1000}
		        onClose={e=>this.setState({
		          snakbar:false
		        })}
		        message={this.state.snackbar_error}
		        
        	/>
			 </Box>
			</Container>
		)
	}
}

export default Signup;