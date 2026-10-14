export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  business: string;
  city: string;
  serviceCategory: "Digital Systems" | "Security & Manpower";
  serviceName: string;
  rating: number;
  date: string;
  reviewText: string;
  verified: boolean;
}

export const reviewsMasterBank: ReviewItem[] = [
  // 5 Digital Services Reviews
  {
    id: "rev-digital-1",
    author: "Dr. S. Vignesh, MD",
    role: "Chief Pediatrician",
    business: "Vignesh Child Care Clinic",
    city: "Tiruchirappalli (Thillai Nagar)",
    serviceCategory: "Digital Systems",
    serviceName: "WhatsApp Clinic Token Tracker & Smart Booking",
    rating: 5,
    date: "2 weeks ago",
    reviewText: "Before JSM set up our WhatsApp token tracker, our clinic waiting room was constantly overcrowded with anxious parents and children waiting 2+ hours. The team at JSM integrated a real-time WhatsApp token bot linked to a TV display in our reception. Now parents receive automated live alerts on WhatsApp showing their estimated consultation time. Waiting room congestion dropped by 80%, and our receptionist can finally focus on patients instead of repeating token numbers. Unbelievable efficiency and smooth technical execution by Steve and the JSM digital team!",
    verified: true,
  },
  {
    id: "rev-digital-2",
    author: "Priya Balasubramanian",
    role: "Managing Director",
    business: "Luxe Aura Hair & Beauty Salon",
    city: "Chennai (Anna Nagar)",
    serviceCategory: "Digital Systems",
    serviceName: "Smart NFC Review Filter Standees",
    rating: 5,
    date: "1 month ago",
    reviewText: "The Smart NFC Review Standee from JSM Integrated Services completely transformed our Google ranking. We placed two acrylic NFC standees at our billing counter. When satisfied clients tap their iPhone or Android phone, it directs 4 and 5-star ratings straight to our Google Maps profile. What's genius is that if someone taps 3 stars or below, it opens a private WhatsApp feedback chat with our manager instead of going public. Our Google Maps reviews jumped from 42 to over 180 verified 5-star ratings in 6 weeks, making us the #1 recommended salon in Anna Nagar. Worth every single rupee!",
    verified: true,
  },
  {
    id: "rev-digital-3",
    author: "Arun Karthik",
    role: "Founder & Head Chef",
    business: "Brew & Bite Specialty Cafe",
    city: "Coimbatore (RS Puram)",
    serviceCategory: "Digital Systems",
    serviceName: "Direct QR Table Ordering & WhatsApp Menu",
    rating: 5,
    date: "3 weeks ago",
    reviewText: "We were losing substantial margins to 28% commissions on third-party aggregator apps, plus our weekend dine-in rushes suffered frequent order mix-ups. JSM deployed direct QR acrylic stands on all 18 tables with WhatsApp menu ordering. Guests scan the QR, customize their coffees and sandwiches, and the ticket prints straight to our kitchen display with zero errors. We saved nearly ₹35,000 in software subscriptions in just two months and our table turnaround time improved by 15 minutes per guest.",
    verified: true,
  },
  {
    id: "rev-digital-4",
    author: "K. Rajesh",
    role: "Proprietor",
    business: "MotoShine Ceramic & Detail Studio",
    city: "Hosur (SIPCOT Phase 1)",
    serviceCategory: "Digital Systems",
    serviceName: "Missed Call Lead Recovery & WhatsApp CRM",
    rating: 5,
    date: "1 month ago",
    reviewText: "As an auto detailing shop where our team is constantly busy with pressure washers and rotary polishers, we missed at least 6 to 8 client calls daily. JSM set up their automated missed-call recovery system. The second a customer call goes unanswered, an instant personalized WhatsApp greeting is triggered within 5 seconds asking how we can assist and showing our service price card. In the very first month, we recovered 19 premium ceramic coating bookings that would have otherwise gone to competitors. Outstanding support!",
    verified: true,
  },
  {
    id: "rev-digital-5",
    author: "Dr. Meena Sundaram, MDS",
    role: "Principal Orthodontist",
    business: "Sundaram Dental Speciality Centre",
    city: "Madurai (Mattuthavani)",
    serviceCategory: "Digital Systems",
    serviceName: "Google Business Profile Local 3-Pack SEO",
    rating: 5,
    date: "2 months ago",
    reviewText: "We struggled for over a year stuck on Page 3 of Google Maps searches for dental clinics in Madurai. JSM Integrated Services audited our profile, optimized our primary and secondary medical categories, added geo-tagged clinic photos, and systematically built 40+ high-authority Tamil Nadu citations. Within 45 days, our clinic moved into the top 2 of the Google 3-Pack. We now receive 10 to 15 direct patient inquiries and phone calls every week directly through Google Maps. Highly recommend JSM for local search dominance.",
    verified: true,
  },

  // 5 Security, Manpower & Facility Services Reviews
  {
    id: "rev-security-1",
    author: "K. Swaminathan",
    role: "Civil Infrastructure Operations Advisor",
    business: "Aviation & Infrastructure Logistics",
    city: "Tiruchirappalli (Trichy International Airport)",
    serviceCategory: "Security & Manpower",
    serviceName: "Civil Aviation Concourse Security Regulation",
    rating: 5,
    date: "3 months ago",
    reviewText: "Having worked alongside security contractors for major infrastructure projects, JSM Integrated Services stands far above typical civilian guard agencies. Their deployment during the passenger concourse operations at Tiruchirappalli International Airport was executed with military-grade discipline. Under Major AR Devadoss's leadership, the turnout, gate access scrutiny, and crowd regulation were impeccable. Zero complaints from airport authorities, 100% attendance, and flawless shift handovers. Truly top-tier capability.",
    verified: true,
  },
  {
    id: "rev-security-2",
    author: "S. Mohanraj",
    role: "General Manager - Operations",
    business: "Precision Automotive Components Ltd",
    city: "Hosur (SIPCOT Industrial Complex)",
    serviceCategory: "Security & Manpower",
    serviceName: "Industrial Factory Security & 2:00 AM Van Audits",
    rating: 5,
    date: "1 month ago",
    reviewText: "We manage an 8-acre automotive component manufacturing plant in Hosur SIPCOT with substantial high-grade copper and alloy inventory. Our previous guard agency had issues with night sleeping and lax gate checks. Since onboarding JSM Integrated Services 9 months ago, scrap pilferage has dropped to absolute zero. Their operations team conducts unannounced 2:00 AM supervisor van audits with digital QR patrol check-ins and breathalyzer tests. Knowing an ex-serviceman-led agency is safeguarding our plant gives us total peace of mind.",
    verified: true,
  },
  {
    id: "rev-security-3",
    author: "R. Venkatraman",
    role: "VP - Human Resources & Statutory Affairs",
    business: "Kongu Engineering & Foundry Cluster",
    city: "Coimbatore (SIDCO Kurichi)",
    serviceCategory: "Security & Manpower",
    serviceName: "Contract Industrial Manpower & 100% EPF/ESIC Compliance",
    rating: 5,
    date: "2 months ago",
    reviewText: "For manufacturing enterprises in Coimbatore, labor contractor compliance is our highest legal vulnerability. What sets JSM apart is their 100% transparency. Every month, along with their commercial invoice, we receive verified EPF and ESIC ECR challans, wage muster registers, and biometric attendance reports. Zero statutory deviations, zero joint labor disputes, and their 2-hour replacement SLA has ensured our foundry assembly line never stops even during sudden worker leaves.",
    verified: true,
  },
  {
    id: "rev-security-4",
    author: "Divya Chandran",
    role: "Head of Facility Operations",
    business: "Ascent Global Tech Park",
    city: "Chennai (OMR IT Corridor)",
    serviceCategory: "Security & Manpower",
    serviceName: "Corporate IT Park Security & Visitor Management",
    rating: 5,
    date: "3 weeks ago",
    reviewText: "We host multi-tenant international IT firms on OMR Chennai where professional appearance, polite communication, and strict access control are mandatory. JSM provided 24 bilingual security personnel and reception marshals. Their uniform turnout is razor-sharp, visitor logs are digitized, and their quick-reaction team resolved an emergency basement water leak at 3 AM before office hours. The leadership team under Sweety J and Major Devadoss is responsive, ethical, and always accessible.",
    verified: true,
  },
  {
    id: "rev-security-5",
    author: "Dr. Prakash Narayanan",
    role: "Medical Superintendent",
    business: "Salem Specialty Healthcare Hospital",
    city: "Salem (Steel Plant Road)",
    serviceCategory: "Security & Manpower",
    serviceName: "Hospital Sanitation & Mechanized Facility Management",
    rating: 5,
    date: "2 months ago",
    reviewText: "Maintaining clinical infection-control standards across a 150-bed multi-specialty hospital requires rigorous discipline. JSM's mechanized housekeeping team deployed automated ride-on scrubber-driers, color-coded microfiber sanitization protocols, and hourly restroom inspection checklists. Our hospital hygiene scores from the state health inspection increased to 98%. Their staff is polite, courteous to grieving patients, and thoroughly trained in biomedical waste handling.",
    verified: true,
  },
];
