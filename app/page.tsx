import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
// import Introduction from "@/components/sections/Introduction";
import Life from "@/components/sections/Life";
// import Code from "@/components/sections/Code";
import Music from "@/components/sections/Music";
import Books from "@/components/sections/Books";
import Games from "@/components/sections/Games";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        {/* <Introduction /> */}
        <Life />
        {/* <Code /> */}
        <Music />
        <Books />
        <Games />
        <Contact />
      </main>
    </>
  );
}
