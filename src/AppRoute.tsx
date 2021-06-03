import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import CreateEmployeeScreen from "./module/adminEmployee/CreateEmployeeScreen";
import EditEmployeeScreen from "./module/adminEmployee/EditEmployeeScreen";
import EmployeeDetailScreen from "./module/adminEmployee/EmployeeDetailScreen";
import EmployeeListScreen from "./module/adminEmployee/EmployeeListScreen";
import PerformanceReviewCreateScreen from "./module/adminPerfReview/PerformanceReviewCreateScreen";
import PerformanceReviewDetailScreen from "./module/adminPerfReview/PerformanceReviewDetailScreen";
import PerformanceReviewEditScreen from "./module/adminPerfReview/PerformanceReviewEditScreen";
import PerformanceReviewListScreen from "./module/adminPerfReview/PerformanceReviewListScreen";
import EmployeePerformanceReviewList from "./module/employeePerfReview/EmployeePerformanceReviewList";
import FillPerfReviewByEmployee from "./module/employeePerfReview/FillPerfReviewByEmployee";
import LoginScreen from "./module/login/LoginScreen";
import { useAuth } from "./store/auth";
import InitialScreen from "./ui_components/InitialScreen";
import TopNavigationBar from "./ui_components/TopNavigationBar";

function PrivateRoute(props: RouteProps) {
  const {
    state: { isAuthed },
  } = useAuth();
  if (!isAuthed) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}

export default function AppRoute() {
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
        <PrivateRoute exact path="/" component={InitialScreen} />
        <PrivateRoute exact path="/employee" component={EmployeeListScreen} />
        <PrivateRoute
          exact
          path="/employee/new"
          component={CreateEmployeeScreen}
        />
        <PrivateRoute
          exact
          path="/employee/:employeeId/edit"
          component={EditEmployeeScreen}
        />
        <PrivateRoute
          exact
          path="/employee/:id"
          component={EmployeeDetailScreen}
        />
        <PrivateRoute
          exact
          path="/performance-review"
          component={PerformanceReviewListScreen}
        />
        <PrivateRoute
          exact
          path="/performance-review/new"
          component={PerformanceReviewCreateScreen}
        />
        <PrivateRoute
          exact
          path="/performance-review/:id"
          component={PerformanceReviewDetailScreen}
        />
        <PrivateRoute
          exact
          path="/performance-review/edit/:id"
          component={PerformanceReviewEditScreen}
        />
        <PrivateRoute
          exact
          path="/pending-performance-review"
          component={EmployeePerformanceReviewList}
        />
        <PrivateRoute
          exact
          path="/pending-performance-review/:performanceReviewId"
          component={FillPerfReviewByEmployee}
        />
      </Switch>
    </div>
  );
}
