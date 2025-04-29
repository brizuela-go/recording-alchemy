"use client";

import { motion } from "framer-motion";
import AboutSection from "./components/AboutSection";
import CommunityForm from "./components/CommunityForm";
import CoursePricingSection from "./components/CoursePricingSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import InfiniteTestimonials from "./components/InfiniteTestimonials";
import RealStoriesVideos from "./components/RealStoriesVideos";
import TestimonialsSection from "./components/TestimonialsSection";
import TransformationalRecordingExperiences from "./components/TransformationalRecordingExperiences";

// Animation variants for section transitions
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Wrapper component for animating each section
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px 0px" }}
      variants={{
        hidden: sectionVariants.hidden,
        visible: {
          ...sectionVariants.visible,
          transition: {
            ...sectionVariants.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />

      <AnimatedSection delay={0.1}>
        <AboutSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <FeaturesSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <RealStoriesVideos />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <CoursePricingSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <TransformationalRecordingExperiences />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <InfiniteTestimonials />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <CommunityForm />
      </AnimatedSection>

      <Footer />
    </div>
  );
}
