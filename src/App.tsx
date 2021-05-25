import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import EmployeeListScreen from "./screens/EmployeeListScreen";
import EmployeeDetailScreen from "./screens/EmployeeDetailScreen";
import PerformanceReviewListScreen from "./screens/PerformanceReviewListScreen";
import PerformanceReviewDetailScreen from "./screens/PerformanceReviewDetailScreen";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/employee">Employee</Link>
            </li>
            <li>
              <Link to="/performance-review">Performance Review List</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route exact path="/employee">
            <EmployeeListScreen />
          </Route>
          <Route
            exact
            path="/employee-detail/:id"
            component={EmployeeDetailScreen}
          />
          <Route exact path="/performance-review/:id/:reviewerId">
            <PerformanceReviewDetailScreen />
          </Route>
          <Route exact path="/performance-review">
            <PerformanceReviewListScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
