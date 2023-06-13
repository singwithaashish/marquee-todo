import React, { useContext, useState, SyntheticEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const {login} = useAuth()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const a = login(username, password);
    } catch (error) {
      console.error("Failed to login", error);
    }
  }


  const inputClasses = "border border-gray-300 mt-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent";

  return (
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-6xl my-20 font-bold">Todo App - Login</h1>
    <form onSubmit={handleSubmit} className='flex flex-col max-w-6xl'>
      <input className={inputClasses} placeholder='username' required value={username} onChange={e => setUsername(e.target.value)} />
      <input className={inputClasses} placeholder='password' required type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className='bg-blue-600 text-white p-2 rounded-md mt-3 w-1/4 self-center'
      >
        Login</button>
    </form>
    </div>
  );
}

export default Login;
