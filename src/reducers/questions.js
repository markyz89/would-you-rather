import { RECEIVE_QUESTIONS, ANSWER_QUESTION } from '../actions/types'
import users from './users'

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS : 
            return (
                {...state,
                ...action.questions}
            )
        case ANSWER_QUESTION :
            console.log('called', action);
            console.log(action.authedUser)

            let newVotesArray =  [...state[action.answer.questionId][action.answer.questionAnswer].votes, 
                                 action.answer.authedUser.userId]
            console.log(newVotesArray)
            console.log(state[action.answer.questionId][action.answer.questionAnswer].votes)

            return {
                ...state,
                [action.answer.questionId]: {
                    ...state[action.answer.questionId],
                    [action.answer.questionAnswer]: {
                        ...state[action.answer.questionId][action.answer.questionAnswer],
                            votes: [
                                ...state[action.answer.questionId][action.answer.questionAnswer].votes, 
                                 action.answer.authedUser.userId
                            ]
                    }
                }
            }
        
        default :
            return state
    }
}