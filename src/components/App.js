import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import Header from './Header'

import Home from './Home'
import QuestionView from './QuestionView'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import FourOhFour from './FourOhFour'


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
                        <Route path ='/' component={Header}/>
                    : <p>Loading...</p>
                    }
                
                        <Switch>
                            <Route path ='/' exact component={Home}/>
                            
                                <Route path='/question/:id' component={QuestionView} />
                                
                            
                            <Route path='/add' component={NewQuestion} />
                            <Route path='/leaderboard' component={Leaderboard} />
                            <Route component={FourOhFour}/>
                        </Switch>
                    
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