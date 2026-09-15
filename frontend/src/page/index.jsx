import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import heroVideo from "../assets/hero.mp4";
import star from "../assets/star.png";
import trophy from "../assets/trophy.png";
import diamond from "../assets/diamond.png";
import graduated from "../assets/graduated.png";
import coding from "../assets/coding.png";
import TopMentors from "../components/TopMentors";
import { Nav } from "../components/Nav";
import Footer from "../components/Footer";
import { HiArrowRight, HiAcademicCap, HiBriefcase, HiLightBulb, HiChartBar } from "react-icons/hi2";

const Home = () => {
  const [isOpen, setIsOpen] = useState({});

  const toggleFAQ = (index) => {
    setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const features = [
    { title: "Expert Mentorship", desc: "Get one-on-one guidance from seasoned industry professionals." },
    { title: "Tailored Learning Paths", desc: "Choose mentors that align with your personalized career milestones." },
    { title: "Flexible Scheduling", desc: "Book sessions around your calendar so learning fits your lifestyle seamlessly." },
    { title: "Goal-Oriented Sessions", desc: "Every meeting is engineered for tangible outcomes and actionable feedback." },
    { title: "Mentor Reviews & Ratings", desc: "Browse verified student feedback to find the best pedagogical match." },
    { title: "Seamless Onboarding", desc: "Create your profile, match with mentors, and start your first call in minutes." },
  ];

  const steps = [
    { title: "Create Profile", body: "Set up your learning interests, domain focus, and schedule availability." },
    { title: "Browse Mentors", body: "Filter by industry experience, domain skills, and verified reviews." },
    { title: "Select Your Mentor", body: "Review candidate profiles, background history, and past mentee reviews." },
    { title: "Book a Session", body: "Pick available slots seamlessly integrated into your local timezone." },
    { title: "Live 1-on-1 Learning", body: "Connect via direct video calls and resolve technical hurdles together." },
    { title: "Track Progress", body: "Celebrate career milestones and unlock your personalized roadmap." },
  ];

  const categories = [
    { title: "Career Growth Mentors", icon: HiBriefcase, desc: "Promotions, leadership, and interview prep" },
    { title: "Skill Development Mentors", icon: HiAcademicCap, desc: "Master system design, React, and backend architectures" },
    { title: "Entrepreneurship Mentors", icon: HiLightBulb, desc: "Scale startups, MVPs, and venture fundraising" },
    { title: "Freelancing & Gig Economy", icon: HiChartBar, desc: "Build client pipelines and price your contracts" },
    { title: "Industry-Specific Mentors", icon: HiBriefcase, desc: "Fintech, SaaS, Healthcare, and Web3 engineering" },
    { title: "Education & Research Mentors", icon: HiAcademicCap, desc: "Academic pathways, papers, and higher studies" },
  ];

  const plans = [
    {
      name: "Starter",
      badge: "Self-Paced",
      price: "$29",
      period: "/month",
      features: ["2 sessions / month", "Standard email support", "Access to peer community channels"]
    },
    {
      name: "Pro",
      badge: "Most Popular",
      price: "$59",
      period: "/month",
      highlight: true,
      features: ["6 sessions / month", "Priority booking & support", "Direct session recordings access", "Code & resume reviews"]
    },
    {
      name: "Elite",
      badge: "Accelerated",
      price: "$99",
      period: "/month",
      features: ["12 sessions / month", "1:1 dedicated onboarding", "Custom career roadmap design", "Direct mentor messaging"]
    }
  ];

  const faqs = [
    {
      q: "How do I book a mentor?",
      a: "Create your account, explore the curated mentor directory, pick a mentor whose expertise matches your goals, and select a convenient time slot directly on their schedule."
    },
    {
      q: "Can I change my mentor later?",
      a: "Yes. Mentorship is completely flexible—you can schedule sessions with different mentors across distinct skills without losing your session history or notes."
    },
    {
      q: "What if I need to reschedule?",
      a: "You can easily reschedule any upcoming call directly from your student dashboard up to 12 hours before the scheduled time slot."
    },
    {
      q: "Do you support corporate plans?",
      a: "Yes! We offer enterprise and team onboarding packages designed for engineering bootcamps, universities, and company development tracks."
    }
  ];

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-purple-500 selection:text-white">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
          {/* Ambient Lighting Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-purple-600/25 rounded-full blur-[140px]" />
            <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-indigo-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-10 -left-20 w-[450px] h-[350px] bg-pink-500/15 rounded-full blur-[120px]" />
          </div>

          {/* Floating Asset Badges */}
          <img className="hidden md:block absolute top-16 left-[10%] w-12 drop-shadow-2xl animate-bounce duration-[4000ms]" src={star} alt="Star decor" />
          <img className="hidden md:block absolute top-28 left-[24%] w-14 drop-shadow-2xl -rotate-12" src={graduated} alt="Graduation decor" />
          <img className="hidden md:block absolute top-20 right-[14%] w-16 drop-shadow-2xl rotate-6" src={diamond} alt="Diamond decor" />

          <div className="max-w-6xl px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-medium text-purple-200 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Next-generation 1-on-1 mentorship platform
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-tight">
                Accelerate your growth with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300">
                  MentorHub
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed">
                Connect directly with experienced engineers, designers, and domain leaders to bridge the gap between theory and industry-grade reality.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                <NavLink to="/mentors" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white rounded-xl shadow-lg shadow-purple-600/30 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                    Find Your Mentor
                  </button>
                </NavLink>
                <NavLink to="/signup/mentor" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-lg rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                    Become a Mentor
                  </button>
                </NavLink>
              </div>
            </div>

            {/* Video Showcase Card */}
            <div className="relative mt-16 max-w-4xl mx-auto">
              <img className="hidden md:block absolute -top-8 -left-8 w-14 drop-shadow-xl z-20" src={coding} alt="Coding icon" />
              <img className="hidden md:block absolute -top-8 -right-6 w-14 drop-shadow-xl z-20" src={trophy} alt="Trophy icon" />

              <div className="relative rounded-2xl p-1.5 sm:p-2.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent shadow-2xl backdrop-blur-md">
                <div className="overflow-hidden rounded-xl bg-slate-900 border border-white/10 aspect-video shadow-inner">
                  <video autoPlay loop muted controls className="object-cover w-full h-full">
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="Mentorship session"
                    className="object-cover w-full h-80 sm:h-96 lg:h-[420px] hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold">1:1</div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">Direct Guidance</p>
                    <p className="text-slate-500">Live code & career reviews</p>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-block text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md">
                  About the platform
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  What is MentorHub?
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  <span className="font-semibold text-slate-900">MentorHub</span> connects ambitious learners with seasoned practitioners. Get customized advice, work through real-world software architecture problems, and navigate technical interview challenges with confidence.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    className="px-6 py-3 font-semibold text-white bg-purple-600 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-200"
                  >
                    Get started
                  </button>
                  <a
                    href="/"
                    aria-label="Learn more"
                    className="inline-flex items-center gap-1.5 font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-slate-50/50">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
                Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Empowering You with Tailored Mentorship
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Discover structured guidance built to sharpen practical technical aptitude, career navigation, and strategic roadmaps.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="group relative p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                  </div>
                  <a
                    href="/"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Learn more
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 lg:py-28 bg-white border-y border-slate-200/80">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md mb-3">
                    Streamlined Process
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Start mentoring in minutes
                  </h2>
                  <p className="text-slate-600 mt-2 text-base sm:text-lg">
                    Follow straightforward milestones to match, schedule, and commence your structured journey.
                  </p>
                </div>

                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs">
                          {idx + 1}
                        </div>
                        {idx < steps.length - 1 && <div className="w-0.5 h-full bg-slate-200 my-1" />}
                      </div>
                      <div className="pb-6">
                        <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                        <p className="text-sm text-slate-600 mt-0.5">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                  <img
                    className="object-cover w-full h-[480px] lg:h-[580px]"
                    src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="Team collaborative discussion"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm font-medium text-slate-200">Direct Feedback Loop</p>
                    <p className="text-lg font-bold">Bridge experience gaps with active guidance</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Categories / Directory Section */}
        <section className="py-20 lg:py-28 bg-slate-50/50">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-block text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md">
                  Expertise Directory
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Find the Perfect Mentor for Your Path
                </h2>
                <p className="text-slate-600 text-base">
                  Explore diverse domains curated to match your exact professional growth objectives.
                </p>
              </div>
              <NavLink
                to="/mentors"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-5 py-2.5 rounded-xl border border-purple-200 transition-all shrink-0"
              >
                <span>Browse All Categories</span>
                <HiArrowRight className="text-xs" />
              </NavLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <NavLink
                    key={idx}
                    to="/mentors"
                    className="group p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                      <IconComponent size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Mentors Section */}
        <section className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
          <div className="max-w-6xl px-6 mx-auto">
            <TopMentors />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/20 rounded-full blur-[140px]" />
          </div>

          <div className="max-w-6xl px-6 mx-auto relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Flexible Pricing for Every Journey</h2>
              <p className="text-slate-400 text-base">Select the cadence that mirrors your career aspirations.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col justify-between p-8 rounded-2xl transition-all duration-300 ${
                    plan.highlight
                      ? "bg-slate-800/90 border-2 border-purple-500 shadow-2xl scale-105"
                      : "bg-slate-800/40 border border-slate-700/60 hover:border-slate-600"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${plan.highlight ? "bg-purple-500/20 text-purple-300 border border-purple-400/30" : "bg-slate-700 text-slate-300"}`}>
                        {plan.badge}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                      <span className="text-slate-400 text-sm">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5">
                          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      plan.highlight
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl px-6 mx-auto">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-600 text-sm sm:text-base">Everything you need to know about starting your mentorship experience.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <div
                  key={item.q}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    className="flex items-center justify-between w-full px-6 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    onClick={() => toggleFAQ(idx)}
                  >
                    <span className="text-base sm:text-lg">{item.q}</span>
                    <span className="ml-4 text-xl font-light text-slate-400">
                      {isOpen[idx] ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen[idx] && (
                    <div className="px-6 pb-4 pt-1 text-sm sm:text-base text-slate-600 border-t border-slate-100 bg-slate-50/50">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;