"use client";
import { Container } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import SigninButton from "@/components/SignButton";
import { useSession } from "next-auth/react"; 

const Navbar = () => {
  const [credit, setCredit] = useState(0);
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false); 

  useEffect(() => {
    async function fetchData() {
      if (session?.user) {
        try {
          const response = await axios.post("/api/user-credit", { email: session.user.email, name: session.user.name }); 
          const data = response.data; 
          setCredit(data.credits);
        } catch (error) {
          console.error("Error fetching user data:", error); 
        }
      }
    }

    fetchData(); 
  }, [session]);

  const toggleNav = () => {
    setShowNav((prev) => !prev); 
  };

  return (
    <header className="px-4 h-16 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
          <div className="flex items-start">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-medium">DirectReach AI ✨</span>
            </Link>
          </div>


          <nav className="md:hidden">
            <button 
              className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={toggleNav} 
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </nav>

          <nav className="hidden md:block">
            <ul className="flex items-center justify-center gap-8">
              <Link href="/discover" className="hover:text-foreground/80 text-sm">
                Discover
              </Link>
              <Link href="/finder" className="hover:text-foreground/80 text-sm">
                Finder
              </Link>
              <Link href="/pricing" className="hover:text-foreground/80 text-sm">
                Pricing
              </Link>
            </ul>
          </nav>

          {showNav && (
            <nav className="absolute left-0 top-full w-full bg-zinc-900 z-10">
              <ul className="flex flex-col items-center justify-center gap-4 p-4">
                <Link href="#" className="hover:text-foreground/80 text-sm" onClick={() => setShowNav(false)}>
                  About
                </Link>
                <Link href="/discover" className="hover:text-foreground/80 text-sm" onClick={() => setShowNav(false)}>
                  Discover
                </Link>
                <Link href="#" className="hover:text-foreground/80 text-sm" onClick={() => setShowNav(false)}>
                  Verifier
                </Link>
                <Link href="/finder" className="hover:text-foreground/80 text-sm" onClick={() => setShowNav(false)}>
                  Finder
                </Link>
                <Link href="/pricing" className="hover:text-foreground/80 text-sm" onClick={() => setShowNav(false)}>
                  Pricing
                </Link>
              </ul>
            </nav>
          )}

          <div className="flex items-center gap-4">
            <div className="relative inline-flex h-10 cursor-pointer overflow-hidden rounded-full p-[2px] focus:outline-none select-none text-2xl">
              <span className="relative border-2 inline-flex h-full w-full items-center justify-between rounded-full bg-slate-950 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-lg shadow-inner">
                <img src="icons/star.png" alt="profile" className="w-6 h-6 object-contain mr-2" />
                {credit}
              </span>
            </div>

            <Link
              href={""}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              <SigninButton />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
