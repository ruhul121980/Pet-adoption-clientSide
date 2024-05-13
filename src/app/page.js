import HomeHeroSection from "@/components/home/HomeHeroSection";
import PetAccessoriesSection from "@/components/home/PetAccessoriesSection";
import PetAdoptionSection from "@/components/home/PetAdoptionSection";
import VeterinarianSection from "@/components/home/VeterinarianSection";
 
export default function Home() {
  return (
    <main  className="min-h-screen">
      <HomeHeroSection/>
      <PetAdoptionSection/>
      <PetAccessoriesSection/>
      <VeterinarianSection/> 
    </main>
  );
}
