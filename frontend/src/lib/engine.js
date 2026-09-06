// JMIB deterministic "AI" engine + universal societal-challenge data. No external API.

export const LIFECYCLE = [
  "Submitted",
  "AI Analyzed",
  "Verified",
  "Categorized",
  "University Matched",
  "Solution Partner Matched",
  "Proposal",
  "Prototype",
  "Pilot",
  "Deployment",
  "Impact Measured",
];

export const PIPELINE = [
  "Problem",
  "AI",
  "Right Experts",
  "University",
  "Industry / NGO",
  "Solution",
  "Impact",
];

export const CATEGORIES = [
  "Health & Healthcare",
  "Water & Sanitation",
  "Environment & Waste Management",
  "Roads & Public Infrastructure",
  "Electricity & Street Lighting",
  "Agriculture & Rural Development",
  "Education",
  "Public Safety",
  "Transportation",
  "Women & Child Welfare",
  "Accessibility & Disability",
  "Digital Governance",
  "Energy",
  "Employment & Skill Development",
  "Disaster Management",
  "Smart City / Urban Development",
  "Other",
];

export const DISTRICTS = [
  "Ranchi",
  "Dhanbad",
  "East Singhbhum",
  "West Singhbhum",
  "Jamshedpur",
  "Hazaribagh",
  "Palamu",
  "Giridih",
  "Gumla",
  "Dumka",
  "Bokaro",
  "Deoghar",
  "Ramgarh",
];

export const URGENCIES = ["Critical", "High", "Moderate", "Low"];

export const SUPPORT_OPTIONS = [
  "Funding",
  "Mentorship",
  "Prototype",
  "Technology",
  "Deployment",
];

export const ROLES = [
  { id: "citizen", label: "Citizen / Problem Reporter" },
  { id: "government", label: "Government" },
  { id: "university", label: "University / Researcher" },
  { id: "industry", label: "Industry / Startup" },
  { id: "ngo", label: "NGO / Organization" },
];

