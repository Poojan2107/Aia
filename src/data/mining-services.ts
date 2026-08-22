export const miningServicesPage = {
  hero: {
    line1: "Mining Services",
    line2: "Design, installation, monitoring, and process optimization",
    image: "/images/mining-hero.jpg",
    imageAlt:
      "Interior view through an industrial grinding mill with lined shell and grinding media",
  },
  groups: [
    {
      id: "design-wear",
      label: "Design & Wear",
      note: "Model, scan, and reline",
      services: [
        {
          id: "design-modelling",
          title: "Design Modelling & Virtual Validation",
          subtitle: "Discrete Element Method simulation",
          body: "Using advanced DEM simulation, we model liner profiles, lifter designs and charge motion specific to your mill and ore characteristics — validating the lining system before a component is manufactured.",
          image: "/images/funnel/funnel-design.png",
          imageAlt: "DEM particle simulation inside a grinding mill",
        },
        {
          id: "wear-scanning",
          title: "Liner Wear Monitoring & Scanning",
          subtitle: "3D scan overlay through the wear cycle",
          body: "We track liner wear progression throughout each cycle with 3D scanning — giving maintenance teams data to schedule activities in advance.",
          image: "/images/funnel/funnel-scan.png",
          imageAlt: "3D laser scan overlay on a worn mill liner",
        },
        {
          id: "reline",
          title: "Reline Supervision",
          subtitle: "On-site support through shutdown",
          body: "Our engineers supervise every reline on-site, overseeing installation sequence, bolt torquing and quality assurance so liners are fitted correctly and the mill returns to operation quickly.",
          image: "/images/funnel/funnel-install.png",
          imageAlt: "Mill liner being installed in the shell",
        },
      ],
    },
    {
      id: "process-ops",
      label: "Process & Operations",
      note: "Survey, model, and support",
      services: [
        {
          id: "circuit-survey",
          title: "Grinding Circuit Survey",
          subtitle: "Sampling and size-distribution analysis",
          body: "We sample and analyse size distribution across your grinding circuit — establishing a baseline that shows where efficiency is being lost.",
          image: "/images/funnel/funnel-circuit.png",
          imageAlt: "Grinding circuit with SAG mill, ball mill and cyclones",
        },
        {
          id: "process-modelling",
          title: "Process Modelling (JKSimMet)",
          subtitle: "Calibrated circuit models",
          body: "Using JKSimMet, we model throughput, power draw and product size response of your circuit to proposed changes — before a change is made on the mill.",
          image: "/images/funnel/funnel-process.png",
          imageAlt: "Process-model view of a grinding mill",
        },
        {
          id: "mill-support",
          title: "Mill Operation Support",
          subtitle: "Alongside your metallurgy and operations teams",
          body: "We work with your operations team on charge mass, media sizing, fill level and operating speed so efficiency gains are implemented and held.",
          image: "/images/funnel/funnel-ops.png",
          imageAlt: "Operating grinding mill with tumbling charge",
        },
      ],
    },
    {
      id: "media-lab",
      label: "Media & Laboratory",
      note: "Alloy, size, and recovery",
      services: [
        {
          id: "marked-ball",
          title: "Marked Ball Test (MBT)",
          subtitle: "Grinding media alloy selection",
          body: "Evaluate grinding media wear to support alloy selection and cost-effective media performance.",
          image: "/images/funnel/funnel-media.png",
          imageAlt: "High-chrome grinding media",
        },
        {
          id: "media-size",
          title: "Grinding Media Size Optimization",
          subtitle: "Charge sizing for mill efficiency",
          body: "Determine suitable grinding media sizes to improve grinding efficiency and mill performance.",
          image: "/images/funnel/funnel-ball-lining.png",
          imageAlt: "Grinding media inside a ball mill",
        },
        {
          id: "bench-testing",
          title: "Laboratory Bench Testing",
          subtitle: "Grinding media and recovery optimisation",
          body: "Laboratory chemistry and wear testing to understand grinding behaviour and support improved mineral recovery.",
          image: "/images/funnel/funnel-process.png",
          imageAlt: "Process testing overlay on a grinding mill model",
        },
      ],
    },
  ],
} as const;
