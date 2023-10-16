"use client";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { useEffect } from "react";

import { useSupabase } from "@/lib/context/SupabaseProvider";
import { redirectToPreviousPageOrChatPage } from "@/lib/helpers/redirectToPreviousPageOrChatPage";

import Features from "./Features";
import Hero from "./Hero";
import { HomeHeader, HomeSection } from "./components";

/* eslint-disable max-lines */
const HomePage = (): JSX.Element => {
  const { session } = useSupabase();

  useEffect(() => {
    if (session?.user !== undefined) {
      redirectToPreviousPageOrChatPage();
    }
  }, [session?.user]);

  const isNewHomePage = useFeatureIsOn("new-homepage-activated");

  if (isNewHomePage) {
    return (
      <>
        <div data-testid="home-page" className="relative">
          <HomeHeader />

          <main className="relative flex flex-col items-center">
            <section className="flex flex-col md:flex-row items-center max-w-6xl pb-4">
              <div>
                <h1 className="text-5xl font-bold">
                  Get a second brain with Quivr
                </h1>
                <p>Upload all your files and start talking with them.</p>
                <button className="text-white bg-black rounded-full px-4 py-2 mx-2">
                  Try free demo
                </button>
                <button className="font-semibold px-4 py-2 mx-2">
                  Contact sales team
                </button>
              </div>
              <div className="w-[80vw] md:w-[400px] h-[80vw] md:h-[400px] bg-slate-200 rounded flex flex-col items-center justify-center">
                <p>💻 📱 Laptop / mobile image</p>
                <div className="mx-auto my-5 p-5 w-min-content bg-yellow-100 rounded-lg">
                  🚧 New homepage in progress 🚧
                </div>
              </div>
            </section>

            <HomeSection
              bg="bg-[#FCFAF6]"
              slantAfter="down"
              hiddenOnMobile={true}
            >
              <h2 className="text-2xl text-center">Demo vidéo</h2>
              <div className="w-[80vw] md:w-[400px] h-[80vw] md:h-[400px] bg-slate-200 rounded flex items-center justify-center">
                🍿 Vidéo
              </div>
            </HomeSection>

            <HomeSection bg="bg-[#362469]" slantCurrent="down">
              <h2 className="text-2xl text-center text-white">
                Experience it now
              </h2>
              <div className="w-[80vw] md:w-[400px] h-[80vw] md:h-[400px] bg-slate-200 rounded flex items-center justify-center">
                <div>
                  <p className="text-center">📦 Content</p>
                  <p>Check our exemple on using quivr</p>
                  <h3>Research and studies</h3>
                  <p>Quivr is your indispensable companion.</p>
                  <h3>Legal research</h3>
                  <p>Your ultimate digital ally in the field</p>
                  <h3>Sales</h3>
                  <p>Placeholder</p>
                  <h3>Consulting</h3>
                  <p>Placeholder</p>
                  <button>Try free demo</button>
                </div>
              </div>
            </HomeSection>

            <HomeSection bg="bg-white" slantBefore="down" slantAfter="up">
              <div className="w-[80vw] md:w-[400px] h-[80vw] md:h-[400px] bg-slate-200 rounded flex items-center justify-center mt-5">
                🛡️ Security and privacy
              </div>
            </HomeSection>

            <HomeSection bg="bg-[#FCFAF6]" slantCurrent="up">
              <h2 className="text-2xl text-center">
                What people say about Quivr
              </h2>
              <div className="w-[80vw] md:w-[400px] h-[80vw] md:h-[400px] bg-slate-200 rounded flex items-center justify-center">
                💬 Testimonials
              </div>
            </HomeSection>

            <HomeSection
              bg="bg-gradient-to-b from-[#6300FF] to-[#D07DF9]"
              slantBefore="up"
            >
              <h2 className="text-2xl text-center text-white">
                Get started today
              </h2>
              <div className="w-[80vw] md:w-[400px] h-[80vw] md:h-[400px] bg-slate-200 rounded flex items-center justify-center">
                ⬇️ Footer
              </div>
            </HomeSection>
          </main>
        </div>
      </>
    );
  } else {
    return (
      <main data-testid="home-page">
        <Hero />
        <Features />
      </main>
    );
  }
};

export default HomePage;
