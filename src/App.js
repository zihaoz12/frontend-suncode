import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
//Component...
import MainContainer from './MainContainer';
import HomeContainer from './HomeContainer';
import AdminHome from './AdminHome';
import RegisterLoginContainer from './RegisterLoginContainer';
import MyAccountContainer from './MyAccountContainer';
import CreateContainer from './CreateContainer';
import PhotoContainer from './PhotoContainer';
import ShowHouseContainer from './ShowHouseContainer';
import EditHouseContainer from './EditHouseContainer';


const My404 = () => {
  return (
    <div>
      ...error...
    </div>
  )
}

const App = (props) => {
  if (localStorage.getItem('userId') !== null) {
    console.log('USER IS LOGGED IN')
  } else if(props.location.pathname !== '/login') {
    props.history.push('/login')
  }

  return (
    <main>
      <Switch>
        <Route exact path="/login" component={ RegisterLoginContainer } />
        <Route exact path="/home" component={ HomeContainer } />
        <Route exact path="/adminhome" component={ AdminHome } />
        <Route exact path="/myaccount/:id/edit" component={ MyAccountContainer } />
        <Route exact path="/create" component={ CreateContainer } />
        <Route exact path="/uploadphoto" component={ PhotoContainer } />
        <Route exact path="/:id" component={ ShowHouseContainer } />
        <Route exact path="/:id/edit" component={ EditHouseContainer } />
        <Route component={ My404 } />
      </Switch>
    </main>
  )
}

export default withRouter(App)
// export default App;
//
// <Route exact path="/" component={ MainContainer } />
// <Route exact path="/quiz" component={ QuizContainer } />

// function App() {
//   return (
//     <div className="App">
//
//     </div>
//   );
// }
