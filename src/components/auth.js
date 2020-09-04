import React,{useState} from 'react';
import { firebaseAuth} from '../firebase';
import {Redirect} from 'react-router-dom';


function Auth(props) {
	const [logged , setlogged]=useState(null);
	
	firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
    	//console.log(user)
		setlogged(true); 
	 } else {
	    setlogged(false);
	}
	});


	if (props.nonAuth) {
	if (logged===null) {
		return "loading....";
	}
	else if(!logged){
		return props.children;
	}
	else if(logged){
		return <Redirect to="/home"/>
	}
	}
	
    else{
	if (logged===null) {
		return "loading....";
	}
	else if(logged){
		return props.children;
	}
	else if(!logged){
		return <Redirect to="/Login"/>
	}
}
	

}

export default Auth