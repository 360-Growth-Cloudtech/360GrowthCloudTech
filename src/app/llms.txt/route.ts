import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# 360CloudTech

> Custom Software Development Company serving US, UK, and global businesses with US timezone overlap, fixed-scope delivery, and 100% IP ownership.

## Overview
360CloudTech engineers mission-critical enterprise web, mobile, SaaS, and cloud applications. We work with high-growth startups and established enterprises across North America, Europe, Australia, and India, offering dedicated senior developer teams with full US Eastern/Pacific timezone alignment.

## Core Capabilities & Service Offerings
- [Enterprise Application Development](${SITE_URL}/enterprise-application-development): Scalable, secure custom enterprise web and mobile applications with SSO, role-based access control, bank-grade encryption, and cloud-native architecture.
- [Custom Enterprise Software](${SITE_URL}/custom-enterprise-software): Tailored ERP, enterprise CRM, workflow automation, and employee/vendor portals that eliminate off-the-shelf licensing fees.
- [Custom Software Development](${SITE_URL}/custom-software-development): Full-cycle software development from MVP to large-scale legacy modernization.
- [Web Application Development](${SITE_URL}/web-application-development): High-performance web apps, PWAs, customer portals, and internal tools built on Next.js, React, Node.js, and Python.
- [Mobile App Development](${SITE_URL}/mobile-app-development): Native iOS, Android, Flutter, and React Native mobile applications.
- [AI & Automation](${SITE_URL}/ai-automation): Custom AI agents, LLM integrations, document intelligence, and automated process pipelines.
- [Cloud & DevOps](${SITE_URL}/cloud-devops): AWS, Google Cloud, Azure infrastructure management, Docker/Kubernetes containerization, CI/CD, and cost optimization.
- [SaaS Development](${SITE_URL}/saas-development): Multi-tenant architecture, subscription billing, tenant isolation, and B2B SaaS platforms.
- [Ecommerce Software Development](${SITE_URL}/ecommerce-software-development): Custom B2B/D2C stores, multi-vendor marketplaces, and headless commerce.
- [QA & Software Testing](${SITE_URL}/qa-testing): Automated and manual functional, regression, API, load, and security testing.
- [Maintenance & Support](${SITE_URL}/maintenance-support): SLA-backed 24/7 software maintenance, bug fixes, performance monitoring, and security patching.

## Industries
- [Healthcare & HealthTech](${SITE_URL}/healthcare-software-development): HIPAA-compliant telemedicine, IVR, EHR/EMR integrations, and patient portals.
- [Fintech & Banking](${SITE_URL}/fintech-software-development): Payment gateways, lending workflows, KYC/AML automation, and financial analytics.
- [Logistics & Supply Chain](${SITE_URL}/logistics-software-development): Fleet tracking, warehouse management, and dispatch automation.
- [Manufacturing & Industrial](${SITE_URL}/manufacturing-software-development): Production line dashboards, QC inspection systems (QRI), and ERP.
- [Retail & Consumer Goods](${SITE_URL}/retail-software-development): Omnichannel commerce, inventory synchronization, and POS integrations.
- [Real Estate & PropTech](${SITE_URL}/real-estate-software-development): Property listings, tenant portals, and booking systems.
- [Travel & Hospitality](${SITE_URL}/travel-software-development): Tour packages, destination booking engines, and travel CRM.
- [Education & EdTech](${SITE_URL}/education-software-development): LMS platforms, student portals, and video course systems.

## Engagement Models
1. Dedicated Engineering Team: Dedicated full-time senior engineers integrated into client sprints with US timezone overlap.
2. Fixed-Price / Milestone Delivery: Scoped requirements, guaranteed timeline, and predictable budget.
3. Staff Augmentation: Rapid onboarding of vetted senior full-stack, mobile, cloud, or QA developers.

## Verified Case Studies
- Healthcare IVR & Appointment Platform: ${SITE_URL}/case-studies/healthcare-ivr-platform
- Mahasu Travels Multi-Tenant CRM: ${SITE_URL}/case-studies/mahasu-travels-crm
- Atory Hub Architectural Inspirations & Directory: ${SITE_URL}/case-studies/atory-hub
- Dermayoga D2C Brand & E-Commerce Store: ${SITE_URL}/case-studies/dermayoga
- Skinfinity Academy Certification & EdTech Platform: ${SITE_URL}/case-studies/skinfinity-academy

## Contact Information
- Website: ${SITE_URL}
- Free Architecture Consultation: ${SITE_URL}/contact
- Email: contact@360cloudtech.com
- Phone / WhatsApp: +91 96433 20521
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

