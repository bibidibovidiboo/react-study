import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Header from "./Header";
import Home from './Home'
import Chef from "./Chef";
import Chef_Detail from "./Chef_Detail";
import Footer from "./Footer";
class App extends Component{
  render(){
     return (
             <Router>
              <Header/>
                 <div className={"container"}>
                    <Switch>
                      <Route exact path={"/"} component={Home}/>
                      <Route path={"/chef"} component={Chef}/>
                      <Route path={"/chef_detail"} component={Chef_Detail}/>
                    </Switch>
                 </div>
                 <Footer/>
            </Router>


     )
  }
}
export default App;
