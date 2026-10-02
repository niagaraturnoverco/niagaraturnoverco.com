export type Faq = { q: string; a: string };
export type CommercialPage = {
  path: string;
  title: string; // <title>
  description: string;
  h1: string;
  eyebrow: string;
  city?: string;
  facility?: string;
  intro: string[]; // unique local copy paragraphs
  included: { heading: string; items: string[] }[];
  faqs: Faq[];
};

const officeIncluded = [
  { heading: "Every visit", items: ["Empty bins, replace liners, sort recycling", "Wipe desks, counters and high-touch points", "Vacuum carpets and mop hard floors", "Clean and restock washrooms"] },
  { heading: "Kitchens & break rooms", items: ["Sinks, counters and appliance fronts", "Microwave interior wipe", "Table and chair wipe-down", "Organics and recycling out"] },
  { heading: "Weekly", items: ["Glass doors and partitions", "Baseboards and vents dusting", "Detailed washroom descale", "Entrance mats and lobby detail"] },
];

const hq: Faq = { q: "Do you use your own staff or subcontractors?", a: "Your building is cleaned by vetted, independently insured and WSIB-cleared cleaning professionals working under NTC's scope, checklists and quality control. NTC is your single point of contact, sends the monthly inspection report, and is accountable for the result." };

export const COMMERCIAL_PAGES: CommercialPage[] = [
  {
    path: "/office-cleaning",
    title: "Office Cleaning Niagara | Janitorial Services | Niagara Turnover Co.",
    description: "Nightly and weekly office cleaning across the Niagara Region. Insured, WSIB-cleared, monthly inspection reports, 30-day cancellation. Free walkthrough quote.",
    h1: "Office cleaning across the Niagara Region",
    eyebrow: "Office & Janitorial",
    facility: "Office",
    intro: [
      "Office managers across Niagara tell us the same thing: the cleaning gets done for a few weeks, then washrooms slip, bins get missed and nobody answers the phone. Our service is built around preventing that drift.",
      "Every account gets a written scope, a checklist the crew works from on every visit, and one NTC point of contact. Once a month we inspect the space and send you a written report within five business days, so you can see what was checked and what was fixed.",
      "We clean professional offices, small business suites, call centres, municipal and non-profit spaces, from single-floor units to multi-tenant buildings. Service runs after hours or early morning so your team walks into a ready space. Contracts are month-to-month with 30 days' notice — we keep your business by doing the work, not by locking you in.",
    ],
    included: officeIncluded,
    faqs: [
      hq,
      { q: "Do you clean after hours?", a: "Yes. Most office accounts are cleaned evenings or early mornings. We agree a service window and key or alarm procedure at the walkthrough." },
      { q: "What are the contract terms?", a: "Month-to-month with 30 days' notice to cancel. No long-term lock-in." },
      { q: "What if a clean is missed?", a: "If a scheduled clean can't happen, we notify you the same day and reschedule within 24 hours." },
      { q: "Are you insured and WSIB-cleared?", a: "Yes. A certificate of insurance and WSIB clearance are available on request before work starts." },
    ],
  },
  {
    path: "/office-cleaning/st-catharines",
    city: "St. Catharines",
    facility: "Office",
    title: "Office Cleaning St. Catharines | Commercial Janitorial | NTC",
    description: "Office and janitorial cleaning in St. Catharines — downtown St. Paul Street, Fourth Avenue, Glendale and Ontario Street. Inspected and reported monthly.",
    h1: "Office cleaning in St. Catharines",
    eyebrow: "St. Catharines",
    intro: [
      "St. Catharines is the region's largest office market, and it's spread out. Downtown, the St. Paul Street and King Street corridor is full of law offices, accounting firms and agencies in older multi-storey buildings with shared washrooms and tight stairwells. Out on Fourth Avenue and around the Pen Centre and Glendale Avenue, it's newer plazas, medical-professional units and single-tenant suites with lots of glass.",
      "Each type needs a different routine. Downtown heritage buildings mean careful floor care on old hardwood and tile, plus coordinated access with building owners. Plaza suites usually need fast after-hours service, entrance glass done often, and winter salt pulled off carpets before it sets.",
      "We build the checklist around your actual space at the walkthrough, then inspect against it every month. One NTC contact handles your account, and contracts run month-to-month.",
    ],
    included: officeIncluded,
    faqs: [
      { q: "Do you service downtown St. Catharines buildings with shared common areas?", a: "Yes. We can clean your suite only, or quote the shared corridors and washrooms for the building owner separately." },
      { q: "How do you handle winter salt on plaza entrances?", a: "Entrance mats and the first few metres of flooring get extra attention from November to April, and we can add scheduled hard-floor scrubbing during salt season." },
      hq,
      { q: "Can you clean during business hours?", a: "Most St. Catharines offices prefer evenings, but daytime porter service for washrooms and kitchens is available." },
    ],
  },
  {
    path: "/office-cleaning/niagara-falls",
    city: "Niagara Falls",
    facility: "Office",
    title: "Office Cleaning Niagara Falls | Commercial Cleaners | NTC",
    description: "Commercial and office cleaning in Niagara Falls — Queen Street, Victoria Avenue, Montrose and Thorold Stone Road business areas. Free walkthrough quote.",
    h1: "Office cleaning in Niagara Falls",
    eyebrow: "Niagara Falls",
    intro: [
      "Most people think of Niagara Falls for tourism, but there's a big working side to the city: hospitality head offices, property management companies, insurance and real estate brokerages, and the support offices behind the hotels and attractions. You'll find them downtown along Queen Street, on Victoria Avenue, and in the plazas and business parks off Montrose Road and Thorold Stone Road.",
      "Offices tied to tourism are often busiest in exactly the months when cleaning crews are hardest to book. We schedule commercial accounts first, so your service doesn't slip when summer turnover work ramps up across the city.",
      "Whether you have a small brokerage on Lundy's Lane or a back office supporting a hotel group, you get a written scope, monthly inspection and one NTC point of contact.",
    ],
    included: officeIncluded,
    faqs: [
      { q: "Does summer tourist season affect your office schedule?", a: "No. Commercial contracts are scheduled ahead of seasonal work, so your service days stay fixed all year." },
      { q: "Do you clean hospitality back offices and staff areas?", a: "Yes — admin offices, staff rooms, locker rooms and training spaces. Guest-facing hotel housekeeping is not part of this service." },
      hq,
      { q: "How quickly can you start?", a: "After the walkthrough and signed scope, most Niagara Falls accounts start within one to two weeks." },
    ],
  },
  {
    path: "/office-cleaning/welland",
    city: "Welland",
    facility: "Office",
    title: "Office Cleaning Welland | Janitorial & Commercial | NTC",
    description: "Office and janitorial cleaning in Welland — downtown East Main, Niagara Street corridor and Woodlawn Road plazas. Insured, inspected monthly.",
    h1: "Office cleaning in Welland",
    eyebrow: "Welland",
    intro: [
      "Welland's offices sit in a few clear pockets: the downtown core around East Main Street and the civic square, the Niagara Street commercial strip, and the plazas off Woodlawn Road and near the Seaway Mall. Tenants are a mix of social service agencies, legal and financial offices, and small professional firms.",
      "Many of these spaces see steady public foot traffic — reception counters, waiting areas and public washrooms that get heavy use every day. That means high-touch disinfection and washroom checks matter more than polishing desks.",
      "We weight your checklist toward the areas the public actually uses, log washroom service on site, and confirm the work with a monthly written inspection. Month-to-month terms, one NTC contact.",
    ],
    included: officeIncluded,
    faqs: [
      { q: "Can you handle offices with public waiting rooms?", a: "Yes. Reception, waiting areas and public washrooms get priority on every visit, with posted washroom logs." },
      { q: "Do you clean non-profit and agency offices?", a: "Yes. We regularly scope offices with shared program rooms, kitchens and meeting spaces." },
      hq,
      { q: "What frequency do Welland offices usually choose?", a: "It depends on foot traffic — public-facing offices often need 3–5 visits per week; quieter suites 1–2." },
    ],
  },
  {
    path: "/office-cleaning/thorold",
    city: "Thorold",
    facility: "Office",
    title: "Office Cleaning Thorold | Commercial Cleaning | NTC",
    description: "Commercial and office cleaning in Thorold — Pine Street downtown, Brock-area offices and canal-side industrial sites. Free walkthrough quote.",
    h1: "Office cleaning in Thorold",
    eyebrow: "Thorold",
    intro: [
      "Thorold mixes a small downtown along Front Street and Pine Street with a large industrial and logistics base along the Welland Canal and near Highway 406, plus offices tied to the Brock University side of the city.",
      "That mix means a lot of our Thorold work is hybrid: a front office and boardroom that need to look sharp, attached to a plant, warehouse or yard where staff wash rooms, lunch rooms and locker areas take a beating.",
      "We scope both sides at the walkthrough, set separate checklists for office and staff areas, and report on each in the monthly inspection. Practical cleaning for working buildings, with one NTC point of contact.",
    ],
    included: officeIncluded,
    faqs: [
      { q: "Do you clean offices attached to industrial sites?", a: "Yes — front offices, lunch rooms, washrooms and locker rooms. Production floors and process equipment are not included." },
      { q: "Can you work around shift schedules?", a: "Yes. We time visits between shifts or overnight so staff areas are ready for the next crew." },
      hq,
      { q: "Do you follow site safety rules?", a: "Yes. Our cleaners follow your site orientation, PPE and sign-in requirements." },
    ],
  },
  {
    path: "/office-cleaning/niagara-on-the-lake",
    city: "Niagara-on-the-Lake",
    facility: "Office",
    title: "Office Cleaning Niagara-on-the-Lake | Winery & Office | NTC",
    description: "Office and commercial cleaning in Niagara-on-the-Lake — Old Town, Virgil, St. Davids and winery admin offices. Insured, inspected, reported.",
    h1: "Office cleaning in Niagara-on-the-Lake",
    eyebrow: "Niagara-on-the-Lake",
    intro: [
      "Business in Niagara-on-the-Lake is spread across Old Town around Queen Street, the commercial strip in Virgil, St. Davids, and the winery and agri-business properties along the Niagara Parkway and the concession roads.",
      "A lot of these offices are small but high-presentation: winery admin and sales offices, tasting-room back of house, real estate and design studios in heritage buildings. Visitors notice dust, fingerprints on glass and tired washrooms.",
      "Distances between sites are longer here, so we set fixed service days and routes rather than on-call visits. You get a written scope, a monthly inspection report and one NTC point of contact.",
    ],
    included: officeIncluded,
    faqs: [
      { q: "Do you clean winery offices and back-of-house areas?", a: "Yes — admin offices, staff rooms and washrooms. Production and cellar areas are scoped separately if needed." },
      { q: "Can you work in heritage buildings?", a: "Yes. We use products and methods suited to older wood floors and finishes, and agree any restrictions at the walkthrough." },
      hq,
      { q: "Do you serve rural NOTL properties?", a: "Yes, across Old Town, Virgil, St. Davids, Queenston and rural NOTL." },
    ],
  },
  {
    path: "/office-cleaning/fort-erie",
    city: "Fort Erie",
    facility: "Office",
    title: "Office Cleaning Fort Erie | Commercial Cleaning | NTC",
    description: "Office and commercial cleaning in Fort Erie — Garrison Road, Jarvis Street, Ridgeway and border-area businesses. Free walkthrough quote.",
    h1: "Office cleaning in Fort Erie",
    eyebrow: "Fort Erie",
    intro: [
      "Fort Erie's commercial activity runs along Garrison Road, the older downtown on Jarvis Street, and the cross-border trade businesses near the Peace Bridge — customs brokers, freight and logistics offices — plus smaller professional offices in Ridgeway and Stevensville.",
      "Border-related offices often run long or split hours, and trucks and yards bring a lot of grit indoors. Entrances, floors and staff washrooms need more frequent attention than in a typical office.",
      "We set a service window that fits your hours, focus effort on the areas that take the most traffic, and back it with a written monthly inspection. Month-to-month, one NTC contact.",
    ],
    included: officeIncluded,
    faqs: [
      { q: "Can you work around extended or split office hours?", a: "Yes. We schedule around your quietest window, including early mornings or late nights." },
      { q: "Do you clean customs brokerage and logistics offices?", a: "Yes — offices, dispatch rooms, driver washrooms and lunch rooms." },
      hq,
      { q: "Do you cover Ridgeway and Crystal Beach?", a: "Yes, all of Fort Erie including Ridgeway, Crystal Beach and Stevensville." },
    ],
  },
  {
    path: "/office-cleaning/port-colborne",
    city: "Port Colborne",
    facility: "Office",
    title: "Office Cleaning Port Colborne | Commercial Cleaning | NTC",
    description: "Office and commercial cleaning in Port Colborne — West Street, Main Street and canal-side businesses. Insured, WSIB-cleared, monthly inspections.",
    h1: "Office cleaning in Port Colborne",
    eyebrow: "Port Colborne",
    intro: [
      "Port Colborne is a smaller market with its own character: shops and offices along West Street by the canal, the Main Street and Clarence Street commercial area, and industrial and marine-related employers near the harbour.",
      "Many businesses here have had trouble getting a reliable cleaner to commit to the drive. Visits get skipped or pushed, and there's no one to call. We put Port Colborne accounts on fixed weekly routes so they're never the first visit dropped.",
      "Whether it's a professional office on West Street or an admin building at an industrial site, you get the same written scope, monthly inspection and one NTC point of contact as our larger-city clients.",
    ],
    included: officeIncluded,
    faqs: [
      { q: "Will you actually commit to Port Colborne on a regular schedule?", a: "Yes. Port Colborne accounts are on fixed weekly routes. If a clean can't happen, we notify you the same day and reschedule within 24 hours." },
      { q: "Do you clean small offices?", a: "Yes. Small offices are often 1–2 visits per week with a monthly inspection." },
      hq,
      { q: "Do you serve industrial admin buildings near the harbour?", a: "Yes — offices, lunch rooms, washrooms and locker rooms." },
    ],
  },
  {
    path: "/medical-office-cleaning",
    facility: "Medical/Dental",
    title: "Medical & Dental Office Cleaning Niagara | Clinic Cleaning | NTC",
    description: "Protocol-driven cleaning for medical, dental, physio and clinic offices across Niagara. Logged disinfection, inspection reports, insured and WSIB-cleared.",
    h1: "Medical and dental office cleaning across Niagara",
    eyebrow: "Medical & Dental",
    intro: [
      "Clinics are judged by how clean they look and feel. Patients notice waiting rooms, washrooms and exam room surfaces before they meet anyone. Owners and office managers need cleaning that follows a clear protocol, every visit, without having to supervise it.",
      "We clean family medicine, dental, physiotherapy, chiropractic, optometry and other outpatient clinics. The scope separates public areas, exam and treatment rooms, and staff spaces, with high-touch disinfection on every visit and products chosen to match your requirements.",
      "Clinical waste, sharps and instrument sterilization stay with your staff. We handle the environment around them, document washroom and disinfection service on site, and send a written inspection report each month.",
    ],
    included: [
      { heading: "Waiting & reception", items: ["Disinfect chairs, counters, pens and door handles", "Glass and partitions", "Floors vacuumed and mopped", "Bins emptied and lined"] },
      { heading: "Exam & treatment rooms", items: ["Disinfect non-clinical surfaces and touchpoints", "Hard floors damp-mopped with approved product", "Sinks and dispensers cleaned and restocked", "Non-clinical waste removed"] },
      { heading: "Washrooms & staff areas", items: ["Full washroom disinfection, logged", "Staff kitchen and lunch room", "Recycling and organics out", "Weekly detail of baseboards and vents"] },
    ],
    faqs: [
      { q: "Do you handle biomedical waste or sharps?", a: "No. Clinical waste, sharps and instrument reprocessing stay with your staff and licensed waste provider. We clean the environment around them." },
      { q: "Can you use our required disinfectants?", a: "Yes. We follow your written product and contact-time requirements, with Safety Data Sheets kept on site." },
      hq,
      { q: "Do you clean after clinic hours?", a: "Yes, most clinics are cleaned after the last patient so rooms are ready for the morning." },
      { q: "Do you document cleaning?", a: "Yes. Washroom and disinfection logs are posted on site, and you get a monthly written inspection report." },
    ],
  },
  {
    path: "/property-common-area-cleaning",
    facility: "Property common areas",
    title: "Common Area Cleaning Niagara | Condo & Apartment Buildings | NTC",
    description: "Lobby, corridor, stairwell, elevator and garbage room cleaning for condos, apartments and multi-tenant buildings across Niagara. Monthly inspection reports.",
    h1: "Property common area cleaning across Niagara",
    eyebrow: "Common Areas",
    intro: [
      "For condo boards and property managers, common areas are where tenant complaints start: a sticky elevator floor, a smelly garbage room, fingerprints all over the lobby glass. They're also the first thing a prospective tenant or buyer sees.",
      "We clean lobbies, corridors, stairwells, elevators, laundry rooms, amenity rooms and garbage and recycling rooms in apartment buildings, condos and multi-tenant commercial properties across the region.",
      "Each building gets a written scope by area and frequency. When a tenant complaint comes in, you call one NTC contact and we deal with it. The monthly inspection report gives you something concrete to share with your board or owner.",
    ],
    included: [
      { heading: "Every visit", items: ["Lobby floors, glass and mailroom", "Elevator cabs, tracks and buttons", "Corridor vacuuming and spot cleaning", "Garbage and recycling rooms tidied"] },
      { heading: "Weekly", items: ["Stairwell sweep and mop", "Laundry and amenity rooms", "Handrails and door hardware disinfected", "Entrance mats and vestibules"] },
      { heading: "Scheduled", items: ["Carpet extraction", "Hard floor scrub and burnish", "High dusting and light fixtures", "Move-in/move-out common area touch-ups"] },
    ],
    faqs: [
      { q: "Can you respond to tenant complaints quickly?", a: "Yes. Report it to your NTC contact and we address it on the next visit or sooner for urgent issues." },
      { q: "Do you clean garbage and recycling rooms?", a: "Yes, including floors, bins areas and odour control. Bin haulage stays with your waste contractor." },
      hq,
      { q: "Do you work with multi-building portfolios?", a: "Yes — see our property managers page for multi-site coverage and consolidated invoicing." },
    ],
  },
  {
    path: "/post-construction-cleaning",
    facility: "Post-construction",
    title: "Post-Construction Cleaning Niagara | Builder & Renovation Cleans | NTC",
    description: "Rough, final and touch-up post-construction cleaning for builders, contractors and renovated commercial spaces across Niagara. Insured, WSIB-cleared.",
    h1: "Post-construction cleaning across Niagara",
    eyebrow: "Post-Construction",
    intro: [
      "A renovation isn't finished until the dust is gone. General contractors, builders and tenants moving into a new fit-out need the space handed over clean, on a fixed date, without the trades tripping over a cleaning crew.",
      "We work in phases: a rough clean to clear debris and dust once heavy work wraps, a final clean that takes every surface from ceiling to floor, and a touch-up clean right before handover or occupancy.",
      "Our crews follow your site safety rules and sign-in, and we're insured and WSIB-cleared — documents are available before we set foot on site. Once the space is occupied, we can continue as the recurring cleaner.",
    ],
    included: [
      { heading: "Rough clean", items: ["Debris and packaging removal to site bin", "Sweep and vacuum all floors", "Remove stickers and protective film", "Wipe down dusty surfaces"] },
      { heading: "Final clean", items: ["Dust ceilings, vents and light fixtures", "Windows, frames and sills", "Washrooms and kitchens detailed", "Floors scrubbed or vacuumed"] },
      { heading: "Touch-up", items: ["Final dust and fingerprint pass", "Glass and mirrors polished", "Entrance and lobby detail", "Ready for walkthrough or occupancy"] },
    ],
    faqs: [
      { q: "Do you provide insurance and WSIB documents for site access?", a: "Yes. A certificate of insurance and WSIB clearance are sent before work begins." },
      { q: "Can you work to a handover deadline?", a: "Yes. We schedule each phase around your construction timeline and handover date." },
      hq,
      { q: "Do you remove construction debris?", a: "We remove light debris and packaging to your on-site bin. Heavy debris and bin haulage stay with the contractor." },
      { q: "Can you stay on as the regular cleaner?", a: "Yes. Many post-construction jobs become recurring office or common area accounts." },
    ],
  },
];

export const findCommercialPage = (path: string) => COMMERCIAL_PAGES.find((p) => p.path === path);
