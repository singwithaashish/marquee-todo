import React, { useContext, useState, SyntheticEvent } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [failed, setFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setFailed(false);
      // TODO: encrypt password
      const a = login(username, password);
      if(!a){
        console.log("failed");
        setFailed(true);
      }
    } catch (error) {
      setFailed(true);
      console.error("Failed to login", error);
    }
  };

  const labelClasses = "block text-gray-700 text-sm font-bold mb-2";
  const inputClasses =
    "border border-gray-300  w-full p-2 bg-gray-100 rounded-md focus:outline-none ";

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl my-20 font-bold">Todo App - Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-6xl bg-white p-10 rounded"
      >
        <div className="mb-4">
          <label className={labelClasses}>Username</label>
          <input
            className={inputClasses + (failed ? " border-red-500" : "")}
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={labelClasses}>
          <label className={labelClasses}>Password</label>

          <input
            className={inputClasses + (failed ? " border-red-500" : "")}
            placeholder="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {failed && (
            <p className="text-red-500 text-xs italic">
              Incorrect Username or password
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md mt-3 w-1/4 self-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
