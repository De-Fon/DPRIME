import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import ProjectsGrid from "../components/ProjectsGrid";
import ServicesGrid from "../components/ServicesGrid";
import ProcessSteps from "../components/ProcessSteps";
import TeamGrid from "../components/TeamGrid";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProjectsGrid />
      <ServicesGrid />
      <ProcessSteps />
      <TeamGrid />
      <ContactForm />
    </>
  );
}