// Per-category "AI" knowledge base.
const CATEGORY_META = {
  "Health & Healthcare": { sub: "Public Health & Diagnostics", weight: 12, expertise: ["Biomedical Engineering", "Public Health", "Diagnostics", "Community Nursing"], disciplines: ["Medical Sciences", "Biomedical Engineering", "Public Health"], industryTypes: ["HealthTech companies", "Hospitals", "Diagnostics firms"], department: "Health & Family Welfare Dept.", solution: "Low-cost point-of-care screening + community outreach" },
  "Water & Sanitation": { sub: "Storm-water & Drainage", weight: 11, expertise: ["Civil Engineering", "Hydrology", "Urban Planning", "GIS"], disciplines: ["Civil Engineering", "Environmental Engineering", "Water Resources"], industryTypes: ["Water-management companies", "Smart-infrastructure firms"], department: "PHED / Urban Development", solution: "Smart drainage monitoring + improved storm-water drainage" },
  "Environment & Waste Management": { sub: "Solid Waste Segregation", weight: 10, expertise: ["Environmental Engineering", "Chemical Engineering", "Urban Planning"], disciplines: ["Environmental Engineering", "Chemical Engineering", "Urban Planning"], industryTypes: ["Waste-management companies", "Recycling startups", "NGOs"], department: "Urban Development / Pollution Control Board", solution: "Source segregation + decentralized processing" },
  "Roads & Public Infrastructure": { sub: "Road Damage & Repair", weight: 10, expertise: ["Civil Engineering", "Transportation Engineering", "Materials Science"], disciplines: ["Civil Engineering", "Transportation Engineering", "Materials Science"], industryTypes: ["Infrastructure companies", "Construction firms"], department: "Public Works Department (PWD)", solution: "Durable materials + road condition monitoring" },
  "Electricity & Street Lighting": { sub: "Street Lighting Outage", weight: 9, expertise: ["Electrical Engineering", "Electronics", "IoT / Smart City"], disciplines: ["Electrical Engineering", "Electronics", "IoT"], industryTypes: ["Smart-lighting / IoT companies", "Energy utilities"], department: "Energy Dept. / DISCOM", solution: "IoT-enabled smart lighting + fault detection" },
  "Agriculture & Rural Development": { sub: "Irrigation & Crop Monitoring", weight: 10, expertise: ["Agricultural Engineering", "Mechanical Engineering", "AI / IoT"], disciplines: ["Agricultural Sciences", "Mechanical Engineering", "AI / IoT"], industryTypes: ["AgriTech companies", "Farm-equipment firms", "Cooperatives"], department: "Agriculture & Rural Development Dept.", solution: "Sensor-based irrigation + farmer advisory" },
  Education: { sub: "Access & Dropout", weight: 9, expertise: ["Education", "Computer Science / EdTech", "Psychology / Social Science"], disciplines: ["Education", "Computer Science / EdTech", "Social Science"], industryTypes: ["EdTech companies", "NGOs", "Foundations"], department: "School Education & Literacy Dept.", solution: "Blended learning + student retention programs" },
  "Public Safety": { sub: "Community Safety", weight: 9, expertise: ["Computer Science / AI", "Electronics", "Public Administration"], disciplines: ["Computer Science / AI", "Electronics", "Social Science"], industryTypes: ["SafetyTech companies", "NGOs"], department: "Home / Police Dept.", solution: "AI monitoring + community alert systems" },
  Transportation: { sub: "Public Transit & Mobility", weight: 8, expertise: ["Transportation Engineering", "Data Analytics", "Urban Planning"], disciplines: ["Transportation Engineering", "Civil Engineering", "Data Science"], industryTypes: ["Mobility companies", "Transport operators"], department: "Transport Dept.", solution: "Route optimization + smart transit" },
  "Women & Child Welfare": { sub: "Maternal & Child Support", weight: 10, expertise: ["Public Health", "Social Work", "Community Nursing"], disciplines: ["Public Health", "Social Work", "Psychology"], industryTypes: ["NGOs", "HealthTech companies", "Foundations"], department: "Women & Child Development Dept.", solution: "Community programs + digital tracking" },
  "Accessibility & Disability": { sub: "Assistive Access", weight: 9, expertise: ["Assistive Technology", "Mechanical Design", "Human-Computer Interaction"], disciplines: ["Mechanical Engineering", "Computer Science", "Rehabilitation Sciences"], industryTypes: ["Assistive-technology companies", "Startups", "NGOs"], department: "Social Welfare Dept.", solution: "Accessible infrastructure + assistive devices" },
  "Digital Governance": { sub: "e-Governance & Service Delivery", weight: 8, expertise: ["Computer Science", "Data Analytics", "Public Administration"], disciplines: ["Computer Science", "Information Systems", "Public Administration"], industryTypes: ["GovTech startups", "IT services companies"], department: "IT & e-Governance Dept.", solution: "Digital service portals + workflow automation" },
  Energy: { sub: "Renewable Energy Access", weight: 9, expertise: ["Electrical Engineering", "Renewable Energy", "Power Systems"], disciplines: ["Electrical Engineering", "Energy Engineering", "Environmental Science"], industryTypes: ["Renewable-energy companies", "Energy utilities"], department: "Energy Dept. / JREDA", solution: "Distributed solar + micro-grids" },
  "Employment & Skill Development": { sub: "Skilling & Livelihoods", weight: 8, expertise: ["Vocational Training", "Data Analytics", "Management"], disciplines: ["Management", "Computer Science", "Social Science"], industryTypes: ["Skilling companies", "Startups", "CSR organizations"], department: "Labour, Employment & Training Dept.", solution: "Skill mapping + placement linkage" },
  "Disaster Management": { sub: "Early Warning & Response", weight: 10, expertise: ["Disaster Management", "GIS / Remote Sensing", "Civil Engineering"], disciplines: ["Civil Engineering", "Geoinformatics", "Environmental Science"], industryTypes: ["Disaster-tech companies", "NGOs"], department: "Disaster Management Dept.", solution: "Early-warning systems + response coordination" },
  "Smart City / Urban Development": { sub: "Urban Systems", weight: 8, expertise: ["Urban Planning", "IoT / Smart City", "Data Analytics"], disciplines: ["Urban Planning", "Civil Engineering", "Computer Science"], industryTypes: ["Smart-city companies", "IoT firms"], department: "Urban Development & Housing Dept.", solution: "Integrated urban sensing + planning" },
  Other: { sub: "General Societal Issue", weight: 7, expertise: ["Interdisciplinary Research", "Data Analytics", "Social Science"], disciplines: ["Interdisciplinary Studies", "Social Science", "Engineering"], industryTypes: ["Relevant industry partners", "NGOs", "Startups"], department: "District Administration", solution: "Multi-stakeholder collaborative solution" },
};

