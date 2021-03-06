import React,{Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import ChefList from "./ChefList";
import ChefDetail from "./ChefDetail";
// model.addAttribute("main_jsp","파일명")
class App extends Component{
  render(){
    return(
        <Router>
          <Switch>
            <Route exact path={"/"} component={ChefList} />
            <Route exact path={"/chef_detail/:chef"} component={ChefDetail} />
          </Switch>
        </Router>
    )
  }
}
export default App;
