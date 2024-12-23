"use client"
import { useSession } from "next-auth/react";



export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <div className="">
   {
    session.status === "authenticated" ? (
      <div>
        <h1 className="text-2xl font-bold">Welcome,  
          
          {JSON.stringify(session.data?.user)}
          </h1>     
      </div>
    ) : (
      <div>
        <h1 className="text-2xl font-bold">Welcome, Guest</h1>
      </div>
    ) 
   }
    </div>
  );
}
