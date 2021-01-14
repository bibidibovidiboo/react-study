import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Chef from "./Chef";
import Home from "./Home";
import Chef_Detail from "./Chef_Detail";
import Header from "./Header";
import Footer from "./Footer";
class App extends Component{
    render() {
        return(

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