// Financial insights / education content for the Insights hub.
// Format modelled on a financial-education resource hub: category-tagged
// article cards with title, excerpt, date, read time, and a full article body.

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  featured?: boolean;
  author: string;
  // Article body as ordered blocks so we can render without a markdown dep.
  body: Block[];
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export const CATEGORIES = [
  "All",
  "Tax",
  "Accounting",
  "Compliance",
  "Business growth",
  "Cash flow",
] as const;

export const INSIGHTS: Insight[] = [
  {
    slug: "vat-filing-guide-nigeria",
    category: "Tax",
    title: "A plain-language guide to VAT filing in Nigeria",
    excerpt:
      "Who has to register, how the 7.5% rate works, what input VAT you can reclaim, and the monthly NRS deadline you cannot afford to miss.",
    date: "2026-08-04",
    readMinutes: 7,
    featured: true,
    author: "IFAL Consult",
    body: [
      { type: "p", text: "Value Added Tax (VAT) is a consumption tax charged on most goods and services in Nigeria. If your business sells taxable supplies, you collect VAT on behalf of the Nigeria Revenue Service (NRS) and remit it every month. Getting this rhythm right is one of the simplest ways to stay out of trouble — and one of the most common places small businesses slip." },
      { type: "h2", text: "Who has to register for VAT" },
      { type: "p", text: "Registration is an obligation, not a choice. A business is expected to register for VAT with the NRS on incorporation or when it begins trading, obtain a Taxpayer Identification Number (TIN), and start charging VAT on its taxable supplies. Certain items — such as basic food, medical and pharmaceutical products, and educational materials — are exempt or zero-rated, so the first step is understanding whether what you sell is taxable at all." },
      { type: "h2", text: "How the rate works" },
      { type: "p", text: "The standard VAT rate is 7.5%. You add it to the price of your taxable supplies (this is your output VAT) and you pay it on the taxable goods and services you buy for the business (this is your input VAT). What you remit to the NRS each month is the difference between the two." },
      { type: "callout", text: "Output VAT you charged, minus input VAT you paid on business purchases, equals the amount you remit to NRS." },
      { type: "h2", text: "The deadline that matters" },
      { type: "p", text: "VAT returns are filed monthly. The return and payment for a given month are due on or before the 21st day of the following month. Late filing and late payment both attract penalties and interest, and they accumulate — so a missed month is not something that quietly goes away." },
      { type: "ul", items: [
        "Keep your sales and purchase records current so the return is a summary, not a scramble.",
        "Separate exempt and zero-rated supplies from standard-rated ones.",
        "Reconcile the VAT you collected against the VAT in your bank account before you file.",
        "File even in a month where you owe nothing — a nil return is still a return.",
      ] },
      { type: "h2", text: "Where a firm helps" },
      { type: "p", text: "Most VAT problems are record-keeping problems in disguise. When your books are reconciled monthly, filing becomes routine. We manage VAT registration, monthly filings, and reconciliation for clients so the deadline is handled before it arrives — and so any refund position is actually claimed rather than lost." },
    ],
  },
  {
    slug: "paye-employer-obligations",
    category: "Compliance",
    title: "PAYE: what every Nigerian employer needs to remit, and when",
    excerpt:
      "Pay-As-You-Earn is deducted from salaries and remitted to your State Internal Revenue Service. Here's how the monthly cycle and annual returns fit together.",
    date: "2026-07-22",
    readMinutes: 6,
    author: "IFAL Consult",
    body: [
      { type: "p", text: "If you employ staff, you are responsible for deducting Pay-As-You-Earn (PAYE) tax from their salaries and remitting it to the relevant State Internal Revenue Service (IRS). PAYE is not your company's tax — it is your employees' personal income tax, which you collect and pass on. Treating it as anything else is where employers get into difficulty." },
      { type: "h2", text: "The monthly cycle" },
      { type: "p", text: "PAYE deducted in a month is remitted to the State IRS by the 10th day of the following month. The amount each employee pays depends on their taxable income after statutory reliefs and allowable deductions such as pension and the Consolidated Relief Allowance." },
      { type: "h2", text: "The annual return" },
      { type: "p", text: "Beyond the monthly remittances, employers file an annual return of all emoluments paid and taxes deducted for the previous year. This reconciles what was withheld across the year with what each employee actually owed, and it is a compliance requirement in its own right." },
      { type: "callout", text: "PAYE is your employees' tax, collected by you. The monthly deadline is the 10th of the following month; the annual employer return closes off the year." },
      { type: "h2", text: "Getting it right" },
      { type: "ul", items: [
        "Register with the State IRS in the state where your employees are based.",
        "Apply the correct reliefs before calculating tax, or you will over-deduct.",
        "Remit by the 10th to avoid penalties and interest.",
        "Keep payslips and remittance evidence — employees and auditors both rely on them.",
      ] },
      { type: "p", text: "We run payroll and PAYE for clients end to end: correct deductions, on-time remittance, payslips, and the annual return — so your team is paid properly and your obligations are met without you having to track them." },
    ],
  },
  {
    slug: "management-accounts-vs-annual-accounts",
    category: "Accounting",
    title: "Management accounts vs annual accounts: why you need both",
    excerpt:
      "Annual financial statements keep you compliant. Monthly management accounts keep you in control. Understanding the difference changes how you run the business.",
    date: "2026-07-09",
    readMinutes: 5,
    author: "IFAL Consult",
    body: [
      { type: "p", text: "Many business owners see accounts as a once-a-year event — something produced for the auditor and the tax authority, then filed away. That view misses the more useful half of accounting: the numbers that help you steer the business month to month." },
      { type: "h2", text: "Annual accounts: the compliance record" },
      { type: "p", text: "Annual financial statements are the formal, year-end record of your financial position. They support your Company Income Tax filing, satisfy statutory audit requirements, and are what banks and investors ask for. They are essential — but by the time they are ready, the year they describe is already over." },
      { type: "h2", text: "Management accounts: the steering wheel" },
      { type: "p", text: "Management accounts are lighter, faster, and produced monthly. They show revenue, costs, margins, and cash while there is still time to act on them. Seeing that a product line's margin has slipped in July means you can respond in August — not discover it the following year." },
      { type: "callout", text: "Annual accounts tell you where you have been. Management accounts tell you where you are going." },
      { type: "h2", text: "What monthly reporting reveals" },
      { type: "ul", items: [
        "Which products or services actually make money once costs are allocated.",
        "Whether your cash position matches your profit — they are not the same thing.",
        "How actual performance compares to your budget, month by month.",
        "Early signs of a problem, while it is still small and fixable.",
      ] },
      { type: "p", text: "We prepare monthly management accounts alongside your statutory reporting, so you have both the compliance record you must have and the operating picture you actually run on." },
    ],
  },
  {
    slug: "company-income-tax-basics",
    category: "Tax",
    title: "Company Income Tax: rates, deadlines, and what counts as an allowable expense",
    excerpt:
      "CIT is charged on your company's profit. Knowing which expenses reduce that profit — and when the return is due — is the difference between planning and paying too much.",
    date: "2026-06-25",
    readMinutes: 8,
    author: "IFAL Consult",
    body: [
      { type: "p", text: "Company Income Tax (CIT) is the tax on your company's profits, administered by the NRS. Unlike VAT and PAYE, which you collect on behalf of others, CIT is your company's own liability — which makes planning for it worthwhile." },
      { type: "h2", text: "How the rate is set" },
      { type: "p", text: "CIT is charged on taxable profit, and the rate that applies depends on your company's turnover band. Smaller companies fall into lower bands, which is one reason accurate turnover records matter beyond just bookkeeping. Your taxable profit is not the same as your accounting profit — it is your profit adjusted for tax purposes." },
      { type: "h2", text: "Allowable and disallowable expenses" },
      { type: "p", text: "An expense reduces your taxable profit only if it is wholly, reasonably, exclusively, and necessarily incurred in earning your income. Some costs in your accounts are added back for tax; some reliefs and capital allowances are deducted. Getting these adjustments right is where a tax practice earns its fee." },
      { type: "callout", text: "Taxable profit is accounting profit adjusted for tax: disallowed expenses added back, capital allowances and reliefs taken off." },
      { type: "h2", text: "The deadline" },
      { type: "p", text: "A company's CIT return is due within six months of the end of its accounting year. Filing on time — and paying on time — avoids penalties and interest, and it keeps your tax clearance current, which you will need for contracts, tenders, and banking." },
      { type: "ul", items: [
        "Keep clean records of every expense and its business purpose.",
        "Track capital expenditure separately — it is relieved through capital allowances, not expensed.",
        "Plan before year-end, not after — most tax planning options close once the year does.",
        "File within six months of your year-end to stay penalty-free.",
      ] },
      { type: "p", text: "We handle CIT computation, filing, and planning for clients, and we represent you with the NRS if a query or audit arises — so your tax position is both correct and defensible." },
    ],
  },
  {
    slug: "cash-flow-management-small-business",
    category: "Cash flow",
    title: "Profitable but broke: how to manage cash flow, not just profit",
    excerpt:
      "A business can be profitable on paper and still run out of money. Here's how to see cash coming before it becomes a crisis.",
    date: "2026-06-11",
    readMinutes: 6,
    author: "IFAL Consult",
    body: [
      { type: "p", text: "One of the hardest lessons in business is that profit and cash are not the same thing. You can be profitable and still be unable to pay a supplier, because the money is tied up in stock, in unpaid invoices, or in tax you have collected but not yet remitted." },
      { type: "h2", text: "Why profit and cash diverge" },
      { type: "p", text: "Profit is recorded when you make a sale; cash arrives when the customer actually pays. The gap between those two moments is where cash-flow problems live. Fast-growing businesses feel this most acutely — growth consumes cash before it returns it." },
      { type: "callout", text: "You pay staff, suppliers, and tax in cash — not in profit. A cash-flow forecast is what tells you whether the cash will be there." },
      { type: "h2", text: "Building a simple forecast" },
      { type: "ul", items: [
        "List the cash you expect to come in, week by week, based on when customers really pay.",
        "List the cash going out: payroll, suppliers, rent, loan repayments, and tax remittances.",
        "Carry the running balance forward so you can see the low points before you reach them.",
        "Update it weekly — a forecast is only useful while it is current.",
      ] },
      { type: "h2", text: "Practical levers" },
      { type: "p", text: "Once you can see the cash cycle, you can manage it: invoice promptly, follow up on receivables, negotiate supplier terms, and set aside VAT and PAYE as you collect them rather than finding them at the deadline. We build cash-flow forecasts and management reporting for clients so the low points are visible weeks ahead, not the morning a payment is due." },
    ],
  },
  {
    slug: "choosing-accounting-software",
    category: "Business growth",
    title: "Choosing accounting software your business won't outgrow",
    excerpt:
      "The right system saves hours every month and makes every filing easier. The wrong one becomes a bottleneck. Here's how to choose — and set it up properly.",
    date: "2026-05-28",
    readMinutes: 7,
    author: "IFAL Consult",
    body: [
      { type: "p", text: "Accounting software should make your finances easier to run, not harder. Yet many businesses either struggle on with spreadsheets long past the point they should, or buy a powerful system and use a fraction of it because it was never set up around how they actually work." },
      { type: "h2", text: "Start with your requirements, not the brand" },
      { type: "p", text: "The best system is the one that fits your business. Before comparing products, be clear on what you need it to do: multi-currency, inventory, payroll, VAT handling, the number of users, and how it will connect to your bank. A short requirements list turns a confusing market into a manageable shortlist." },
      { type: "h2", text: "Setup is where the value is won or lost" },
      { type: "p", text: "Software is only as good as its configuration. A well-designed chart of accounts, correct tax codes, sensible approval workflows, and clean opening balances are what make the reports trustworthy. A rushed setup produces numbers no one believes — and quietly undermines every decision made from them." },
      { type: "callout", text: "A tidy chart of accounts and correct tax codes at setup save you from months of unreliable reports later." },
      { type: "ul", items: [
        "Match the system to your requirements, not to what is most popular.",
        "Design the chart of accounts around the reports you want to see.",
        "Set tax codes so VAT and other taxes are captured correctly from day one.",
        "Migrate opening balances carefully and reconcile them before going live.",
        "Train the people who will use it daily — adoption is what delivers the return.",
      ] },
      { type: "p", text: "We handle selection, installation, chart-of-accounts design, customization, data migration, and go-live support — and we train your team so the system delivers from the first month, not the sixth." },
    ],
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
