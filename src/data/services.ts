// The seven IFAL services — exactly these, in this order (handoff).
// Do not add, remove, rename, or reorder.

export type Service = {
  id: string;
  icon: string;
  title: string;
  shortLabel: string; // for the services-page tab bar
  footerLabel: string; // abbreviated name used in the footer
  body: string;
  deliverables: string[];
  fee: string;
};

export const SERVICES: Service[] = [
  {
    id: "accounting",
    icon: "calculator",
    title: "Accounting",
    shortLabel: "Accounting",
    footerLabel: "Accounting",
    body: "Accurate books, monthly management accounts, and payroll — kept current so you always know where you stand.",
    deliverables: [
      "Monthly, yearly, and other periodic financial statements that faithfully represent your business outcomes",
      "Bank reconciliation statements, receivables/payables, and general ledger reconciliation",
      "Payroll processing",
      "Inventory processing, management, and control",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "audit",
    icon: "shield-check",
    title: "Audit",
    shortLabel: "Audit",
    footerLabel: "Audit",
    body: "Dependable audit backing — statutory, internal, and specialist audits with findings you can act on rather than file away.",
    deliverables: [
      "Forensic audit and investigation",
      "Value-for-money audit",
      "Compliance audit",
      "Internal audit",
      "Due-diligence audit",
      "Audit review",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "tax",
    icon: "file-text",
    title: "Tax Management",
    shortLabel: "Tax Management",
    footerLabel: "Tax Management",
    body: "Registration, filings, and planning across VAT, PAYE, and company income tax (CIT). We keep you compliant with the regulations of the Nigeria Revenue Service (NRS).",
    deliverables: [
      "Registration and filings across VAT, PAYE, and company income tax (CIT)",
      "Tax strategy and planning",
      "Tax meetings, audit, and dispute representation",
      "Periodic updates on tax matters",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "software",
    icon: "settings",
    title: "Accounting Software Implementation & Customization",
    shortLabel: "Software",
    footerLabel: "Software Implementation",
    body: "Cloud-based, real-time, online accounting software — selected, set up, and tailored to match your business model.",
    deliverables: [
      "Requirements and package selection",
      "Installation and chart-of-accounts setup",
      "Workflow and report customization",
      "Data migration and go-live support",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "training",
    icon: "users",
    title: "Training",
    shortLabel: "Training",
    footerLabel: "Training",
    body: "Practical, hands-on finance and systems training for your team, built around their job expectations, tools, and reports.",
    deliverables: [
      "Finance fundamentals for non-accountants",
      "Best-practice training and professional updates for accountants",
      "Accounting software hands-on sessions",
      "Tax compliance workshops",
      "Tailored in-house programmes",
    ],
    fee: "Quoted per programme",
  },
  {
    id: "data",
    icon: "bar-chart",
    title: "Data Analysis",
    shortLabel: "Data Analysis",
    footerLabel: "Data Analysis",
    body: "Data analysis with statistical tools — turning your operational and financial data into reporting that answers the questions you are actually asking.",
    deliverables: [
      "Periodic operations, cost, and process data analysis",
      "Trend modelling",
      "Management reporting dashboards",
      "Project cost-benefit analysis (CBA)",
      "Break-even analysis",
      "Trend and time-series analysis",
      "Risk and scenario modelling",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "advisory",
    icon: "briefcase",
    title: "Business Advisory",
    shortLabel: "Business Advisory",
    footerLabel: "Business Advisory",
    body: "Financial modelling, budgeting, and advisory for owners making decisions about growth, funding, or restructuring.",
    deliverables: [
      "Business plan and start-up assistance",
      "Funding structure advisory",
      "Loan advisory",
      "Financial modelling, budgeting, and forecasts",
      "Budget design, implementation, and monitoring",
      "Turnaround management",
      "Risk and compliance",
      "Succession planning",
      "Business restructuring",
      "KYC reviews",
      "Excess bank charges recovery",
    ],
    fee: "Quoted per engagement",
  },
];

export const ENTITY_TYPES = [
  "Sole proprietor",
  "Limited company",
  "Partnership",
  "NGO",
];

// Nigerian filing calendar (verify against current NRS/CAC rules before relying on).
export const FILING_DEADLINES = [
  { obligation: "Value Added Tax (VAT)", authority: "NRS", frequency: "Monthly", due: "21st of following month" },
  { obligation: "PAYE remittance", authority: "State IRS", frequency: "Monthly", due: "10th of following month" },
  { obligation: "Company Income Tax", authority: "NRS", frequency: "Annual", due: "6 months after year end" },
  { obligation: "Annual return", authority: "CAC", frequency: "Annual", due: "30 June" },
];
