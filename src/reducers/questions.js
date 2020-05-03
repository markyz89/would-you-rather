import { RECEIVE_QUESTIONS, ANSWER_QUESTION } from '../actions/types'
import users from './users'

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS : 
            return (
                {...state,
                ...action.questions}
            )
        
        default :
            return state
    }
}