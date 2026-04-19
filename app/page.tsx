"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [heroImageVisible, setHeroImageVisible] = useState(true);
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const [brandLogoVisible, setBrandLogoVisible] = useState(true);
  const [mailImageVisible, setMailImageVisible] = useState(true);
  const [count, setCount] = useState(0);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.5 } // 50% visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    const duration = 1200;
    const end = 350;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      const eased = easeOut(progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated]);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1200;
    const end = 350;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      const eased = easeOut(progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingHeader(window.scrollY > 140);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleMore = () => setMoreOpen(!moreOpen);
  const closeMore = () => setMoreOpen(false);
  const handleMobileNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    closeMenu();

    requestAnimationFrame(() => {
      const target = document.querySelector(targetId);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const fundMeMommyInstagram = "https://www.instagram.com/fundmemommy/";
  const fundMeMommyTwitter = "https://x.com/fundmemommy";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-base-100 text-foreground">
      {/* Sticky Header */}
      <header
        id="header"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          showFloatingHeader
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 rounded-full border border-base-300 bg-base-100/92 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.08)] backdrop-blur-md sm:px-6 sm:py-4">
            <a
              href="#hero"
              className="min-w-0 shrink-0"
              aria-label="FundMeMommy home"
            >
              {brandLogoVisible ? (
                <Image
                  src="/brand-logo.png"
                  alt="FundMeMommy"
                  className="h-10 w-auto object-contain sm:h-12"
                  width={240}
                  height={72}
                  onError={() => setBrandLogoVisible(false)}
                />
              ) : (
                <span className="inline-flex rounded-full border-2 border-foreground bg-base-100 px-4 py-1 text-base font-bold tracking-tight shadow-[3px_3px_0_0_rgba(9,9,11,1)] sm:text-xl">
                  FundMeMommy
                </span>
              )}
            </a>
            <nav className="hidden md:flex space-x-8">
              <a href="#hero" className="transition hover:text-muted-text">
                Home
              </a>
              <a href="#about" className="transition hover:text-muted-text">
                About
              </a>
              <a href="#this-week" className="transition hover:text-muted-text">
                This Week
              </a>
              <a href="#prev" className="transition hover:text-muted-text">
                Prev
              </a>
              <a href="#faq" className="transition hover:text-muted-text">
                Contact Us
              </a>
            </nav>
            <div className="flex shrink-0 items-center space-x-3">
              <a
                href="#faq"
                className="hidden rounded-full bg-foreground px-4 py-2 text-base-100 transition hover:bg-opacity-80 md:block"
              >
                Subscribe
              </a>
              <button
                onClick={toggleMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 text-foreground transition hover:translate-y-0 hover:bg-base-200 md:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                style={{
                  background: "transparent",
                  color: "inherit",
                  padding: 0,
                }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-70 bg-base-100 md:hidden"
            onClick={toggleMenu}
          >
            <div
              className="fixed inset-0 flex h-full w-full flex-col bg-base-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-base-300 px-4 py-4">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-text">
                  Menu
                </div>
                <button
                  onClick={closeMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 text-foreground transition hover:translate-y-0 hover:bg-base-200"
                  aria-label="Close menu"
                  style={{
                    background: "transparent",
                    color: "inherit",
                    padding: 0,
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-2 bg-base-100 px-6 py-8 text-2xl">
                <a
                  href="#hero"
                  className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  onClick={(e) => handleMobileNav(e, "#hero")}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  onClick={(e) => handleMobileNav(e, "#about")}
                >
                  About
                </a>
                <a
                  href="#this-week"
                  className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  onClick={(e) => handleMobileNav(e, "#this-week")}
                >
                  This Week
                </a>
                <a
                  href="#prev"
                  className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  onClick={(e) => handleMobileNav(e, "#prev")}
                >
                  Prev
                </a>
                <a
                  href="#faq"
                  className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  onClick={(e) => handleMobileNav(e, "#faq")}
                >
                  Contact Us
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center bg-linear-to-b from-base-100 to-base-200 px-4 py-16 text-left sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
            <div className="max-w-sm">
              <p className="text-lg leading-tight text-foreground sm:text-xl">
                A digital publication that...
              </p>
              <p className="text-lg font-bold leading-tight text-foreground sm:text-xl">
                helps people discover tech projects worth their attention
              </p>
            </div>
            <div className="flex justify-start lg:justify-center">
              <a
                href="#hero"
                className="inline-block"
                aria-label="FundMeMommy home"
              >
                {brandLogoVisible ? (
                  <Image
                    src="/brand-logo.png"
                    alt="FundMeMommy"
                    className="h-16 w-auto object-contain sm:h-20"
                    width={320}
                    height={96}
                    onError={() => setBrandLogoVisible(false)}
                  />
                ) : (
                  <span className="inline-flex rounded-full border-2 border-foreground bg-base-100 px-6 py-2 text-2xl font-bold tracking-tight shadow-[4px_4px_0_0_rgba(9,9,11,1)]">
                    FundMeMommy
                  </span>
                )}
              </a>
            </div>
            <div className="relative flex flex-wrap items-center gap-3 lg:justify-end">
              <a
                href="#about"
                className="inline-flex rounded-full border-2 border-foreground bg-base-100 px-5 py-2 text-sm font-bold transition hover:-translate-y-0.5"
              >
                About
              </a>
              <a
                href="#faq"
                className="inline-flex rounded-full border-2 border-foreground bg-base-100 px-5 py-2 text-sm font-bold transition hover:-translate-y-0.5"
              >
                Subscribe
              </a>
              <button
                type="button"
                onClick={toggleMore}
                className="inline-flex rounded-full border-2 border-foreground bg-base-100 px-5 py-2 text-sm font-bold text-foreground transition hover:-translate-y-0.5 cursor-pointer"
              >
                More
              </button>
              {moreOpen && (
                <div className="top-full z-20 mt-3 flex w-full min-w-60 flex-col gap-3 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.08)] lg:absolute lg:right-0 lg:w-auto">
                  <a
                    href={fundMeMommyInstagram}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMore}
                    className="rounded-2xl border border-base-300 px-4 py-3 text-sm font-bold transition hover:bg-base-200"
                  >
                    Instagram
                  </a>
                  <a
                    href={fundMeMommyTwitter}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMore}
                    className="rounded-2xl border border-base-300 px-4 py-3 text-sm font-bold transition hover:bg-base-200"
                  >
                    Twitter / X
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:space-x-12">
            <div className="w-full md:w-2/3">
              <h1 className="my-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
                Your mommy didn&apos;t approve your idea, <br /> but we will.
              </h1>
              <p className="mb-8 text-base text-muted-text sm:text-lg">
                Not just another newsletter. We also review tech projects worth
                your attention so that you can doomscroll instead. Founders get
                visibility. You get to stay ahead in the game.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-center sm:gap-2"
              >
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-base-300 px-4 py-3 sm:w-2/3 sm:min-w-0"
                  required
                />
                <button
                  type="submit"
                  className="rounded-full bg-black px-6 py-3 font-bold text-white transition-colors hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <p className="mt-4 text-sm text-muted-text">
                Join 350+ readers worldwide now
              </p>
            </div>
            <a
              href="https://www.adden.ai/"
              target="_blank"
              rel="noreferrer"
              className="group flex w-full flex-col items-center my-10 md:w-1/3"
            >
              <Image
                src="/addenai.png"
                alt="Project preview"
                className="w-full max-w-88 object-contain rounded-lg"
                width={1280}
                height={720}
              />

              <p className="mt-4 text-lg font-bold transition group-hover:underline">
                Project of the Day
              </p>
            </a>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="bg-base-100 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          {/* Heading (fixed) */}
          <div className="mb-12 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 inline-block rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-foreground">
                About Us
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                About FundMeMommy
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-4xl border border-base-300 bg-base-100 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
              <p className="text-lg leading-8 text-foreground">
                FundMeMommy is a newsletter and project discovery space for
                people who want useful signals without digging through endless
                noise. It highlights noteworthy tech projects, gives founders a
                place to get visibility, and turns scattered updates into a
                simpler read.
              </p>
              <p className="mt-5 text-lg leading-8 text-muted-text">
                The product exists to educate and promote projects, stay free to
                access, and help readers stay ahead without doing all the
                searching themselves. In short: we research so you can scroll
                twitter.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
                <h3 className="mb-2 font-bold">What it does</h3>
                <p className="text-muted-text">
                  Surfaces useful tech projects, reviews what is worth paying
                  attention to, and packages it into a cleaner newsletter-style
                  format.
                </p>
              </div>

              <div
                id="more"
                className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-3 font-bold">More</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={fundMeMommyInstagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-base-300 px-4 py-3 font-semibold transition hover:bg-base-200"
                  >
                    Instagram
                  </a>
                  <a
                    href={fundMeMommyTwitter}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-base-300 px-4 py-3 font-semibold transition hover:bg-base-200"
                  >
                    Twitter / X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Stats Section */}
      <section
        id="features"
        className="relative overflow-hidden bg-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-radial from-base-300/20 to-transparent"></div>
        {/* Ticker */}
        <div className="mb-12 overflow-hidden border-y border-base-300 bg-base-100 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex animate-scroll whitespace-nowrap">
            <div className="flex items-center space-x-6">
              {[
                "TECH PROJECTS",
                "FOUNDER VISIBILITY",
                "INVESTOR INSIGHTS",
                "WEEKLY BRIEF",
                "HIGH-SIGNAL READS",
              ].map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-6 text-base font-medium text-foreground sm:text-lg"
                >
                  {item}
                  {index < 4 && <span className="text-muted-text">•</span>}
                </span>
              ))}
            </div>
            <div className="ml-6 flex items-center space-x-6">
              <span className="text-muted-text">•</span>
              {[
                "TECH PROJECTS",
                "FOUNDER VISIBILITY",
                "INVESTOR INSIGHTS",
                "WEEKLY BRIEF",
                "HIGH-SIGNAL READS",
              ].map((item, index) => (
                <span
                  key={`dup-${index}`}
                  className="inline-flex items-center gap-6 text-base font-medium text-foreground sm:text-lg"
                >
                  {item}
                  {index < 4 && <span className="text-muted-text">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Stats Card */}
        <div className="relative z-10 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-base-300 bg-base-100 p-8 text-center transition-shadow hover:shadow-lg sm:max-w-md sm:p-12">
            <div ref={statsRef} className="mb-2 text-4xl font-bold">
              {count}
            </div>
            <div className="text-sm uppercase text-muted-text">
              Total readers
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Benefits Section */}
      <section
        id="newsletter-benefits"
        className="relative overflow-hidden bg-gradient-subtle px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-radial from-base-200/20 to-transparent"></div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-foreground">
              About this newsletter
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              What You Get
            </h2>
            <p className="text-muted-text">The Deal</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-2xl font-bold">01</span>
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm">
                  Project Spotlight
                </span>
              </div>
              <h3 className="font-bold">
                We dig up 10 indie tech projects you haven&apos;t heard of yet
              </h3>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-2xl font-bold">02</span>
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm">
                  Founder Story
                </span>
              </div>
              <h3 className="font-bold">
                The person behind the project gets their share of fame
              </h3>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-2xl font-bold">03</span>
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm">
                  Sunday Drop
                </span>
              </div>
              <h3 className="font-bold">
                Lands in your inbox on time just like your mom (with food)
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* This Week Section */}
      <section
        id="this-week"
        className="bg-linear-to-b from-base-100 to-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-base-300 px-4 py-2 text-sm font-medium text-foreground">
              This Week
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">Coming Soon</h2>
          </div>
        </div>
      </section>

      {/* Prev Section */}
      <section
        id="prev"
        className="bg-gradient-subtle px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-base-300 px-4 py-2 text-sm font-medium text-foreground">
              Previous Issues
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">Coming Soon</h2>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative overflow-hidden bg-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-radial from-base-300/20 to-transparent"></div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-base-300 px-4 py-2 text-sm font-medium text-foreground">
              Some questions your mom would ask
            </div>
            <p className="mx-auto mb-6 max-w-2xl text-muted-text">
              fund me mommy is a website meant to educate and promote your
              projects, it&apos;s free of cost, so your mommy would approve too
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
            <div className="grid gap-6">
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
                <h3 className="mb-2 font-bold">What is FMM about?</h3>
                <p className="text-muted-text">
                  A concise briefing on the most important shifts in technology
                  and marketing: what changed, why it matters and how to act on
                  it.
                </p>
              </div>
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
                <h3 className="mb-2 font-bold">Who is it for?</h3>
                <p className="text-muted-text">
                  Passionate tech enthusiasts, founders looking to get traction
                  and your mom.
                </p>
              </div>
            </div>
            <div className="w-full rounded-4xl border border-base-300 bg-base-100 px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <div className="mail-tilt-wrapper mb-5 flex justify-center">
                {mailImageVisible ? (
                  <Image
                    src="/mail-image.png"
                    alt="Subscribe by mail"
                    className="mail-tilt h-32 w-auto object-contain sm:h-36 rounded-4xl"
                    width={320}
                    height={320}
                    onError={() => setMailImageVisible(false)}
                  />
                ) : (
                  <div className="mail-tilt flex h-28 w-28 items-center justify-center rounded-4xl border-2 border-foreground bg-[#f8d8e7] text-5xl shadow-[4px_4px_0_0_rgba(9,9,11,1)]">
                    ✉
                  </div>
                )}
              </div>
              <h3 className="mb-4 text-3xl font-bold leading-tight">
                Subscribe
              </h3>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col items-center gap-3"
              >
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-3/4 max-w-88 rounded-2xl border border-base-300 px-4 py-3 text-center"
                  required
                />
                <button
                  type="submit"
                  className="w-3/4 rounded-full bg-black px-6 py-3 font-bold text-white transition-colors hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
            <div className="grid gap-6">
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
                <h3 className="mb-2 font-bold">How often do you send it?</h3>
                <p className="text-muted-text">
                  Once a week. Enough to stay ahead, not enough to flood your
                  inbox.
                </p>
              </div>
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
                <h3 className="mb-2 font-bold">Is it free?</h3>
                <p className="text-muted-text">
                  Yes. Subscribe for free and get the full newsletter every
                  week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="bg-linear-to-r from-base-300 to-base-200 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-3">
                {brandLogoVisible ? (
                  <a
                    href="#hero"
                    className="inline-block"
                    aria-label="FundMeMommy home"
                  >
                    <Image
                      src="/brand-logo.png"
                      alt="FundMeMommy"
                      className="h-12 w-auto object-contain"
                      width={240}
                      height={72}
                      onError={() => setBrandLogoVisible(false)}
                    />
                  </a>
                ) : (
                  <a
                    href="#hero"
                    className="inline-flex rounded-full border-2 border-foreground bg-base-100 px-5 py-1 text-xl font-bold tracking-tight shadow-[4px_4px_0_0_rgba(9,9,11,1)]"
                    aria-label="FundMeMommy home"
                  >
                    FundMeMommy
                  </a>
                )}
              </div>
              <p className="text-muted-text">
                we research so you can scroll twitter.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">NAVIGATION</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#this-week"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    This Week
                  </a>
                </li>
                <li>
                  <a
                    href="#prev"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    Previous Issues
                  </a>
                </li>
                <li>
                  <a
                    href="#hero"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 sm:max-w-sm">
              <h3 className="mb-2 font-bold">Ready for the next drop?</h3>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="do it, make your mommy proud"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-base-300 px-4 py-3"
                  required
                />
                <button
                  type="submit"
                  className="rounded-full bg-foreground px-6 py-3 text-base-100 transition hover:bg-opacity-80"
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-base-300 pt-4">
            <p className="text-sm text-muted-text">
              © 2026 fundmemommy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
      <Toaster />
    </div>
  );
}
