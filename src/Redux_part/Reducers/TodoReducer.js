const initState = null;


const TodoReducer = (state = initState,action)=>{
	
	switch (action.type){
		case "LOAD_TODOS":
		console.log("load_todos")
		state = action.payload;
		break;
		default:
		break;
	}
	return state;
}

export default TodoReducer;