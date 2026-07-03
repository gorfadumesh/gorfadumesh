import { Model3D } from './canvas/Model3D'
import { NavBar } from './components/NavBar'
import { HeroSection } from './sections/HeroSection'
import { ProjectSection } from './sections/ProjectSection'
import { FooterSection } from './sections/FooterSection'
import { BackgroundImages } from './components/BackgroundImages'

function App() {
  return (
    <main className="relative">
      <BackgroundImages />
      <Model3D />
      <NavBar />
      <HeroSection />
      <ProjectSection />
      <FooterSection />
    </main>
  )
}

export default App
