import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import QuestionView from './QuestionView'


class App extends Component  {

    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }

    // After lunch, start by linking to the Question View within the Home component. Then hook it up with the question id 
    // to show the relevant question on it's own. Pass it via props into Question View then render the Question with that id.
    // If the question has been answered then results will be rendered. So need a question answered and unanswered (results) view.

    // Leaderboard really shouldn't be difficult. It's just mapping out the users in order of how many questions have been answered.

    // To this point, not really used Redux. Just loaded data into redux and put it into the view. So the next part is presumably harder

    // Obviously all parts are going to get slightly trickier when you can interact with the app...which would be the next part
    //Adding new questions
    // Ability to actually answer questions

    render () {
        return (
            <BrowserRouter>
                <div>
                {this.props.users ?
                
                 <Header />
                : <p>Loading...</p>
                }
            

            <Route path ='/' exact component={Home}/>
            <Route path='/question/:id' component={QuestionView} />
            </div>
            </BrowserRouter>
            
        )
    }
}

function mapStateToProps ( {users, questions} ) {
    return {
        users,
        questions
    }
}

export default connect(mapStateToProps)(App)