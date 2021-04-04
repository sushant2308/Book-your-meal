import {SET_CURRENT_USER} from "./usertype";

const INITIAL_STATE ={
    current_user:null
}
const user_reducer =(state=INITIAL_STATE,action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
               
                ...state,
                current_user:action.payload,
            }

        default:
            return state;
        
    }
};
export default user_reducer