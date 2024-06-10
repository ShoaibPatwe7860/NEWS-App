import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import NewsDesc from "./pages/NewsDesc";
import AddNews from "./pages/AddNews";
import LandingPage from "./pages/LandingPage";
import PostedNewsItems from "./pages/PostedNewsItems";
import EditNews from "./pages/EditNews";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted"
            element={
              <ProtectedRoute>
                <PostedNewsItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:newsid"
            element={
              <ProtectedRoute>
                <EditNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newsdesc/:newsid"
            element={
              <ProtectedRoute>
                <NewsDesc />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
