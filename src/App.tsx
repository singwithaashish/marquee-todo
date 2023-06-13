import Dashboard from "./pages/Dashboard";
import { TodoProvider } from "./contexts/TodoContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";

function App() {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      {user ? (
        <TodoProvider>
          <Dashboard />
        </TodoProvider>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
