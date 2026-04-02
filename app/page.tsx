"use client";
import "./lib/18n";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { InViewSection } from "./components/motion";
import { About } from "./components/about";
import { Experience } from "./components/experience";
import { AbsCerts } from "./components/abs-certs";
import Projects from "./components/projects";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { LatestOnBlog } from "./components/last-on-blog";
import { ReactNode } from "react";

const PageSection = ({
  children,
  withAnimation = true,
}: {
  children: ReactNode;
  withAnimation?: boolean;
}) => {
  const content = (
    <div className="w-full border-b border-border px-4 sm:px-12">
      <div className="page-section-surface mx-auto w-full max-w-6xl border-x border-border bg-background px-4 py-12 sm:px-8">
        {children}
      </div>
    </div>
  );

  if (!withAnimation) {
    return content;
  }

  return <InViewSection>{content}</InViewSection>;
};

export default function Portfolio() {
  return (
    <div className="w-full flex justify-center flex-col items-center dotted-bg select-none">
      <section className="flex flex-col items-center min-h-screen w-full">
        <Header></Header>

        <div className="hero-wave-bg border-border flex flex-col border-b w-full items-center mx-auto text-center sm:px-12 px-4">
          <InViewSection>
            <Hero></Hero>
          </InViewSection>
        </div>

        <PageSection withAnimation={false}>
          <About></About>
        </PageSection>

        <PageSection withAnimation={false}>
          <Projects></Projects>
        </PageSection>

        <PageSection withAnimation={false}>
          <LatestOnBlog></LatestOnBlog>
        </PageSection>

        <div className="wave-two-bg w-full flex flex-col items-center">
          <PageSection>
            <Experience></Experience>
          </PageSection>

          <PageSection>
            <AbsCerts></AbsCerts>
          </PageSection>

          <PageSection withAnimation={false}>
            <Contact></Contact>
          </PageSection>
        </div>
      </section>
      <Footer style="black"></Footer>
    </div>
  );
}
