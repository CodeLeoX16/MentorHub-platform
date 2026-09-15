import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./routes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="mx-auto max-w-screen-3xl">
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000 }}
      />
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteElement route={route} />}
            ></Route>
          ))}
        </Routes>
      </HashRouter>
    </div>
  );   
}

const RouteElement = ({ route }) => {
  return route.isProtected ? (
    <ProtectedRoute>{route.element}</ProtectedRoute>
  ) : (
    <> {route.element}</>
  );
};
export default App;
