import React, { useContext } from 'react'
import "./home.css"
import Feed from '../../components/feed/Feed'
import Leftbar from '../../components/leftbar/Leftbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'

const Home = () => {
  const {user} = useContext(AuthContext);
  return (
  <>
    <Topbar user={user}/>
    <div className="homeContainer">
      <Leftbar/>
      <Feed/>
      <Rightbar/>
    </div>
  </>

  )
}

export default Home