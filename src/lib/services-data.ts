import type { LucideIcon } from "lucide-react";
import { Sparkles, Box, Code2, Network, Diamond, TrendingUp, Cloud } from "lucide-react";

export type ServiceDiscipline = {
  number: string;
  title: string;
  summary: string;
  desc: string;
  bullets: string[];
  icon: LucideIcon;
};

export const serviceDisciplines: ServiceDiscipline[] = [
  {
    number: "01",
    title: "Product Strategy",
    summary: "Vision, roadmap, and architecture so your product solves the right problems from day one.",
    desc: "We align product vision with business goals before a single line of code is written. Roadmaps, scope, and architecture decisions that set your product up to win.",
    bullets: ["Product roadmaps", "Market analysis", "MVP scope & validation", "Stakeholder alignment"],
    icon: Sparkles,
  },
  {
    number: "02",
    title: "UX/UI Design",
    summary: "Research-driven interfaces that feel intuitive, look stunning, and convert across every device.",
    desc: "Interfaces that feel obvious to use and impossible to ignore. Research-backed design systems built for conversion, accessibility, and every screen size.",
    bullets: ["User research", "Wireframes & prototypes", "Design systems", "Usability testing"],
    icon: Box,
  },
  {
    number: "03",
    title: "Frontend Engineering",
    summary: "Pixel-perfect implementation in React, Next.js, and modern frameworks. Production-ready.",
    desc: "Pixel-perfect implementation in modern frameworks. Fast, responsive, and maintainable frontends your team can extend long after launch.",
    bullets: ["React / Next.js", "Responsive UI", "Performance optimization", "Component libraries"],
    icon: Code2,
  },
  {
    number: "04",
    title: "Backend Engineering",
    summary: "Production APIs, normalized schemas, and infrastructure that holds up under real load.",
    desc: "APIs, databases, and services engineered for real-world load. Secure, observable infrastructure that scales with your user base.",
    bullets: ["REST & GraphQL APIs", "Database design", "Auth & access control", "Microservices"],
    icon: Network,
  },
  {
    number: "05",
    title: "AI & Automation",
    summary: "LLM integration, retrieval, and workflow automation designed into the product, not bolted on.",
    desc: "Intelligent features woven into your product — not bolted on after the fact. From LLM integrations to automated workflows that save hours every week.",
    bullets: ["LLM integration", "RAG pipelines", "Workflow automation", "AI-powered features"],
    icon: Diamond,
  },
  {
    number: "06",
    title: "Digital Marketing",
    summary: "Data-driven campaigns, SEO, and growth strategies that turn traffic into measurable revenue.",
    desc: "Growth isn't guesswork. We build marketing systems — paid, organic, and analytics — that align with your product and scale as you do.",
    bullets: ["SEO & content strategy", "Paid ads (Google, Meta)", "Analytics & conversion tracking", "Brand & growth campaigns"],
    icon: TrendingUp,
  },
  {
    number: "07",
    title: "Cloud Infrastructure",
    summary: "Scalable cloud setup, CI/CD pipelines, and resilient infrastructure built for production.",
    desc: "From migration to day-two operations, we design cloud environments that stay fast, secure, and cost-efficient under real traffic.",
    bullets: ["Cloud migration", "CI/CD pipelines", "Infrastructure as Code", "Monitoring & auto-scaling"],
    icon: Cloud,
  },
];

export const serviceProcessSteps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We learn your goals, users, and constraints — then define scope, success metrics, and a realistic timeline.",
  },
  {
    number: "02",
    title: "Design",
    desc: "Wireframes, prototypes, and a validated UX before development begins. No surprises at launch.",
  },
  {
    number: "03",
    title: "Build",
    desc: "Agile sprints with weekly demos. You see working software early and often, with room to iterate.",
  },
  {
    number: "04",
    title: "Ship & Iterate",
    desc: "Production deployment, monitoring, and ongoing optimization. We stay with you after go-live.",
  },
  {
    number: "05",
    title: "Marketing",
    desc: "SEO, paid campaigns, and analytics wired to your launch — so growth is measurable from day one.",
  },
  {
    number: "06",
    title: "Cloud",
    desc: "Migration, CI/CD, and production ops — infrastructure that scales with traffic and stays cost-efficient.",
  },
];

export const servicesInPractice = [
  {
    tag: "Healthcare",
    title: "Patient Portal",
    desc: "HIPAA-compliant portal with 40% faster load times and 3x active user growth.",
    image: "/services/healthcare-portal.png",
    imageAlt: "Healthcare patient portal website mockup",
  },
  {
    tag: "Travel",
    title: "Booking Engine",
    desc: "Auto-scaling infrastructure delivering 99.99% uptime through peak seasons.",
    image: "/services/travel-booking.png",
    imageAlt: "Travel booking engine website mockup",
  },
  {
    tag: "Retail",
    title: "E-commerce Platform",
    desc: "Mobile-first storefront that doubled conversion rates with sub-second page loads.",
    image: "/services/retail-ecommerce.png",
    imageAlt: "E-commerce retail website mockup",
  },
  {
    tag: "Marketing",
    title: "Growth Campaign",
    desc: "Integrated SEO and paid media strategy that increased qualified leads by 60% in 90 days.",
    image: "/services/marketing-dashboard.png",
    imageAlt: "Digital marketing analytics dashboard mockup",
  },
  {
    tag: "Cloud",
    title: "Platform Migration",
    desc: "Zero-downtime cloud migration with CI/CD pipelines and 99.99% uptime SLA.",
    image: "/services/cloud-platform.png",
    imageAlt: "Cloud infrastructure dashboard mockup",
  },
];
