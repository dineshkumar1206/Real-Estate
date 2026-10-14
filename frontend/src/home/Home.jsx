import Hero from './Hero'
import FastMovingProjects from './Fastmovingprojects'
import EverythingYouNeed from './Everythingyouneed'
import ExclusiveProjects from './ExclusiveProject'
import LatestPropertyLaunches from './LatestPropertyLaunches'

function Home() {
  return (
    <div>

      <Hero/>
      <ExclusiveProjects/>
      <FastMovingProjects/>
      <EverythingYouNeed/>
      <LatestPropertyLaunches/>
    </div>
  )
}

export default Home