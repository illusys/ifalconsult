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
      "Monthly management accounts",
      "Bank and ledger reconciliation",
      "Payroll processing and payslips",
      "Year-end financial statements",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "audit",
    icon: "shield-check",
    title: "Audit",
    shortLabel: "Audit",
    footerLabel: "Audit",
    body: "Statutory and internal audits carried out to standard, with findings you can act on rather than file away.",
    deliverables: [
      "Statutory audit and opinion",
      "Internal control review",
      "Management letter with findings",
      "Board presentation of results",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "tax",
    icon: "file-text",
    title: "Tax Management",
    shortLabel: "Tax Management",
    footerLabel: "Tax Management",
    body: "Registration, filings, and planning across VAT, PAYE, and company income tax. We keep you compliant with FIRS.",
    deliverables: [
      "VAT, PAYE and CIT filings",
      "TIN and FIRS registration",
      "Tax planning and structuring",
      "Audit and dispute representation",
    ],
    fee: "Quoted per engagement",
  },
  {
    id: "software",
    icon: "settings",
    title: "Accounting Software Implementation & Customization",
    shortLabel: "Software",
    footerLabel: "Software Implementation",
    body: "Selection, setup, and tailoring of accounting systems to match how your business actually runs.",
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
    body: "Practical finance and systems training for your team, built around the tools and reports they use daily.",
    deliverables: [
      "Finance fundamentals for non-accountants",
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
    body: "Turning your financial and operational data into reporting that answers the questions you are actually asking.",
    deliverables: [
      "Management reporting dashboards",
      "Revenue and cost analysis",
      "Budget vs actual reporting",
      "Ad-hoc financial analysis",
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
      "Financial modelling and forecasts",
      "Budget design and monitoring",
      "Funding and investor readiness",
      "Restructuring advisory",
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

// Nigerian filing calendar (verify against current FIRS/CAC rules before relying on).
export const FILING_DEADLINES = [
  { obligation: "Value Added Tax (VAT)", authority: "FIRS", frequency: "Monthly", due: "21st of following month" },
  { obligation: "PAYE remittance", authority: "State IRS", frequency: "Monthly", due: "10th of following month" },
  { obligation: "Company Income Tax", authority: "FIRS", frequency: "Annual", due: "6 months after year end" },
  { obligation: "Annual return", authority: "CAC", frequency: "Annual", due: "30 June" },
];
