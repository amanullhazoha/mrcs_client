import Faq from "./page/FAQ";
import ContactUs from "./page/ContactUs";
import React, { lazy, Suspense } from "react";
import RecallDetail from "./page/RecallDetail";
import ExamSchedule from "./page/ExamSchedule";
import { Route, Routes } from "react-router-dom";
import RecallCategory from "./page/RecallCategory";
import MainLayout from "./components/layouts/MainLayout";
import { CommonProgress } from "./components/common/CommonProgress";
import ProtectedRoute from "./components/protected/ProtectedRoute";

const User = lazy(() => import("./page/User"));
const Quiz = lazy(() => import("./page/Quiz"));
const Study = lazy(() => import("./page/Study"));
const Signup = lazy(() => import("./page/Signup"));
const Recall = lazy(() => import("./page/Recall"));
const Signin = lazy(() => import("./page/Signin"));
const Results = lazy(() => import("./page/Results"));
const AboutUs = lazy(() => import("./page/AboutUs"));
const AllQuiz = lazy(() => import("./page/AllQuiz"));
const AllStudy = lazy(() => import("./page/AllStudy"));
const Category = lazy(() => import("./page/Category"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const AllRecall = lazy(() => import("./page/AllRecall"));
const Questions = lazy(() => import("./page/Questions"));
const ViewResult = lazy(() => import("./page/ViewResult"));
const ResetPassword = lazy(() => import("./page/ResetPassword"));
const TermsCondition = lazy(() => import("./page/TermsCondition"));
const ForgotPassword = lazy(() => import("./page/ForgotPassword"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Dashboard />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/studyplan"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <ExamSchedule />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Signin />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Signup />
            </Suspense>
          </MainLayout>
        }
      />
      {/* Study */}
      <Route
        path="/allstudy"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <AllStudy />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/allstudy/study/:id"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Study />
            </Suspense>
          </MainLayout>
        }
      />
      {/* Category */}
      <Route
        path="/category"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Category />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/category/quiz"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Quiz />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/recall-category"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <RecallCategory />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/recall-category/recall"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Recall />
            </Suspense>
          </MainLayout>
        }
      />
      {/* recall */}
      <Route
        path="/all-recall-question"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <AllRecall />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/recalls"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<CommonProgress />}>
                <Questions />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/recall-detail"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<CommonProgress />}>
                <RecallDetail />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      {/* Quiz */}
      <Route
        path="/allquiz"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <AllQuiz />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/allquiz/quiz"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Quiz />
            </Suspense>
          </MainLayout>
        }
      />
      {/* Questions */}
      <Route
        path="/questions"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<CommonProgress />}>
                <Questions />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      {/* Results */}
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<CommonProgress />}>
                <Results />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/results/viewresults/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<CommonProgress />}>
                <ViewResult />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      {/* Users */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<CommonProgress />}>
                <User />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/edit"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<CommonProgress />}>
                <User />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      {/* Quiz */}
      <Route
        path="/terms"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <TermsCondition />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/aboutus"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <AboutUs />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <Faq />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/contact-us"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <ContactUs />
            </Suspense>
          </MainLayout>
        }
      />
      // ForgotPassword & Reset Password
      <Route
        path="/forgotpassword"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <ForgotPassword />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <MainLayout>
            <Suspense fallback={<CommonProgress />}>
              <ResetPassword />
            </Suspense>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