const UNIVERSITIES = [
  { name: "IIT (ISM) Dhanbad", full: "Indian Institute of Technology (ISM)", offset: 6, disciplines: ["Engineering", "IoT", "Sensors", "Data Analytics"], categories: ["Environment & Waste Management", "Energy", "Smart City / Urban Development", "Disaster Management", "Digital Governance", "Public Safety", "Transportation", "Electricity & Street Lighting"] },
  { name: "NIT Jamshedpur", full: "National Institute of Technology", offset: 5, disciplines: ["Civil Engineering", "Mechanical Engineering", "Transportation Engineering"], categories: ["Roads & Public Infrastructure", "Water & Sanitation", "Transportation", "Smart City / Urban Development", "Disaster Management"] },
  { name: "BIT Mesra", full: "Birla Institute of Technology, Mesra", offset: 4, disciplines: ["Biotechnology", "Electronics", "Computer Science", "Engineering"], categories: ["Health & Healthcare", "Electricity & Street Lighting", "Digital Governance", "Smart City / Urban Development", "Accessibility & Disability", "Public Safety"] },
  { name: "RIMS Ranchi", full: "Rajendra Institute of Medical Sciences", offset: 5, disciplines: ["Medical Sciences", "Public Health", "Clinical Research"], categories: ["Health & Healthcare", "Women & Child Welfare"] },
  { name: "Birsa Agricultural University", full: "Birsa Agricultural University, Ranchi", offset: 4, disciplines: ["Agricultural Sciences", "Agri-Engineering", "Rural Development"], categories: ["Agriculture & Rural Development", "Environment & Waste Management", "Water & Sanitation"] },
  { name: "Central University of Jharkhand", full: "Central University of Jharkhand", offset: 3, disciplines: ["Environmental Science", "Education", "Computer Science"], categories: ["Environment & Waste Management", "Education", "Energy", "Water & Sanitation"] },
  { name: "Ranchi University", full: "Ranchi University", offset: 2, disciplines: ["Social Science", "Education", "Public Administration"], categories: ["Education", "Women & Child Welfare", "Public Safety", "Employment & Skill Development", "Digital Governance"] },
  { name: "XISS Ranchi", full: "Xavier Institute of Social Service", offset: 3, disciplines: ["Social Work", "Rural Management", "Public Policy"], categories: ["Employment & Skill Development", "Women & Child Welfare", "Education", "Agriculture & Rural Development"] },
  { name: "Jharkhand Rai University", full: "Jharkhand Rai University", offset: 2, disciplines: ["Computer Science", "Management", "EdTech"], categories: ["Digital Governance", "Education", "Employment & Skill Development", "Smart City / Urban Development"] },
];

