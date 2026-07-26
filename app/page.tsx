import Hero from '@/components/sections/Hero';
import StackSection from '@/components/sections/StackSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import RecentBlogPosts from '@/components/sections/RecentBlogPosts';

export default function Home() {
  return (
    <>
      <Hero />
      <StackSection />
      <ProjectsSection />
      <RecentBlogPosts />
    </>
  );
}
