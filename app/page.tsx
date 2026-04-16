'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState(''); // Ensure email state is initialized as an empty string
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log('API Response:', data); // Debugging log

      if (res.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-foreground">
      {/* Sticky Header */}
      <header id="header" className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold">fund me mommy.</div>
            <nav className="hidden md:flex space-x-8">
              <a href="#hero" className="hover:text-muted-text transition">Home</a>
              <a href="#this-week" className="hover:text-muted-text transition">This Week</a>
              <a href="#features" className="hover:text-muted-text transition">Stats</a>
              <a href="#faq" className="hover:text-muted-text transition">Contact Us</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="#hero" className="hidden md:block bg-foreground text-base-100 px-4 py-2 rounded-full hover:bg-opacity-80 transition">Subscribe</a>
              <button onClick={toggleMenu} className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMenu}>
            <div className="fixed right-0 top-0 h-full w-64 bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out">
              <div className="p-4">
                <button onClick={toggleMenu} className="float-right p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <nav className="mt-8 space-y-4">
                  <a href="#hero" className="block hover:text-muted-text transition">Home</a>
                  <a href="#this-week" className="block hover:text-muted-text transition">This Week</a>
                  <a href="#features" className="block hover:text-muted-text transition">Stats</a>
                  <a href="#faq" className="block hover:text-muted-text transition">Contact Us</a>
                  <a href="#hero" className="block bg-foreground text-base-100 px-4 py-2 rounded-full text-center hover:bg-opacity-80 transition">Subscribe</a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-b from-base-100 to-base-200 py-20 px-4 sm:px-6 lg:px-8 flex items-center text-left">
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-start md:space-x-12">
          <div className="md:w-2/3">
            <h1 className="text-5xl sm:text-6xl font-bold font-space-grotesk mb-6">Your mommy didn't approve your idea, but we will.</h1>
            <p className="text-lg font-inter text-muted-text mb-8">Not just another newsletter. We also review tech projects worth your attention so that you don't. Founders get visibility. You get to stay ahead in the game.</p>
            <form onSubmit={handleSubscribe} className="flex justify-start items-center space-x-2">
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-full border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-2/3 sm:w-1/2 font-inter"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors font-inter"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            <p className="text-sm text-muted-text mt-4 font-inter">Join 00,350+ readers worldwide now</p>
          </div>
          <div className="md:w-1/3 flex flex-col items-center mt-10 md:mt-0">
            <div className="w-80 h-80 bg-white shadow-lg rounded-lg flex items-center justify-center">
              <img src="/hero.jpg" alt="Hero" className="w-full h-full object-contain rounded-lg" />
            </div>
            <p className="mt-4 text-lg font-space-grotesk font-bold">Project of the Day</p>
          </div>
        </div>
      </section>

      {/* Features / Stats Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-base-300/20 to-transparent"></div>
        {/* Ticker */}
        <div className="border-t border-b border-base-300 bg-base-100 py-8 px-4 sm:px-6 lg:px-8 mb-12 overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            <div className="flex items-center space-x-6">
              {['TECH PROJECTS', 'FOUNDER VISIBILITY', 'INVESTOR INSIGHTS', 'WEEKLY BRIEF', 'HIGH-SIGNAL READS'].map((item, index) => (
                <span key={index} className="text-foreground font-medium text-base sm:text-lg inline-flex items-center gap-6">
                  {item}
                  {index < 4 && <span className="text-muted-text">•</span>}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-6 ml-6">
              {['TECH PROJECTS', 'FOUNDER VISIBILITY', 'INVESTOR INSIGHTS', 'WEEKLY BRIEF', 'HIGH-SIGNAL READS'].map((item, index) => (
                <span key={`dup-${index}`} className="text-foreground font-medium text-base sm:text-lg inline-flex items-center gap-6">
                  {item}
                  {index < 4 && <span className="text-muted-text">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Stats Card */}
        <div className="flex justify-center relative z-10">
          <div className="bg-base-100 border border-base-300 rounded-2xl p-12 text-center hover:shadow-lg transition-shadow max-w-sm w-full sm:max-w-md">
            <div className="text-4xl font-bold mb-2">350</div>
            <div className="text-muted-text uppercase text-sm">Total readers</div>
          </div>
        </div>
      </section>

      {/* Newsletter Benefits Section */}
      <section id="newsletter-benefits" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 bg-gradient-radial from-base-200/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-base-200 text-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">About this newsletter</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-space-grotesk">What You Get</h2>
            <p className="text-muted-text font-inter">The Deal</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-bold font-space-grotesk">01</span>
                <span className="bg-base-200 px-3 py-1 rounded-full text-sm font-inter">Project Spotlight</span>
              </div>
              <h3 className="font-bold mb-2 font-inter">We dig up 10 indie tech projects you haven't heard of yet</h3>
            </div>
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-bold font-space-grotesk">02</span>
                <span className="bg-base-200 px-3 py-1 rounded-full text-sm font-inter">Founder Story</span>
              </div>
              <h3 className="font-bold mb-2 font-inter">The person behind the project gets their share of fame</h3>
            </div>
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-bold font-space-grotesk">03</span>
                <span className="bg-base-200 px-3 py-1 rounded-full text-sm font-inter">Sunday Drop</span>
              </div>
              <h3 className="font-bold mb-2 font-inter">Lands in your inbox on time just like your mom</h3>
            </div>
          </div>
        </div>
      </section>

      {/* This Week Section */}
      <section id="this-week" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-base-100 to-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-base-100 text-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">This Week</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Coming Soon</h2>
          </div>
        </div>
      </section>

      {/* Prev Section */}
      <section id="prev" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-base-200 text-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">Previous Issues</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Coming Soon</h2>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-base-300/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto flex flex-col relative z-10">
          <div className="mb-12 text-center">
            <div className="inline-block bg-base-200 text-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">SOME QUESTIONS YOUR MOM WOULD ASK</div>
            <p className="text-muted-text mb-6 max-w-2xl mx-auto">
              fund me mommy is a website meant to educate and promote your projects, it's free of cost, so your mommy would approve too
            </p>
            <a href="#hero" className="inline-flex items-center text-foreground hover:text-muted-text transition">
              Go to signup
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">What is FMM about?</h3>
              <p className="text-muted-text">A concise briefing on the most important shifts in technology and marketing: what changed, why it matters and how to act on it.</p>
            </div>
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Who is it for?</h3>
              <p className="text-muted-text">Passionate tech enthusiasts, founders looking to get traction and your mom.</p>
            </div>
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">How often do you send it?</h3>
              <p className="text-muted-text">Once a week. Enough to stay ahead, not enough to flood your inbox.</p>
            </div>
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Is it free?</h3>
              <p className="text-muted-text">Yes. Subscribe for free and get the full newsletter every week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gradient-to-r from-base-300 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="text-xl font-bold mb-2">FMM</div>
              <p className="text-muted-text">STOP SLEEPING. START KNOWING.</p>
            </div>
            <div className="mb-6 lg:mb-0">
              <h3 className="font-bold mb-4">NAVIGATION</h3>
              <ul className="space-y-2">
                <li><a href="#this-week" className="text-muted-text hover:text-foreground transition">This Week</a></li>
                <li><a href="#prev" className="text-muted-text hover:text-foreground transition">Previous Issues</a></li>
                <li><a href="#hero" className="text-muted-text hover:text-foreground transition">Home</a></li>
                <li><a href="#faq" className="text-muted-text hover:text-foreground transition">Contact Us</a></li>
              </ul>
            </div>
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
              <h3 className="font-bold mb-2">Ready for the next drop?</h3>
              <p className="text-muted-text mb-4">SUBSCRIBE BELOW. YOUR MOM WOULD BE PROUD.</p>
              <a href="#hero" className="bg-foreground text-base-100 px-6 py-3 rounded-full hover:bg-opacity-80 transition inline-block">Subscribe now</a>
            </div>
          </div>
          <div className="border-t border-base-200 pt-4">
            <p className="text-muted-text text-sm">© 2026 fundmemommy. All rights reserved.</p>
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