const PARTNERS = [
  { name: "AquaFlow Water Solutions", type: "Company", offset: 3, capabilities: ["Storm-water drainage systems", "IoT flood sensors", "Hydrological modeling"], support: ["Funding", "Technology", "Deployment"], categories: ["Water & Sanitation", "Environment & Waste Management", "Disaster Management"] },
  { name: "BrightGrid Smart Lighting", type: "Company", offset: 3, capabilities: ["IoT smart street lighting", "Fault-detection networks", "Energy-efficient LEDs"], support: ["Technology", "Prototype", "Deployment"], categories: ["Electricity & Street Lighting", "Smart City / Urban Development", "Energy"] },
  { name: "GreenCycle Waste Management", type: "Company", offset: 2, capabilities: ["Decentralized waste processing", "Source segregation systems", "Recycling logistics"], support: ["Funding", "Technology", "Deployment"], categories: ["Environment & Waste Management", "Smart City / Urban Development"] },
  { name: "AgroSense Technologies", type: "Startup", offset: 3, capabilities: ["Sensor-based irrigation", "Crop advisory AI", "Solar farm pumps"], support: ["Prototype", "Technology", "Mentorship"], categories: ["Agriculture & Rural Development", "Energy", "Water & Sanitation"] },
  { name: "VitalSense Health Technologies", type: "Company", offset: 3, capabilities: ["Non-invasive point-of-care diagnostics", "Optical spectroscopy", "ISO 13485 manufacturing"], support: ["Funding", "Prototype", "Technology", "Deployment"], categories: ["Health & Healthcare", "Women & Child Welfare"] },
  { name: "EduReach Foundation", type: "NGO", offset: 2, capabilities: ["Community learning centers", "Teacher training programs", "Dropout tracking"], support: ["Mentorship", "Deployment", "Funding"], categories: ["Education", "Women & Child Welfare", "Employment & Skill Development"] },
  { name: "SafePath Mobility", type: "Company", offset: 2, capabilities: ["Smart transit routing", "Road-condition analytics", "Commuter apps"], support: ["Technology", "Prototype", "Deployment"], categories: ["Transportation", "Roads & Public Infrastructure", "Smart City / Urban Development"] },
  { name: "SolarNirman Energy", type: "Company", offset: 3, capabilities: ["Distributed solar micro-grids", "Battery storage", "Rural electrification"], support: ["Funding", "Technology", "Deployment"], categories: ["Energy", "Electricity & Street Lighting", "Agriculture & Rural Development"] },
  { name: "AccessAble Assistive Tech", type: "Startup", offset: 3, capabilities: ["Assistive mobility devices", "Accessible-design consulting", "Low-cost prosthetics"], support: ["Prototype", "Mentorship", "Technology"], categories: ["Accessibility & Disability", "Health & Healthcare"] },
  { name: "Jharkhand CSR Alliance", type: "CSR", offset: 2, capabilities: ["CSR funding pools", "Livelihood programs", "Cross-sector coordination"], support: ["Funding", "Mentorship", "Deployment"], categories: ["Employment & Skill Development", "Agriculture & Rural Development", "Education", "Women & Child Welfare"] },
  { name: "ResQ Disaster Systems", type: "Company", offset: 2, capabilities: ["Early-warning sensors", "Emergency response platforms", "Relief logistics"], support: ["Technology", "Prototype", "Deployment"], categories: ["Disaster Management", "Public Safety", "Water & Sanitation"] },
  { name: "CivicOS Digital Governance", type: "Startup", offset: 2, capabilities: ["e-Governance portals", "Workflow automation", "Citizen service apps"], support: ["Technology", "Prototype", "Mentorship"], categories: ["Digital Governance", "Smart City / Urban Development", "Public Safety"] },
  { name: "BuildStrong Infra", type: "Company", offset: 2, capabilities: ["Durable road materials", "Bridge construction", "Condition monitoring"], support: ["Funding", "Technology", "Deployment"], categories: ["Roads & Public Infrastructure", "Water & Sanitation", "Smart City / Urban Development"] },
];

const SIMILAR_BANK = {
  "Health & Healthcare": ["Rural telemedicine access points", "Portable jaundice detection for newborns", "AI-assisted X-ray triage"],
  "Water & Sanitation": ["Village storm-water drainage upgrade", "Community toilet maintenance system", "Water-quality sensor network"],
  "Environment & Waste Management": ["Urban plastic-waste segregation", "Decentralized composting units", "Air-quality monitoring grid"],
  "Roads & Public Infrastructure": ["Pothole detection & repair tracking", "Rural connectivity road audit", "Footpath accessibility upgrade"],
  "Electricity & Street Lighting": ["Fault-reporting for street lights", "Solar street lighting in villages", "Smart feeder monitoring"],
  "Agriculture & Rural Development": ["Soil-health advisory for farmers", "Cold-storage for perishables", "Farm-pond water management"],
  Education: ["Digital classrooms in rural schools", "Dropout early-warning system", "Vernacular learning content"],
  "Public Safety": ["Women safety alert network", "Streetlight-linked safety mapping", "Emergency SOS kiosks"],
  Transportation: ["Rural bus route optimization", "School transport tracking", "Last-mile connectivity app"],
  "Women & Child Welfare": ["Anganwadi nutrition tracking", "Maternal health reminders", "Girl-child education support"],
  "Accessibility & Disability": ["Ramp & accessible-toilet audit", "Assistive devices distribution", "Sign-language service desks"],
  "Digital Governance": ["Single-window certificate portal", "Grievance tracking dashboard", "Digital land records"],
  Energy: ["Solar micro-grid for hamlets", "Energy-efficient public buildings", "Biogas for rural clusters"],
  "Employment & Skill Development": ["Local skilling-to-jobs linkage", "Artisan e-marketplace", "Youth apprenticeship program"],
  "Disaster Management": ["Flood early-warning for river belts", "Landslide risk mapping", "Community relief coordination"],
  "Smart City / Urban Development": ["Integrated city command dashboard", "Smart parking & traffic", "Public-asset monitoring"],
  Other: ["Cross-sector civic improvement", "Community-driven local initiative"],
};

