'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./components/nav";
import Layout from "./components/layout";


export default function Home() {
  const {data: session} = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>Hello, <b>{session?.user?.name}</b></h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-md">
          <img src={session?.user?.image} alt="profile picture" className="w-6 h-6 rounded-md" />
          <span className="px-2">{session?.user?.name}</span>
        </div>
        
      </div>
    </Layout>
  )

  
}
