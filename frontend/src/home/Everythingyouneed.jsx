import { useState } from 'react';
import {
  Landmark, Sofa, BarChart2, Compass, Building2, Home,
  UserCheck, FileText, Key, ScrollText, Wrench, ShieldCheck,
  Briefcase, TrendingUp, HandshakeIcon, PiggyBank,
  Building, ClipboardList, Award, BookOpen, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tab Data ─────────────────────────────────────────────────────────────────
const tabs = [
  {
    label: 'Buyers & Owners',
    services: [
      { icon: Landmark,   name: 'Home Loan' },
      { icon: Sofa,       name: 'Home Interior Design' },
      { icon: BarChart2,  name: 'Valuation' },
      { icon: Compass,    name: 'Vastu Calculator' },
      { icon: Building2,  name: 'Property Management' },
      { icon: Home,       name: 'Sell or Rent Property' },
    ],
  },
  {
    label: 'Tenants',
    services: [
      { icon: Key,          name: 'Find Rental Home' },
      { icon: FileText,     name: 'Rental Agreement' },
      { icon: ShieldCheck,  name: 'Tenant Verification' },
      { icon: Wrench,       name: 'Home Services' },
      { icon: ScrollText,   name: 'Legal Assistance' },
      { icon: UserCheck,    name: 'Background Check' },
    ],
  },
  {
    label: 'Agents',
    services: [
      { icon: Briefcase,    name: 'Agent Dashboard' },
      { icon: TrendingUp,   name: 'Lead Management' },
      { icon: HandshakeIcon,name: 'Deal Closure Tools' },
      { icon: PiggyBank,    name: 'Commission Tracker' },
      { icon: Award,        name: 'Certifications' },
      { icon: BookOpen,     name: 'Training Resources' },
    ],
  },
  {
    label: 'Builders & Banks',
    services: [
      { icon: Building,       name: 'Project Listings' },
      { icon: ClipboardList,  name: 'Project Reports' },
      { icon: TrendingUp,     name: 'Market Analytics' },
      { icon: Landmark,       name: 'Bank Partnerships' },
      { icon: ShieldCheck,    name: 'RERA Compliance' },
      { icon: FileText,       name: 'Documentation' },
    ],
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ icon: Icon, name }) {
  return (
    <div className="flex flex-col items-center gap-4 p-5 rounded-3xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/20 transition-all duration-500 cursor-pointer group w-full text-center">
      {/* Icon bubble */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 group-hover:bg-gradient-to-tr group-hover:from-orange-50/80 group-hover:to-indigo-50/80 border border-slate-100 flex items-center justify-center transition-all duration-500 shadow-xs group-hover:shadow-md group-hover:scale-105">
        <Icon
          size={26}
          className="text-slate-500 group-hover:text-indigo-600 transition-colors duration-500"
          strokeWidth={1.5}
        />
      </div>
      <span className="text-[13px] text-slate-600 group-hover:text-slate-900 leading-snug font-semibold transition-colors duration-300 max-w-[130px]">
        {name}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EverythingYouNeed() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      className="w-full bg-white py-16 md:py-24 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

        {/* Heading */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-2"
        >
          <span className="text-[11px] font-bold tracking-wider text-orange-500 uppercase block">
            End-To-End ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-md mx-auto">
            Explore value-added premium utilities designed for all players in the market.
          </p>
        </motion.div>

        {/* Premium Tab Selector Bar */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-start lg:justify-center overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar shrink-0"
        >
          <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-2xl flex gap-1.5 min-w-max">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer
                  ${activeTab === index 
                    ? 'bg-[#1a2c5b] text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content display grid wrapper */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-slate-50/40 border border-slate-100 rounded-3xl p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center"
            >
              {tabs[activeTab].services.map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.section>
  );
}