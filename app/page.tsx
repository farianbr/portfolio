import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import RecentBlogPosts from '@/components/sections/RecentBlogPosts';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <RecentBlogPosts />
    </>
  );
}
