export const services = [
  {
    audience: "mining" as const,
    title: "Design Modelling",
    description:
      "Engineering and modelling to develop solutions around specific mill and operating requirements.",
  },
  {
    audience: "mining" as const,
    title: "Reline Supervision",
    description:
      "On-site technical support to help liner installation and replacement run safely and efficiently.",
  },
  {
    audience: "mining" as const,
    title: "Wear Monitoring",
    description:
      "Track liner wear and condition to support maintenance planning and replacement decisions.",
  },
  {
    audience: "mining" as const,
    title: "Grinding Circuit Survey",
    description:
      "Assess grinding circuit performance to identify opportunities for improved efficiency and throughput.",
  },
  {
    audience: "mining" as const,
    title: "Process Modelling (JKSimMet)",
    description:
      "Model grinding circuit behaviour to evaluate operating conditions and optimisation opportunities.",
  },
  {
    audience: "mining" as const,
    title: "Mill Operation Support",
    description:
      "Technical support to help improve mill operation, reliability and grinding performance.",
  },
  {
    audience: "mining" as const,
    title: "Marked Ball Test",
    description:
      "Evaluate grinding media wear to support alloy selection and cost-effective media performance.",
  },
  {
    audience: "mining" as const,
    title: "Bench-scale Test for Better Recovery",
    description:
      "Testing to understand grinding behaviour and support improved mineral recovery.",
  },
  {
    audience: "mining" as const,
    title: "Ball Size Optimisation",
    description:
      "Determine suitable grinding media sizes to improve grinding efficiency and mill performance.",
  },
  {
    audience: "cement" as const,
    title: "Design Modelling",
    description:
      "Engineering and modelling for tube mills and VRMs around specific cement plant conditions.",
  },
  {
    audience: "cement" as const,
    title: "Reline Supervision",
    description:
      "On-site support for liner installation and replacement on cement grinding mills.",
  },
  {
    audience: "cement" as const,
    title: "Wear Monitoring",
    description:
      "Monitor liner and grinding-media wear to plan maintenance windows with less disruption.",
  },
  {
    audience: "cement" as const,
    title: "Mill Audits",
    description:
      "Field audits that capture wear profiles and operating data to guide the next lining cycle.",
  },
  {
    audience: "cement" as const,
    title: "Process Optimisation",
    description:
      "Support for grinding circuit settings that improve throughput and energy use in cement plants.",
  },
  {
    audience: "cement" as const,
    title: "VRM Support",
    description:
      "Technical support for vertical roller mill wear parts, rollers and table performance.",
  },
  {
    audience: "cement" as const,
    title: "Grinding Media Support",
    description:
      "Support for media selection and charge management to improve cement mill grinding efficiency.",
  },
  {
    audience: "cement" as const,
    title: "Mill Internals Optimisation",
    description:
      "Review of diaphragms, liners and internals to improve grinding performance and energy use.",
  },
  {
    audience: "cement" as const,
    title: "Shutdown Planning Support",
    description:
      "Technical planning for liner replacement windows to reduce downtime during planned shutdowns.",
  },
] as const;

export const technologyPillars = [
  {
    index: "01",
    label: "Material Engineering",
    title: "Developed Around The Wear.",
    description:
      "New alloys and material combinations are developed around application requirements, with the aim of improving wear life and delivering greater value in operation.",
    mediaHint: "video",
  },
  {
    index: "02",
    label: "Grinding Research",
    title: "Test First. Optimise Before Operation.",
    description:
      "Pilot-scale mill testing helps determine suitable ball sizes for specific operating conditions, while grindability studies provide data that can guide mill configuration and energy use.",
    mediaHint: "video",
  },
  {
    index: "03",
    label: "Performance Development",
    title: "Designed To Keep Getting Better.",
    description:
      "Wear-profile scanning, mill audits and field observations can provide feedback to refine designs, support maintenance planning and improve grinding performance over the product lifecycle.",
    mediaHint: "video",
  },
] as const;

export const faqs = [
  {
    question: "Can AIA solutions be used with our existing mill?",
    answer:
      "Yes. AIA wear solutions are engineered for specific mill types and operating conditions, and can be designed to work with existing equipment.",
  },
  {
    question: "What exactly does AIA Engineering provide?",
    answer:
      "AIA designs, develops, manufactures, installs and services wear-, corrosion- and abrasion-resistant components, along with solutions aimed at improving grinding performance.",
  },
  {
    question: "Which industries does AIA work with?",
    answer:
      "We serve mining, cement, quarry and thermal power operations with grinding and crushing wear solutions.",
  },
  {
    question: "Does AIA provide installation and on-site support?",
    answer:
      "Yes. From reline supervision to mill operation support, our teams help installation and performance programmes run safely and efficiently.",
  },
  {
    question:
      "What happens if we have a specific wear or performance problem?",
    answer:
      "Speak with a specialist. We review application conditions, metallurgy and operating data to recommend a solution path.",
  },
] as const;

export const insights = [
  {
    date: "08 December 2026",
    type: "Blogs" as const,
    title:
      "What Plant Teams Should Look for When Selecting Grinding Media and Wear Parts",
    href: "/resources/insights/selecting-grinding-media",
    image: "/images/insight-1.jpg",
  },
  {
    date: "24 December 2026",
    type: "Blogs" as const,
    title:
      "The Role of Material, Design and Operating Conditions in Extending Mill Life",
    href: "/resources/insights/extending-mill-life",
    image: "/images/insight-2.jpg",
  },
  {
    date: "12 January 2026",
    type: "News" as const,
    title: "AIA expands global service coverage for critical grinding assets",
    href: "/resources/insights/global-service-coverage",
    image: "/images/insight-1.jpg",
  },
  {
    date: "02 February 2026",
    type: "Press Release" as const,
    title: "AIA Engineering reports continued investment in wear R&D",
    href: "/resources/insights/wear-rd-investment",
    image: "/images/insight-2.jpg",
  },
] as const;

export const caseStudies = [
  {
    title: "40ft SAG mill in Latin America",
    meta: "Life improvement - Throughput increase - Power reduction",
    href: "/resources/case-studies/sag-latin-america",
    image: "/images/case-1.png",
  },
  {
    title: "15ft Ball mill in India",
    meta: "Throughput increase - Power consumption",
    href: "/resources/case-studies/ball-mill-india",
    image: "/images/case-2.png",
  },
  {
    title: "34ft SAG mill in West Africa",
    meta: "Life improvement - Throughput increase",
    href: "/resources/case-studies/sag-west-africa",
    image: "/images/case-3.png",
  },
] as const;