const KEYWORD_MAP = [
  [["water", "drain", "flood", "logging", "sanitation", "toilet", "sewage"], "Water & Sanitation"],
  [["waste", "garbage", "segregation", "plastic", "litter", "pollution", "compost"], "Environment & Waste Management"],
  [["road", "pothole", "bridge", "footpath", "infrastructure"], "Roads & Public Infrastructure"],
  [["streetlight", "street light", "lighting", "transformer", "power cut", "electric"], "Electricity & Street Lighting"],
  [["crop", "farm", "irrigation", "agri", "soil", "harvest", "farmer"], "Agriculture & Rural Development"],
  [["school", "student", "dropout", "teacher", "education", "learning"], "Education"],
  [["crime", "safety", "police", "harassment", "theft", "security"], "Public Safety"],
  [["bus", "transport", "traffic", "vehicle", "commute", "mobility"], "Transportation"],
  [["women", "maternal", "anganwadi", "girl child", "child welfare"], "Women & Child Welfare"],
  [["disable", "disability", "wheelchair", "ramp", "accessib", "blind"], "Accessibility & Disability"],
  [["digital", "online portal", "e-gov", "governance", "certificate"], "Digital Governance"],
  [["solar", "renewable", "battery", "micro-grid", "energy"], "Energy"],
  [["job", "employment", "skill", "training", "livelihood", "unemploy"], "Employment & Skill Development"],
  [["disaster", "earthquake", "landslide", "emergency", "relief", "cyclone"], "Disaster Management"],
  [["smart city", "urban planning", "city command"], "Smart City / Urban Development"],
  [["health", "hospital", "disease", "medicine", "clinic", "anemia", "screening", "telemedicine"], "Health & Healthcare"],
];

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
  return h;
}

function urgencyWeight(u) {
  return { Critical: 32, High: 26, Moderate: 18, Low: 12 }[u] || 18;
}

function parsePeople(v) {
  if (!v) return 0;
  const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? 0 : n;
}

function inferCategory(text) {
  const t = (text || "").toLowerCase();
  for (const [keys, cat] of KEYWORD_MAP) {
    if (keys.some((k) => t.includes(k))) return cat;
  }
  return "Other";
}

export function resolveCategory(data) {
  if (data.domain && data.domain !== "Other" && CATEGORIES.includes(data.domain)) return data.domain;
  return inferCategory(`${data.title || ""} ${data.description || ""}`);
}

export function runAIAnalysis(data) {
  const category = resolveCategory(data);
  const meta = CATEGORY_META[category] || CATEGORY_META.Other;
  const people = parsePeople(data.peopleAffected);
  const peopleFactor = Math.min(28, Math.round(people / 15000));
  const textFactor = Math.min(8, Math.round((data.description || "").length / 40));
  let impact = 40 + urgencyWeight(data.urgency) + peopleFactor + meta.weight + textFactor;
  impact = Math.max(58, Math.min(98, impact));

  const priority = data.urgency === "Critical" ? "CRITICAL" : data.urgency === "High" ? "HIGH" : data.urgency === "Moderate" ? "MODERATE" : "LOW";
  const confidence = Math.max(82, Math.min(97, 80 + (hashString(data.title || "x") % 18)));

  return {
    category,
    subCategory: meta.sub,
    priority,
    impactScore: impact,
    confidence,
    requiredExpertise: meta.expertise,
    suggestedSolution: meta.solution,
    governmentDepartment: meta.department,
    universityDisciplines: meta.disciplines,
    industryTypes: meta.industryTypes,
    similarChallenges: (SIMILAR_BANK[category] || SIMILAR_BANK.Other).slice(0, 3),
  };
}

