import "./home.css"
import Navbar from "../../components/navbar/navbar"
import Header from "../../components/header/header"
import Featured from "../../components/featured/Featured"
import PropertyList from "../../components/propertyList/PropertyList"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <MailList />
        <Footer/>
      </div>
    </div>
  )
}

export default Home