import Container from '../components/Container';
import { 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  Eye, 
  Scale, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ChevronRight
} from 'lucide-react';

export default function Privacy() {
  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "info-collect", title: "2. Information We Collect" },
    { id: "how-we-use", title: "3. How We Use Your Information" },
    { id: "property-enquiries", title: "4. Property Enquiries & Lead Forms" },
    { id: "communication", title: "5. WhatsApp, Phone & Email" },
    { id: "cookies", title: "6. Cookies & Ad Technologies" },
    { id: "sharing-info", title: "7. Sharing Your Information" },
    { id: "data-security", title: "8. Data Security" },
    { id: "data-retention", title: "9. Data Retention" },
    { id: "privacy-rights", title: "10. Your Privacy Rights" },
    { id: "third-party", title: "11. Third-Party Websites" },
    { id: "children-privacy", title: "12. Children's Privacy" },
    { id: "policy-changes", title: "13. Changes to This Policy" },
    { id: "contact-info", title: "14. Contact & Grievance Redressal" },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9E5] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-16 md:py-24 border-b border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-medium tracking-wide">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Legal Transparency & Data Protection</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-serif">
              Privacy Policy
            </h1>
            
            <p className="text-lg md:text-xl font-medium text-blue-400">
              Connect You Realty
            </p>

            {/* <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700/60">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Last Updated: <strong>13 October 2026</strong></span>
            </div> */}
          </div>
        </Container>
      </section>

      {/* Main Content Area with Sticky Index Sidebar & Detailed Policy */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Quick Table of Contents / Navigation (Sticky) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200/60">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-semibold text-slate-900">Table of Contents</h3>
              </div>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className="flex items-center justify-between text-xs md:text-sm py-2 px-2.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 transition-all group"
                  >
                    <span className="truncate">{sec.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 shrink-0" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Contact Box in Sidebar */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-sm border border-slate-700/70 space-y-4">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                Have Questions?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Our grievance and data privacy officer is available to address your inquiries or consent requests.
              </p>
              <div className="pt-2 text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <a href="mailto:cyf@connectyou.co.in" className="hover:text-blue-300 transition-colors">
                    cyf@connectyou.co.in
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <a href="tel:+919082563602" className="hover:text-blue-300 transition-colors">
                    +91 90825 63602
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Policy Body */}
          <main className="lg:col-span-8 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-amber-200/60 space-y-12">
            
            {/* Section 1: Introduction */}
            <section id="intro" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">1</span>
                <h2>Introduction</h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  Welcome to <strong className="text-slate-900 font-semibold">Connect You Realty</strong>.
                </p>
                <p>
                  At Connect You Realty, we respect your privacy and are committed to protecting your personal information.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, share, and protect your information when you visit our website, <a href="https://connectyourealty.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium hover:text-blue-700">https://connectyourealty.in</a>, contact us, enquire about properties, or use our real estate services.
                </p>
                <p>
                  By using our website, you acknowledge this Privacy Policy. Where consent is required to process your personal information, we will request it separately.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 2: Information We Collect */}
            <section id="info-collect" className="scroll-mt-24 space-y-5">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">2</span>
                <h2>Information We Collect</h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                We may collect the following information when you interact with us:
              </p>

              <div className="space-y-4">
                {/* Personal Information */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm md:text-base">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <h4>Personal Information</h4>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 list-disc list-inside">
                    <li>Full name</li>
                    <li>Mobile or WhatsApp number</li>
                    <li>Email address</li>
                    <li>City or preferred location</li>
                    <li>Property preferences and budget</li>
                    <li>Property buying, selling, or investment requirements</li>
                    <li className="md:col-span-2">Information voluntarily provided through enquiry forms, phone calls, emails, and WhatsApp</li>
                  </ul>
                </div>

                {/* Website and Technical Information */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm md:text-base">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <h4>Website and Technical Information</h4>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 list-disc list-inside">
                    <li>IP address</li>
                    <li>Browser type and device information</li>
                    <li>Website pages visited</li>
                    <li>Cookies and similar technologies</li>
                    <li className="md:col-span-2">Website interaction and referral information</li>
                  </ul>
                </div>

                {/* Transaction-Related Information */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm md:text-base">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <h4>Transaction-Related Information</h4>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                    If you proceed with a property transaction, additional information may be requested where necessary for booking, documentation, verification, or legal compliance.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 3: How We Use Your Information */}
            <section id="how-we-use" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">3</span>
                <h2>How We Use Your Information</h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Connect You Realty may use your personal information to:
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-slate-600">
                {[
                  "Respond to property enquiries and callback requests.",
                  "Recommend residential and commercial properties matching your requirements.",
                  "Arrange property visits, meetings, and consultations.",
                  "Share brochures, floor plans, pricing, availability, and project updates.",
                  "Assist with property buying, selling, renting, and investment enquiries.",
                  "Communicate through telephone, email, SMS, or WhatsApp.",
                  "Provide promotional communications where you have given the necessary consent.",
                  "Improve our website, customer service, and marketing effectiveness.",
                  "Prevent fraudulent activity and comply with applicable legal obligations."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs md:text-sm text-blue-900">
                We process personal information only for lawful purposes and use consent or another legally permitted basis where applicable.
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 4: Property Enquiries and Lead Forms */}
            <section id="property-enquiries" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">4</span>
                <h2>Property Enquiries and Lead Forms</h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  When you submit a property enquiry through our website, social media advertisements, landing pages, or other authorised channels, we use your information to respond to your enquiry and provide relevant real estate assistance.
                </p>
                <p>
                  Where required, we obtain separate consent before sending unrelated promotional communications.
                </p>
                <p className="font-medium text-slate-800">
                  You may request that we stop promotional communications at any time.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 5: WhatsApp, Telephone and Email Communication */}
            <section id="communication" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">5</span>
                <h2>WhatsApp, Telephone and Email Communication</h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Connect You Realty may communicate with customers through WhatsApp Business, telephone, SMS, and email.
              </p>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                <p className="text-xs md:text-sm font-medium text-slate-800">These communications may include:</p>
                <ul className="space-y-1.5 text-xs md:text-sm text-slate-600 list-disc list-inside">
                  <li>Property details and recommendations</li>
                  <li>Site visit confirmations</li>
                  <li>Project availability and pricing updates</li>
                  <li>Responses to customer requests</li>
                  <li>Marketing information where permitted</li>
                </ul>
              </div>
              <div className="text-slate-600 text-sm md:text-base space-y-2 font-normal leading-relaxed">
                <p>
                  You can opt out of promotional messages by replying <strong className="text-slate-900 font-semibold">STOP</strong> or contacting us directly.
                </p>
                <p className="text-xs md:text-sm text-slate-500">
                  Communication services such as WhatsApp may process information under their own privacy policies.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 6: Cookies and Advertising Technologies */}
            <section id="cookies" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">6</span>
                <h2>Cookies and Advertising Technologies</h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                Our website may use cookies and similar technologies to improve website functionality, understand visitor activity, and measure advertising effectiveness.
              </p>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                <p className="text-xs md:text-sm font-medium text-slate-800">Where enabled, these technologies may include:</p>
                <ul className="space-y-1.5 text-xs md:text-sm text-slate-600 list-disc list-inside">
                  <li>Google Analytics</li>
                  <li>Google Ads conversion tracking</li>
                  <li>Meta Pixel for Facebook and Instagram advertising</li>
                  <li>Website performance and security cookies</li>
                </ul>
              </div>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                Advertising and analytics cookies will be used subject to applicable consent requirements. You may manage cookies through your browser settings and any cookie preferences offered on our website.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 7: Sharing Your Information */}
            <section id="sharing-info" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">7</span>
                <h2>Sharing Your Information</h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                We may share relevant personal information with trusted parties when reasonably necessary for the purposes described in this Policy. These may include:
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-slate-600 list-disc list-inside bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                <li>Property developers and authorised representatives involved in your enquiry</li>
                <li>Site visit coordinators and property consultants</li>
                <li>Home loan or financial service partners, when requested or authorised by you</li>
                <li>Website hosting, CRM, analytics, and communication service providers</li>
                <li>Government authorities or regulators where legally required</li>
              </ul>
              <div className="space-y-2 text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  We limit shared information to what is reasonably necessary and take appropriate measures to protect it.
                </p>
                <p className="font-semibold text-slate-900">
                  We do not share your personal information with unrelated third parties for their independent marketing purposes without the required permission.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 8: Data Security */}
            <section id="data-security" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">8</span>
                <h2>Data Security</h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  We implement reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration, misuse, and loss.
                </p>
                <p>
                  These measures may include access controls, secure systems, appropriate service-provider safeguards, and restricted access to customer records.
                </p>
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs md:text-sm text-amber-900">
                  However, no online transmission or electronic storage system can be guaranteed to be completely secure.
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 9: Data Retention */}
            <section id="data-retention" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">9</span>
                <h2>Data Retention</h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, manage customer relationships, resolve disputes, and meet applicable legal or regulatory requirements.
                </p>
                <p>
                  When information is no longer needed, we take reasonable steps to delete, anonymise, or securely dispose of it, subject to applicable retention requirements.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 10: Your Privacy Rights */}
            <section id="privacy-rights" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">10</span>
                <h2>Your Privacy Rights</h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Subject to applicable laws, you may request to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Access information about how your personal data is processed.",
                  "Correct or update inaccurate personal information.",
                  "Request deletion of personal information.",
                  "Withdraw consent previously provided.",
                  "Stop receiving promotional communications.",
                  "Raise a complaint regarding the handling of personal information.",
                  "Exercise other rights available under applicable data protection laws."
                ].map((right, index) => (
                  <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs md:text-sm text-slate-700">
                    <Scale className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{right}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-600 text-xs md:text-sm space-y-2 pt-2 leading-relaxed font-normal">
                <p>
                  Withdrawal of consent does not affect processing lawfully carried out before the withdrawal.
                </p>
                <p>
                  To submit a privacy request, contact us using the details provided below. We may verify your identity before processing certain requests.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 11: Third-Party Websites */}
            <section id="third-party" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">11</span>
                <h2>Third-Party Websites</h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  Our website may contain links to external websites, including property developers, social media platforms, maps, and other real estate service providers.
                </p>
                <p>
                  Connect You Realty does not control the privacy practices or content of third-party websites.
                </p>
                <p>
                  We recommend reviewing their respective privacy policies before providing personal information.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 12: Children's Privacy */}
            <section id="children-privacy" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">12</span>
                <h2>Children's Privacy</h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  Our website and real estate services are primarily intended for individuals aged 18 years and above.
                </p>
                <p>
                  We do not knowingly collect personal information from children through our enquiry services without appropriate authorisation where required by law.
                </p>
                <p>
                  If you believe a child has submitted personal information to us, please contact us so that we can take appropriate action.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 13: Changes to This Privacy Policy */}
            <section id="policy-changes" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">13</span>
                <h2>Changes to This Privacy Policy</h2>
              </div>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  Connect You Realty may update this Privacy Policy periodically to reflect changes in our services, business practices, technology, or applicable laws.
                </p>
                <p>
                  Updated versions will be published on this page with a revised <strong className="text-slate-900 font-semibold">Last Updated</strong> date.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 14: Contact Information and Grievance Redressal */}
            <section id="contact-info" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold text-lg md:text-xl font-serif">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-sans font-bold">14</span>
                <h2>Contact Information and Grievance Redressal</h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                For privacy-related enquiries, personal data requests, consent withdrawal, or complaints, please contact:
              </p>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8 space-y-5 border border-slate-700/70 shadow-md">
                <div className="border-b border-slate-700/80 pb-4">
                  <h3 className="text-xl font-bold font-serif text-white">Connect You Realty</h3>
                  <p className="text-xs text-blue-400 mt-1">Your Trusted Real Estate Partner</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Website</span>
                      <a href="https://connectyourealty.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors font-medium">
                        https://connectyourealty.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Email</span>
                      <a href="mailto:cyf@connectyou.co.in" className="text-white hover:text-blue-300 transition-colors font-medium">
                        cyf@connectyou.co.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Phone</span>
                      <a href="tel:+919082563602" className="text-white hover:text-blue-300 transition-colors font-medium">
                        +91 90825 63602
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Office Address</span>
                      <span className="text-slate-200 leading-relaxed font-normal">
                        G-131, Haware Fantasia Multiplex, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400703, India.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/80 text-xs text-slate-300 font-normal">
                  We will review privacy-related requests and complaints and respond in accordance with applicable law.
                </div>
              </div>

              {/* Bottom Partner Trust Statement */}
              <div className="text-center pt-8 border-t border-slate-100 space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  Connect You Realty — Your Trusted Real Estate Partner.
                </p>
                <p className="text-xs text-slate-500 italic">
                  We value your trust and are committed to handling your information responsibly.
                </p>
              </div>
            </section>

          </main>
        </div>
      </Container>
    </div>
  );
}