export function matchUniversities(data) {
  const cat = resolveCategory(data);
  return UNIVERSITIES.map((u) => {
    const match = u.categories.includes(cat);
    const base = match ? 88 : 58;
    const score = Math.min(98, base + u.offset + (hashString(u.name + (data.district || "")) % 4));
    const reason = match
      ? `Strong alignment with the ${cat} domain via its ${u.disciplines[0]} and ${u.disciplines[1]} programs.`
      : `Adjacent expertise in ${u.disciplines[0]} that can be adapted to this challenge.`;
    return { name: u.name, full: u.full, score, expertise: u.disciplines, reason, interested: false };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function matchIndustries(data) {
  const cat = resolveCategory(data);
  return PARTNERS.map((c) => {
    const match = c.categories.includes(cat);
    const base = match ? 86 : 56;
    const score = Math.min(97, base + c.offset + (hashString(c.name + cat) % 4));
    return {
      name: c.name,
      type: c.type,
      score,
      capabilities: c.capabilities,
      support: c.support,
      offered: [],
      reason: match ? `Direct capability alignment with ${cat} solutions at scale.` : `Transferable capacity adaptable to this challenge.`,
    };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

const OUTCOME_METRIC = {
  "Health & Healthcare": { label: "Screening / care coverage", before: 24, after: 91, unit: "%", quote: "Health workers now screen and refer cases in minutes, not days." },
  "Water & Sanitation": { label: "Road passable in monsoon", before: 32, after: 96, unit: "%", quote: "Children reach school dry and safe even at peak monsoon." },
  "Environment & Waste Management": { label: "Waste segregated at source", before: 18, after: 84, unit: "%", quote: "Cleaner wards and far less waste heading to landfill." },
  "Roads & Public Infrastructure": { label: "Roads in good condition", before: 41, after: 93, unit: "%", quote: "Smoother, safer roads connecting rural communities." },
  "Electricity & Street Lighting": { label: "Functional street lights", before: 46, after: 97, unit: "%", quote: "Neighbourhoods feel safer after dark for everyone." },
  "Agriculture & Rural Development": { label: "Water-use efficiency", before: 38, after: 88, unit: "%", quote: "Farmers grow more with less water and higher yields." },
  Education: { label: "Student retention", before: 63, after: 94, unit: "%", quote: "More children stay in school and learn better." },
  "Public Safety": { label: "Incident response coverage", before: 35, after: 89, unit: "%", quote: "Faster alerts and safer public spaces." },
  Transportation: { label: "On-time transit reliability", before: 52, after: 90, unit: "%", quote: "Commuters reach work and school on time." },
  "Women & Child Welfare": { label: "Service reach for mothers & children", before: 44, after: 92, unit: "%", quote: "More mothers and children receive timely support." },
  "Accessibility & Disability": { label: "Accessible public buildings", before: 22, after: 86, unit: "%", quote: "Public spaces now welcome everyone, regardless of ability." },
  "Digital Governance": { label: "Services delivered online", before: 29, after: 90, unit: "%", quote: "Citizens get certificates and services without queues." },
  Energy: { label: "Reliable power availability", before: 51, after: 95, unit: "%", quote: "Homes and clinics enjoy steady, clean power." },
  "Employment & Skill Development": { label: "Trainees placed in jobs", before: 33, after: 82, unit: "%", quote: "Local youth move from skilling straight into livelihoods." },
  "Disaster Management": { label: "Early-warning coverage", before: 27, after: 93, unit: "%", quote: "Communities get warned early and respond faster." },
  "Smart City / Urban Development": { label: "Assets actively monitored", before: 30, after: 88, unit: "%", quote: "City services run smarter and respond in real time." },
  Other: { label: "Problem resolution", before: 28, after: 90, unit: "%", quote: "A collaborative solution now improving lives on the ground." },
};

export function impactStory(c) {
  const cat = (c.ai && c.ai.category) || c.domain || "Other";
  const m = OUTCOME_METRIC[cat] || OUTCOME_METRIC.Other;
  const months = 8 + (hashString(c.title || "x") % 7);
  return {
    headline: `${cat} solution deployed in ${c.district}`,
    quote: m.quote,
    partner: (c.industries && c.industries[0] && c.industries[0].name) || "Solution partner",
    university: (c.universities && c.universities[0] && c.universities[0].name) || "Partner university",
    metrics: [
      { label: m.label, before: `${m.before}${m.unit}`, after: `${m.after}${m.unit}`, delta: m.after - m.before },
      { label: "People reached", before: "0", after: c.peopleAffected || "—", delta: null },
      { label: "Time to deploy", before: "—", after: `${months} months`, delta: null },
    ],
  };
}
