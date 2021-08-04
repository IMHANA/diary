import { Route, Switch  } from "react-router-dom";
import Main from "./main";

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Main} />
        </Switch>
    )
}