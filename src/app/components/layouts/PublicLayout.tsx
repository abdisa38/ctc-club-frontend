import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button";
import { Menu, X, Github, Twitter, Linkedin, Instagram, Mail, ArrowRight, ArrowUpRight } from "lucide-react";
import { Input } from "../ui/Input";
import { toast } from "sonner";
import ctcLogo from "../../../assets/f6c46c16a776a1f63a42e49b36947669f8dcc942.png";

export function PublicLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterFeedback, setNewsletterFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      const message = "Please enter a valid email address.";
      setNewsletterFeedback({ type: "error", message });
      toast.error(message);
      return;
    }

    try {
      const rawStored = localStorage.getItem("ctc-newsletter-subscribers");
      const existingList = rawStored ? JSON.parse(rawStored) : [];
      const subscribers = Array.isArray(existingList) ? existingList : [];

      if (!subscribers.includes(normalizedEmail)) {
        subscribers.push(normalizedEmail);
        localStorage.setItem("ctc-newsletter-subscribers", JSON.stringify(subscribers));
      }

      const message = "Thanks. Your email has been saved for updates.";
      setNewsletterFeedback({ type: "success", message });
      setEmail("");
      toast.success(message);
    } catch {
      const message = "Could not save your email right now. Please try again.";
      setNewsletterFeedback({ type: "error", message });
      toast.error(message);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore Courses", to: "/courses" },
    { label: "Community", to: "https://t.me/officialCTCclub" },
    { label: "About", to: "/about" },
  ];

  return (
    <div className="dark flex min-h-screen flex-col bg-[#050117] text-white">
      {!isAuthPage && (
        <header
          className={`sticky top-0 z-50 w-full transition-all duration-500 ${
            scrolled
              ? "bg-[#08061a]/60 backdrop-blur-2xl border-b border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 items-center px-6 lg:px-8 gap-10 max-w-[1400px] w-full">
            <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-auto group">
              <div className="relative">
                <img src={ctcLogo} alt="CTC Club" className="h-9 w-9 rounded-xl ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                CTC <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Club</span>
              </span>
            </Link>

            <nav className="hidden md:flex gap-0.5 justify-end">
              {navLinks.map((link) => (
                link.to.startsWith("http") ? (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3.5 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200 text-slate-300 hover:text-white hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-3.5 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                      location.pathname === link.to
                        ? "text-indigo-600 bg-indigo-50/80 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden md:inline-flex font-semibold text-[13px] text-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white h-9 px-4 rounded-lg"
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="hidden md:inline-flex font-semibold text-[13px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm shadow-indigo-500/25 h-9 px-5 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/30"
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5 text-slate-700 dark:text-slate-300" /> : <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-white/95 backdrop-blur-xl dark:bg-[#0c0f1a]/95 border-t border-slate-100 dark:border-slate-800/50 overflow-hidden"
              >
                <div className="px-6 py-5 space-y-1">
                  {navLinks.map((link) => (
                    link.to.startsWith("http") ? (
                      <a
                        key={link.to}
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                          location.pathname === link.to
                            ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <Button variant="outline" className="w-full h-11 rounded-xl font-semibold" asChild>
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600" asChild>
                      <Link to="/register">Get Started Free</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {!isAuthPage && (
        <footer className="bg-[#09090b] text-slate-400 py-8 border-t border-purple-500/10">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              {/* Brand */}
              <div>
                <Link to="/" className="flex items-center gap-2.5 mb-4 group">
                  <img src={ctcLogo} alt="CTC Club" className="h-8 w-8 rounded-xl transition-transform group-hover:scale-105" />
                  <span className="text-base font-bold text-white">
                    CTC <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Club</span>
                  </span>
                </Link>
                <p className="text-xs leading-relaxed text-slate-400 mb-4">
                  Tech learning platform for university students.
                </p>
                <div className="flex gap-2">
                  {[
                    { Icon: Github, href: "https://github.com/abdisa38" },
                    { Icon: Twitter, href: "https://x.com/bdi3889" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/abdisa-awel-92b963383/" },
                    { Icon: Instagram, href: "https://www.instagram.com/abdisa3889/" },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="h-8 w-8 rounded-xl bg-white/5 hover:bg-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white text-xs font-semibold mb-4 tracking-wide">Quick Links</h4>
                <ul className="space-y-2">
                  {["Courses", "Community", "About"].map((link) => (
                    <li key={link}>
                      <Link
                        to={link === "Courses" ? "/courses" : link === "Community" ? "/community" : "/about"}
                        className="text-xs text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white text-xs font-semibold mb-4 tracking-wide">Contact</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>
                    <a href="tel:+251938890645" className="hover:text-white transition-colors">
                      📞 0938890645
                    </a>
                  </li>
                  <li>
                    <a href="mailto:abdisaawel313@gmail.com" className="hover:text-white transition-colors">
                      ✉️ abdisaawel313@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/bdisa38" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      📱 @bdisa38
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-slate-300">
                &copy; {new Date().getFullYear()} CTC Club. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
