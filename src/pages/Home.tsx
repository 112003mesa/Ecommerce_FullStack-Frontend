import BestSeller from "../components/com/BestSeller"
import Hero from "../components/com/Hero"
import LatestCollection from "../components/com/LatestCollection"
import NewsLetterBox from "../components/com/NewsLetterBox"
import OurPolicy from "../components/com/OurPolicy"

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home