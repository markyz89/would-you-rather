import { RECEIVE_USERS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/types'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS : 
            return (
                {...state,
                ...action.users}
            )
            case ANSWER_QUESTION : 
                let { questionId, questionAnswer } = action.answer

                let newAnsweredQuestion = {[questionId] : questionAnswer}

                  
                return {
                    ...state,
                    [state[action.answer.authedUser.userId].id]: {
                    ...state[action.answer.authedUser.userId],
                        answers: {
                        ...state[action.answer.authedUser.userId].answers,
                        ...newAnsweredQuestion
                        }    
                    }
                }
                case ADD_QUESTION :
                    return {
                    ...state,
                        [action.question.author]: {
                            ...state[action.question.author],
                            questions: [
                                ...state[action.question.author].questions,
                                action.question.id 
                            ]   
                        }
                    }


        default :
            return state
    }
}