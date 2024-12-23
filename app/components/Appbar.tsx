'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
export  function  Login() {
  return <Link href="/api/auth/signin" className="text-white px-4 py-2 bg-blue-500 rounded">Login</Link>;
}
export  function Signup() {
  return <Link href="/signup" className="text-white px-4 py-2 bg-blue-500 rounded">Signup</Link>;
}       

export const Appbar = () => {
  const session = useSession();
  console.log(session); 
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 w-full">
      <h1 className="text-white text-xl font-bold">MyApp</h1>
      <div className="flex items-center space-x-4">
        {
          session.status === "authenticated" ? (
          <>
            <div>
              <h1 className="text-white px-4 py-2 bg-blue-500 rounded">Welcome, {session?.data?.user?.name}</h1>
            </div>
            <div>
            <button className="text-white px-4 py-2 bg-blue-500 rounded" onClick={() => signOut()}>Sign out</button>
          </div></>
          ) : (
            <div>
              <Login />
            </div>
          ) 
        }

        <Signup />
      </div>
    </div>
  );
};
