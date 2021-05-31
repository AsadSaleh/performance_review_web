import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEmployeeScreen from "./module/adminEmployee/CreateEmployeeScreen";
import PerformanceReviewCreateScreen from "./module/adminPerfReview/PerformanceReviewCreateScreen";
import EmployeeDetailScreen from "./module/adminEmployee/EmployeeDetailScreen";
import EmployeeListScreen from "./module/adminEmployee/EmployeeListScreen";
import LoginScreen from "./module/login/LoginScreen";
import PerformanceReviewDetailScreen from "./module/adminPerfReview/PerformanceReviewDetailScreen";
import FillPerfReviewByEmployee from "./module/employeePerfReview/FillPerfReviewByEmployee";
import PerformanceReviewListScreen from "./module/adminPerfReview/PerformanceReviewListScreen";
import TopNavigationBar from "./ui_components/TopNavigationBar";
import InitialScreen from "./ui_components/InitialScreen";
import EditEmployeeScreen from "./module/adminEmployee/EditEmployeeScreen";
import PerformanceReviewEditScreen from "./module/adminPerfReview/PerformanceReviewEditScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route path="/" component={MainApp} />
      </Switch>
    </Router>
  );
}

function MainApp() {
  return (
    <div>
      <TopNavigationBar />
      <Switch>
        <Route exact path="/" component={InitialScreen} />
        <Route exact path="/employee" component={EmployeeListScreen} />
        <Route exact path="/employee/new" component={CreateEmployeeScreen} />
        <Route
          exact
          path="/employee/:employeeId/edit"
          component={EditEmployeeScreen}
        />
        <Route exact path="/employee/:id" component={EmployeeDetailScreen} />
        <Route
          exact
          path="/performance-review"
          component={PerformanceReviewListScreen}
        />
        <Route
          exact
          path="/performance-review/new"
          component={PerformanceReviewCreateScreen}
        />
        <Route
          exact
          path="/performance-review/:id"
          component={PerformanceReviewDetailScreen}
        />
        <Route
          exact
          path="/performance-review/edit/:id"
          component={PerformanceReviewEditScreen}
        />
        <Route
          exact
          path="/performance-review/:id/reviewer/:reviewerId"
          component={FillPerfReviewByEmployee}
        />
      </Switch>
    </div>
  );
}

export default App;
