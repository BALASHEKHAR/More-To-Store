import firebase,{firestore} from '../../firebase';
  

export const loadTodos = (name) =>{
	return(dispatch,getState)=>{
		console.log("came");
		firestore
		.collection("USERS")
		.doc(name)
		.get()
		.then((querySnapshot)=>{
		 	console.log(querySnapshot.data());
		 	dispatch({type:"LOAD_TODOS", payload:querySnapshot.data()})
		 })
		 .catch((error)=>{
		 	console.log(error);
		 })
	};
};