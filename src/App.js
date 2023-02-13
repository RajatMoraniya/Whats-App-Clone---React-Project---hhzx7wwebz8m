import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import HomeChat from './Components/HomeChat';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Components/Login';
import { useStateValue } from './StateProvider';
import React,{ useEffect } from 'react';
import { auth } from './firebase';

function App() {

  const [{user},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      dispatch({
        type:"SET_USER",
        user:user
      })
    })
  }, [])
  
  
  return (
    
    <Router>
      <Switch>
        { !user ? (<Login/>) :
          (<>
              <div className="App">
                <div className="app__body">
                  <Sidebar/>
                  <Route exact path='/'>
                    <HomeChat/>
                  </Route>
                  <Route path='/room/:roomId'>
                    <Chat/>
                  </Route> 
                </div>
              </div>
            </>
          )
        }
      </Switch>
    </Router>
  );
}

export default App;
