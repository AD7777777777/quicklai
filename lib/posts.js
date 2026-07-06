// Full blog post content. Each post is structured for AEO:
// - Answers a specific question SMB owners ask AI systems
// - Opens with a direct answer (AI engines quote the first clear answer)
// - Includes an FAQ section
// - Ends with a soft CTA to book a call

export const POST_CONTENT = {
  "how-to-improve-cash-flow": {
    title: "How to improve cash flow in a small business",
    date: "2025-01-15",
    description:
      "Cash flow problems are almost always a timing issue. Learn how to diagnose whether yours lives in your payment terms, your cost structure, or both.",
    // The lead answer — kept direct so AI engines can lift it cleanly.
    lead: "Cash flow problems in a small business are almost always a timing issue — money going out faster than it comes in. The fix lives in one of two places: your payment terms (how fast money arrives) or your cost structure (how fast it leaves). Usually both.",
    body: [
      {
        h: "Start with your payment terms",
        p: "If clients pay you in 30, 60, or 90 days but your bills are due sooner, you'll feel squeezed even when you're profitable on paper. Shortening payment terms, invoicing faster, or requiring deposits can close that gap immediately.",
      },
      {
        h: "Then look at your cost structure",
        p: "Fixed costs that don't flex with revenue are the silent killer of cash flow. Map which costs are truly fixed versus variable, and look for anything you're paying for ahead of when it earns.",
      },
      {
        h: "Build a simple cash buffer",
        p: "Even one month of operating expenses in reserve changes how you make decisions. It turns cash-flow panic into cash-flow planning.",
      },
    ],
    faqs: [
      {
        q: "What is the fastest way to improve cash flow?",
        a: "Invoice immediately, shorten payment terms, and require deposits on large jobs. These directly speed up the money coming in without changing your costs.",
      },
      {
        q: "Is cash flow the same as profit?",
        a: "No. Profit is what's left after costs over a period. Cash flow is about timing — you can be profitable and still run out of cash if money arrives later than it leaves.",
      },
    ],
  },

  "how-to-price-your-services": {
    title: "How to price your services as a small business",
    date: "2025-01-18",
    description:
      "Most SMBs underprice out of fear. The fix isn't a formula — it's understanding the value you deliver and the market you serve.",
    lead: "Most small businesses underprice their services out of fear of losing customers. The right price isn't found with a formula — it comes from understanding the value you deliver, the market you serve, and the profit you need to sustain the business.",
    body: [
      {
        h: "Price on value, not just cost",
        p: "Cost-plus pricing ignores what the outcome is worth to the client. If your work saves or earns them far more than you charge, you have room to price up.",
      },
      {
        h: "Know your market position",
        p: "Being the cheapest is rarely a winning strategy for an SMB — it attracts price-sensitive clients and starves your margins. Decide deliberately where you sit.",
      },
      {
        h: "Protect your margin",
        p: "Your price has to cover costs, your time, and a profit that lets the business grow. If it doesn't, you've bought yourself a job, not built a business.",
      },
    ],
    faqs: [
      {
        q: "How do I know if I'm charging too little?",
        a: "If you win almost every quote, you're likely too cheap. A healthy close rate leaves some prospects saying no on price.",
      },
      {
        q: "Should I show prices publicly?",
        a: "It depends on your model. Transparent pricing builds trust for standardized services; custom or high-value work often prices better in conversation.",
      },
    ],
  },

  "when-to-hire-first-employee": {
    title: "When should a small business hire its first employee?",
    date: "2025-01-22",
    description:
      "The right time to hire isn't when you're busy — it's when the numbers and the role both make sense.",
    lead: "The right time to hire your first employee isn't simply when you feel busy — it's when a clearly defined role would generate more value than it costs, and your cash flow can reliably cover the salary. Being overwhelmed is a signal to investigate, not an automatic reason to hire.",
    body: [
      {
        h: "Define the role before the person",
        p: "Write down exactly what this hire will own and what it frees you to do. If you can't define it clearly, you're not ready to hire — you're ready to delegate specific tasks.",
      },
      {
        h: "Run the numbers",
        p: "A hire costs more than salary — taxes, tools, onboarding time. Make sure the revenue they enable, or the higher-value work they free you for, clearly exceeds that fully-loaded cost.",
      },
      {
        h: "Consider the ramp",
        p: "New hires take time to become productive. Hire slightly ahead of the need so you're not training someone during your busiest, most stressed period.",
      },
    ],
    faqs: [
      {
        q: "Should I hire an employee or a contractor first?",
        a: "Contractors are lower-commitment and great for defined, occasional work. Employees make sense when the work is ongoing and core to how you operate.",
      },
      {
        q: "How much cash should I have before hiring?",
        a: "A common guideline is enough reserve to cover the new salary for several months even if revenue dips, so the hire doesn't put the business at risk.",
      },
    ],
  },

  "why-is-my-business-not-growing": {
    title: "Why is my business not growing? 3 common reasons",
    date: "2025-01-25",
    description:
      "Flat growth usually points to one of three things: a positioning problem, a sales process gap, or the wrong customer mix.",
    lead: "When a business stops growing, the cause is usually one of three things: a positioning problem (the market doesn't clearly understand why to choose you), a sales process gap (leads come in but don't convert), or the wrong customer mix (you're serving clients who can't or won't grow with you).",
    body: [
      {
        h: "Positioning problem",
        p: "If prospects can't quickly tell what makes you different, they default to price. Sharpening who you're for and why you're the right choice often unlocks growth without spending a cent more on marketing.",
      },
      {
        h: "Sales process gap",
        p: "Plenty of businesses generate interest but leak it through slow follow-up, unclear offers, or no structured way to move a lead to a yes. Fixing the process often beats generating more leads.",
      },
      {
        h: "Wrong customer mix",
        p: "If your best efforts go toward low-value or hard-to-serve clients, growth stalls. Concentrating on the customers who value you most changes the trajectory.",
      },
    ],
    faqs: [
      {
        q: "How do I know which growth problem I have?",
        a: "Look at your funnel. Few leads points to positioning or marketing. Many leads but few sales points to your sales process. Steady sales but flat revenue points to your customer mix or pricing.",
      },
      {
        q: "Is flat growth always a bad sign?",
        a: "Not necessarily — deliberate consolidation can be healthy. It's a problem when you want to grow and can't identify why you're stuck.",
      },
    ],
  },

  "how-to-get-more-customers": {
    title: "How to get more customers for a small business",
    date: "2025-01-28",
    description:
      "Getting more customers isn't about doing more marketing — it's about being clear on who you serve, where they are, and why they should choose you.",
    lead: "Getting more customers for a small business comes down to three things: knowing exactly who your best customer is, showing up where they already are, and giving them a clear reason to choose you over the alternatives. More marketing spend rarely fixes a problem that's really about clarity.",
    body: [
      {
        h: "Get specific about who you serve",
        p: "Trying to appeal to everyone makes your message forgettable. The narrower and clearer your ideal customer, the easier it is to reach them and the more your marketing resonates.",
      },
      {
        h: "Go where your customers already are",
        p: "You don't need to be on every channel — just the ones your customers actually use. One channel done well beats five done poorly.",
      },
      {
        h: "Make the reason to choose you obvious",
        p: "Customers need a clear, specific reason to pick you. If your offer sounds like everyone else's, price becomes the only thing left to compete on.",
      },
    ],
    faqs: [
      {
        q: "What's the cheapest way to get more customers?",
        a: "Referrals and word of mouth from happy existing customers cost nothing and convert far better than cold marketing. Ask for them deliberately rather than hoping they happen.",
      },
      {
        q: "How long does it take to get more customers?",
        a: "Referrals and improved conversion can work within weeks. Content and organic channels usually take a few months to build momentum but compound over time.",
      },
    ],
  },

  "how-much-to-spend-on-marketing": {
    title: "How much should a small business spend on marketing?",
    date: "2025-02-01",
    description:
      "There's a common benchmark for marketing spend, but the right number for your business depends on your margins, stage, and growth goals.",
    lead: "A common benchmark is that small businesses spend between 5% and 10% of revenue on marketing, with newer businesses often spending more to build awareness. But the right number for you depends on your profit margins, your growth goals, and how well your marketing already converts.",
    body: [
      {
        h: "Start from your margins, not a percentage",
        p: "A business with high margins can afford to spend more to acquire a customer than one running thin. Know what a customer is worth to you over time before deciding what you'll spend to get one.",
      },
      {
        h: "New businesses invest more upfront",
        p: "If nobody knows you exist yet, you'll spend more early to build awareness. Established businesses with word of mouth can often spend a smaller share.",
      },
      {
        h: "Track what each channel returns",
        p: "The percentage matters far less than the return. A channel that reliably brings back more than you put in deserves more budget, regardless of benchmarks.",
      },
    ],
    faqs: [
      {
        q: "Should a new business spend more on marketing?",
        a: "Usually yes. Without existing awareness or word of mouth, new businesses often need to invest more upfront to get established, then scale back as referrals grow.",
      },
      {
        q: "How do I know if my marketing spend is working?",
        a: "Track how much you spend to acquire a customer against what that customer is worth over time. If you earn back more than you spend, it's working.",
      },
    ],
  },

  "how-to-write-a-business-plan": {
    title: "How to write a business plan for a small business",
    date: "2025-02-04",
    description:
      "A useful business plan isn't a long document — it's a clear answer to what you sell, who buys it, and how the numbers work.",
    lead: "A good small business plan doesn't need to be long — it needs to clearly answer four things: what you sell, who buys it, how you'll reach them, and whether the numbers actually work. A focused two-page plan you'll use beats a 40-page document you'll never open again.",
    body: [
      {
        h: "Define the offer and the customer",
        p: "State plainly what you sell and who it's for. If these aren't crisp, nothing else in the plan will be either.",
      },
      {
        h: "Explain how you'll reach them",
        p: "How will customers find out you exist and decide to buy? This is where most plans are vague and most businesses struggle.",
      },
      {
        h: "Make the numbers real",
        p: "Estimate your costs, your pricing, and how many sales you need to break even. This is the part that tells you whether the business works at all.",
      },
    ],
    faqs: [
      {
        q: "How long should a small business plan be?",
        a: "For most small businesses, one to three pages is enough to think clearly. Longer plans are usually only needed when raising money from investors or a bank.",
      },
      {
        q: "Do I need a business plan to start?",
        a: "You don't need a formal document, but you do need clear answers to what you sell, who buys it, and whether the numbers work. Writing them down forces honesty.",
      },
    ],
  },

  "how-to-manage-business-finances": {
    title: "How to manage business finances as a small business owner",
    date: "2025-02-07",
    description:
      "Managing business finances comes down to separating money, knowing your numbers, and planning for tax before it's due.",
    lead: "Managing your business finances well comes down to three habits: keep business and personal money completely separate, review a few key numbers every month, and set tax money aside before you're tempted to spend it. Most financial stress for small business owners traces back to skipping one of these.",
    body: [
      {
        h: "Separate business and personal money",
        p: "A dedicated business account isn't optional. Mixing funds makes it impossible to see how the business is really doing and creates a mess at tax time.",
      },
      {
        h: "Review your numbers monthly",
        p: "You don't need to be an accountant, but you should know your revenue, your costs, and what's left every month. What gets measured gets managed.",
      },
      {
        h: "Set tax aside before you spend",
        p: "Move a percentage of every payment into a separate account for tax the moment it arrives. A tax bill is only a crisis when the money's already gone.",
      },
    ],
    faqs: [
      {
        q: "Do I need an accountant for a small business?",
        a: "Many small businesses benefit from at least occasional professional help for tax and setup, even if they handle day-to-day bookkeeping themselves. It often pays for itself.",
      },
      {
        q: "What financial numbers should I track?",
        a: "At minimum: revenue, expenses, profit, and cash on hand. These four tell you whether the business is healthy and whether you can afford your next move.",
      },
    ],
  },

  "how-to-retain-customers": {
    title: "How to retain customers and increase repeat business",
    date: "2025-02-10",
    description:
      "Keeping a customer is far cheaper than winning a new one. Retention comes from consistency, communication, and making people feel valued.",
    lead: "Keeping an existing customer costs far less than winning a new one, and repeat customers spend more over time. Retention comes down to three things: deliver consistently, stay in touch so you're not forgotten, and make customers feel genuinely valued rather than taken for granted.",
    body: [
      {
        h: "Deliver consistently",
        p: "Nothing loses customers faster than an experience that's great one time and mediocre the next. Reliability builds the trust that keeps people coming back.",
      },
      {
        h: "Stay in touch",
        p: "Customers forget you exist if you go quiet. A simple, genuine follow-up keeps you top of mind for the next time they need what you offer.",
      },
      {
        h: "Make them feel valued",
        p: "Small gestures — remembering a preference, a thank you, early access — cost little and build the loyalty that competitors can't easily buy away.",
      },
    ],
    faqs: [
      {
        q: "Why is customer retention important?",
        a: "Repeat customers cost less to serve, spend more over time, and refer others. A small lift in retention often improves profit more than the same effort spent on new customers.",
      },
      {
        q: "How do I win back a lost customer?",
        a: "Reach out honestly, acknowledge the gap, and give them a specific reason to return. Sometimes simply showing you noticed they left is enough to reopen the door.",
      },
    ],
  },

  "when-to-raise-prices": {
    title: "When should a small business raise its prices?",
    date: "2025-02-13",
    description:
      "If you're consistently busy, winning almost every quote, or absorbing rising costs, it's usually a sign your prices are too low.",
    lead: "You should consider raising your prices when you're consistently at capacity, winning nearly every quote you send, or watching your costs rise while your prices stay flat. Each of these is a signal that the market values your work more than your current price reflects.",
    body: [
      {
        h: "You're always at capacity",
        p: "If you're fully booked and turning work away, demand is outpacing your price. Raising prices lets you earn more from the same hours and often improves your client mix.",
      },
      {
        h: "You win almost every quote",
        p: "A very high win rate usually means you're priced too low. Healthy pricing means some prospects say no — and the ones who say yes value you properly.",
      },
      {
        h: "Your costs have risen",
        p: "If your expenses climbed but your prices didn't, your margin quietly shrank. Passing through cost increases isn't greed — it's staying in business.",
      },
    ],
    faqs: [
      {
        q: "How much should I raise my prices?",
        a: "Modest, regular increases are usually easier for customers to accept than rare large jumps. The right amount depends on your costs, your value, and what your market will bear.",
      },
      {
        q: "Will I lose customers if I raise prices?",
        a: "You may lose a few of the most price-sensitive ones, but you'll usually earn more overall and attract customers who value quality over the lowest price.",
      },
    ],
  },
};
