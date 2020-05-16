import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/types'

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS : 
            return (
                {...state,
                ...action.questions}
            )
        case ANSWER_QUESTION :

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
        case ADD_QUESTION :
            return{
                ...state,
                [action.question.id]: action.question
            }
            
        default :
            return state
    }
}