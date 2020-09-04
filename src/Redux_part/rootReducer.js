import { combineReducers } from 'redux';
import TodoReducer from './Reducers/TodoReducer';

const rootReducer = combineReducers({
    todos: TodoReducer,
    
  });

export default rootReducer;