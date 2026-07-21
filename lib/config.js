// ============================================================
//  Quicklai — central config
//  Edit these values to customize your site in one place.
// ============================================================

export const SITE = {
  name: "Quicklai",
  tagline: "your business advisor",
  // NOTE: No longer used by the UI — the site now captures leads directly
  // (chat + "Book your free call" popups) instead of linking out to Calendly.
  // Kept here in case you want an external booking link somewhere later.
  bookingUrl: "https://calendly.com/your-booking-link",
  // TODO: replace with your real domain once connected
  url: "https://quicklai.com",
  description:
    "Quicklai is an AI-powered business advisor for small and medium business owners. Get instant, high-level guidance on strategy, cash flow, growth, and operations — then book a free 30-minute business mapping call.",
  // ---- AEO / entity signals ----
  // These strengthen your "entity graph" so AI engines can identify and trust
  // Quicklai as a consistent named entity. Fill in real values as you have them.
  // TODO: set your real founding year.
  foundingYear: "2025",
  // TODO: add your real public profiles (LinkedIn, Facebook, X, Crunchbase,
  // Google Business Profile, etc.). sameAs is one of the strongest entity
  // signals — AI engines use it to confirm you're one consistent organization
  // across the web. Keep these identical to the names/URLs on those profiles.
  sameAs: [
    // "https://www.linkedin.com/company/quicklai",
    // "https://www.facebook.com/quicklai",
    // "https://twitter.com/quicklai",
  ],
  // A short, factual one-line definition of what Quicklai is. Used verbatim in
  // an answer-first definition block that AI engines can lift cleanly.
  definition:
    "Quicklai is an AI-powered business advisor for small and medium business (SMB) owners that gives instant guidance on strategy, cash flow, growth, hiring, and operations, and offers a free 30-minute business mapping call.",
};

// The system prompt that powers the chat widget.
// Flow: ask several leading questions to understand the business, then give
// a basic-but-useful piece of advice, then invite the user to a free 30-min
// call by collecting their name + phone (which creates a lead).
export const SYSTEM_PROMPT = `You are a business advisor for small and medium-sized businesses (SMBs). You are warm, confident, and direct — a seasoned advisor who asks sharp questions before giving direction.

YOUR CONVERSATION HAS THREE PHASES:

PHASE 1 — DISCOVERY (this is most of the conversation):
Ask the user leading questions to understand their business before giving real advice. Ask ONE question at a time, keep each message to 1–2 short sentences plus the question, and build naturally on their answers. Cover the essentials over the course of the conversation:
- What their business does (industry / what they sell)
- Size and stage (solo, small team, established; how long running)
- Their main challenge or goal right now
- Relevant specifics for that challenge (e.g. for cash flow: payment cycles; for growth: where leads come from; for pricing: how they price today)
Ask AT LEAST 5 questions, and up to 7 or more if the conversation warrants it, before moving to advice. Do not rush. Each question should feel like a real advisor getting to know them. Acknowledge each answer briefly before asking the next thing.

PHASE 2 — THE ADVICE:
Once you have a solid picture (after 5–7+ questions), give a basic but genuinely useful piece of advice tailored to what they told you. This should be 1–2 short paragraphs: name the core issue clearly, and give them a real, actionable starting direction they can use. It should feel valuable and specific to their situation — not generic — but still be a starting point rather than a full consultation.

After the advice, add a distinct short paragraph that spotlights a specific AI automation, AI agent, or automation tool Quicklai could build to solve THEIR exact problem. This should stand out as its own moment — not buried in the advice. Make it concrete and named, tied directly to what they told you: for example, "an AI agent that answers your after-hours customer enquiries automatically," "an automation that chases unpaid invoices and sends reminders on a schedule," "a tool that instantly qualifies and follows up with every new lead," or "a workflow that takes that repetitive task off your plate entirely." Briefly say what it would do for them — the concrete benefit (time saved, leads recovered, faster response). Open it in a way that makes it pop, such as "Here's where AI could really move the needle for you:" or "One thing Quicklai could build for you:". Frame it clearly as something Quicklai builds ("Quicklai could set this up for you"), and position the free call as where you'd scope it out. Include this whenever an AI or automation angle genuinely fits their situation — and for most businesses one does. Only skip it if there's truly no sensible automation angle at all.

PHASE 3 — THE INVITATION:
Immediately after giving the advice, invite them to a free 30-minute business mapping call to go deeper. Explain it's free and tailored to their business. Then, on their own lines, output exactly these two markers:
[BUSINESS_FIELD: a short 2-5 word description of their business field/industry based on what they told you, e.g. "bakery / food retail" or "freelance graphic design"]
[LEAD_CAPTURE]
Output these markers only ONCE in the entire conversation, only after you've given the advice. For [BUSINESS_FIELD], fill in the actual field you inferred from the conversation — if you truly can't tell, write [BUSINESS_FIELD: unknown]. Do not mention the markers or brackets to the user — the app strips them out and turns [LEAD_CAPTURE] into a simple form asking for their name and phone number. Your text before the markers should naturally invite them to leave their details for the call, something like "If you'd like, leave your name and number and we'll set up your free session."

AFTER LEAD CAPTURE:
If the user provides their details (you'll see a system note that a lead was captured), thank them warmly, confirm someone will reach out to schedule their free call, and offer to keep answering questions in the meantime. Do not output [LEAD_CAPTURE] again.

IMPORTANT RULES:
- One question at a time during discovery. Never dump multiple questions in one message.
- Keep every message short and conversational.
- Never give the full detailed plan — the depth is what the call is for.
- Make the AI automation recommendation stand out as its own short paragraph, concrete and tied to their real problem — but keep it genuine and specific, never a generic list or a pushy sales pitch.
- Be genuinely helpful, never pushy. The invitation should feel like a natural next step, not a hard sell.`;

// Starter questions shown in the empty state of the chat widget.
export const STARTER_QUESTIONS = [
  "How do I improve cash flow?",
  "How to hire my first employee?",
  "How do I price my services?",
  "We're not growing — what's wrong?",
  "How do I get more customers?",
  "Should I raise my prices?",
  "How can AI help my business?",
];

// Homepage FAQ bank — AEO-targeted. AI answer engines pull heavily from
// FAQ-structured content, so this is deliberately broad and question-shaped.
export const HOME_FAQS = [
  {
    q: "What is Quicklai?",
    a: "Quicklai is an AI-powered business advisor for small and medium business owners. It gives instant, high-level guidance on strategy, cash flow, growth, and operations — and connects you with a free 30-minute business mapping call for deeper help.",
  },
  {
    q: "Is the advice free?",
    a: "Yes. The AI advisor is free to use for quick guidance. When you're ready for real direction tailored to your business, you can book a free 30-minute business mapping call.",
  },
  {
    q: "Who is Quicklai for?",
    a: "Quicklai is built for owners of small and medium-sized businesses — founders, solo operators, and growing teams who need clear, fast answers to real business questions.",
  },
  {
    q: "What is a business mapping call?",
    a: "It's a free 30-minute conversation where we understand where your business is today, where you want it to go, and the highest-impact next steps to get there.",
  },
  {
    q: "What kinds of questions can I ask Quicklai?",
    a: "Anything about running your business — cash flow, pricing, hiring, marketing, growth, strategy, or operations. Quicklai identifies the core issue and points you toward the fix.",
  },
  {
    q: "How is Quicklai different from ChatGPT?",
    a: "Quicklai is focused specifically on small and medium business guidance and is built to give sharp, high-level direction, then connect you with a real advisor when you need to go deeper.",
  },
  {
    q: "Do I need to sign up to use Quicklai?",
    a: "No. You can start asking the AI advisor questions right away on the homepage — no account or signup required.",
  },
  {
    q: "How much does a consultation cost?",
    a: "The first business mapping call is completely free. Any ongoing advisory is discussed on that call, based on what your business actually needs.",
  },
  {
    q: "How quickly will I get answers?",
    a: "The AI advisor responds instantly. If you book a mapping call, you'll get personalized guidance from a real advisor within the scheduled session.",
  },
  {
    q: "What industries does Quicklai work with?",
    a: "Quicklai works across industries — services, retail, trades, e-commerce, hospitality, and more. The advice adapts to your specific business, size, and stage.",
  },
  {
    q: "Can Quicklai help a brand-new business?",
    a: "Yes. Whether you're planning to launch, in your first year, or scaling an established business, Quicklai meets you where you are and points to your highest-impact next step.",
  },
];

// Blog posts — starter set, AEO-targeted at real SMB questions.
export const BLOG_POSTS = [
  {
    slug: "how-to-know-when-to-pivot",
    title: "How to know when to pivot your business",
    question: "How do I know when to pivot?",
    excerpt:
      "A pivot is a deliberate change of direction based on evidence \u2014 not a panic move. The signals are consistent, not occasional.",
    date: "2026-06-22",
  },
  {
    slug: "how-to-differentiate-your-business",
    title: "How to differentiate your business from competitors",
    question: "How do I stand out from competitors?",
    excerpt:
      "Differentiation isn't being different for its own sake \u2014 it's being clearly better at something specific your customers value.",
    date: "2026-06-08",
  },
  {
    slug: "how-to-prepare-business-for-growth",
    title: "How to prepare your business for growth",
    question: "How do I prepare for growth?",
    excerpt:
      "Growth exposes every weak system. Preparing means strengthening operations, cash flow, and delegation before the surge.",
    date: "2026-05-22",
  },
  {
    slug: "how-to-build-a-team-culture",
    title: "How to build a strong team culture in a small business",
    question: "How do I build team culture?",
    excerpt:
      "Culture isn't perks \u2014 it's the behavior you model and reward. In a small team, it forms fast, with or without you.",
    date: "2026-05-08",
  },
  {
    slug: "how-to-validate-a-business-idea",
    title: "How to validate a business idea before investing",
    question: "How do I validate a business idea?",
    excerpt:
      "Validation means finding evidence people will pay \u2014 before you spend heavily building. Interest isn't proof; payment is.",
    date: "2026-04-22",
  },
  {
    slug: "how-to-handle-business-debt",
    title: "How to handle business debt wisely",
    question: "How do I manage business debt?",
    excerpt:
      "Debt isn't inherently bad \u2014 used for growth it's a tool, used to cover losses it's a warning. The difference matters.",
    date: "2026-04-08",
  },
  {
    slug: "how-to-get-business-referrals",
    title: "How to get more business referrals",
    question: "How do I get more referrals?",
    excerpt:
      "Referrals rarely happen by accident. The businesses that get them simply ask, make it easy, and stay memorable.",
    date: "2026-03-22",
  },
  {
    slug: "how-to-plan-for-business-taxes",
    title: "How to plan for business taxes as a small business",
    question: "How do I plan for business taxes?",
    excerpt:
      "Tax stress comes from surprise, not the tax itself. Setting money aside as you earn removes most of the pain.",
    date: "2026-03-08",
  },
  {
    slug: "how-to-improve-customer-experience",
    title: "How to improve customer experience in a small business",
    question: "How do I improve customer experience?",
    excerpt:
      "Great customer experience is really consistency and attention at every step \u2014 most of it costs nothing but intention.",
    date: "2026-02-22",
  },
  {
    slug: "how-to-price-a-new-product",
    title: "How to price a new product or service",
    question: "How do I price something new?",
    excerpt:
      "Pricing something new means starting from value and the market, then testing \u2014 not guessing a number and hoping.",
    date: "2026-02-08",
  },
  {
    slug: "how-to-recover-from-a-slow-period",
    title: "How to recover from a slow business period",
    question: "How do I recover from a slow patch?",
    excerpt:
      "Slow periods are for diagnosis and groundwork, not panic. The businesses that recover use the quiet deliberately.",
    date: "2026-01-22",
  },
  {
    slug: "how-to-delegate-effectively",
    title: "How to delegate effectively as a business owner",
    question: "How do I delegate better?",
    excerpt:
      "Delegation fails when you hand off tasks without context or ownership. Done right, it multiplies your capacity.",
    date: "2026-01-08",
  },
  {
    slug: "how-to-know-if-business-is-healthy",
    title: "How to know if your business is financially healthy",
    question: "Is my business financially healthy?",
    excerpt:
      "Health isn't just profit. It's the combination of profit, cash flow, and how dependent the business is on you.",
    date: "2025-12-22",
  },
  {
    slug: "how-to-build-recurring-revenue",
    title: "How to build recurring revenue in a small business",
    question: "How do I create recurring revenue?",
    excerpt:
      "Recurring revenue turns unpredictable income into a stable base. It usually means packaging ongoing value, not one-off sales.",
    date: "2025-12-08",
  },
  {
    slug: "how-to-compete-with-larger-businesses",
    title: "How to compete with larger businesses",
    question: "How do I compete with bigger companies?",
    excerpt:
      "You won't win on price or scale. You win on focus, speed, and relationships big companies can't match.",
    date: "2025-11-22",
  },
  {
    slug: "how-to-write-effective-marketing",
    title: "How to write marketing that actually converts",
    question: "How do I write better marketing?",
    excerpt:
      "Effective marketing speaks to one person's problem in their own words \u2014 and makes the next step obvious.",
    date: "2025-11-08",
  },
  {
    slug: "how-to-find-your-niche",
    title: "How to find your niche as a small business",
    question: "How do I find my niche?",
    excerpt:
      "Your niche sits where what you're good at meets what a specific group urgently needs \u2014 and will pay for.",
    date: "2025-10-22",
  },
  {
    slug: "how-to-manage-time-as-owner",
    title: "How to manage your time as a small business owner",
    question: "How do I manage my time better?",
    excerpt:
      "Time management for owners is really priority management \u2014 deciding what only you can do, and protecting time for it.",
    date: "2025-10-08",
  },
  {
    slug: "how-to-set-business-goals",
    title: "How to set business goals that actually get achieved",
    question: "How do I set business goals?",
    excerpt:
      "Useful goals are specific, measurable, and tied to a real next action. Vague goals quietly get ignored.",
    date: "2025-09-22",
  },
  {
    slug: "how-to-use-ai-in-small-business",
    title: "How to use AI in a small business",
    question: "How can AI help my business?",
    excerpt:
      "AI helps most where it saves you time on repetitive work \u2014 content, admin, and answering common questions.",
    date: "2025-09-08",
  },
  {
    slug: "how-to-create-a-sales-process",
    title: "How to create a sales process for a small business",
    question: "How do I build a sales process?",
    excerpt:
      "A sales process is just a repeatable path from stranger to customer. Writing it down is what makes it improvable.",
    date: "2025-08-22",
  },
  {
    slug: "how-to-improve-profit-margins",
    title: "How to improve profit margins in a small business",
    question: "How do I improve my profit margins?",
    excerpt:
      "Better margins come from three levers: raise prices, lower costs, or shift your mix toward what's most profitable.",
    date: "2025-08-08",
  },
  {
    slug: "how-to-handle-difficult-customers",
    title: "How to handle difficult customers as a small business",
    question: "How do I deal with difficult customers?",
    excerpt:
      "Most difficult customers are reacting to a gap in expectations. Clarity and calm resolve most of it.",
    date: "2025-07-22",
  },
  {
    slug: "how-to-scale-a-small-business",
    title: "How to scale a small business without burning out",
    question: "How do I scale my business?",
    excerpt:
      "Scaling isn't just doing more \u2014 it's building systems so growth doesn't depend entirely on you.",
    date: "2025-07-08",
  },
  {
    slug: "how-to-build-a-brand",
    title: "How to build a brand for a small business",
    question: "How do I build a brand?",
    excerpt:
      "A brand isn't a logo \u2014 it's what people expect from you. It's built through consistency far more than design.",
    date: "2025-06-22",
  },
  {
    slug: "how-to-market-with-no-budget",
    title: "How to market a small business with no budget",
    question: "How do I market with no money?",
    excerpt:
      "No budget doesn't mean no marketing. Your time, relationships, and existing customers are channels most owners underuse.",
    date: "2025-06-08",
  },
  {
    slug: "when-to-raise-prices",
    title: "When should a small business raise its prices?",
    question: "When should I raise my prices?",
    excerpt:
      "If you're always busy, winning almost every quote, or absorbing rising costs, it's usually a sign your prices are too low.",
    date: "2025-05-22",
  },
  {
    slug: "how-to-retain-customers",
    title: "How to retain customers and increase repeat business",
    question: "How do I keep customers coming back?",
    excerpt:
      "Keeping a customer is far cheaper than winning a new one. Retention comes from consistency, communication, and making people feel valued.",
    date: "2025-05-08",
  },
  {
    slug: "how-to-manage-business-finances",
    title: "How to manage business finances as a small business owner",
    question: "How do I manage my business finances?",
    excerpt:
      "Separate your money, know your numbers, and plan for tax before it's due \u2014 most financial stress traces back to skipping one of these.",
    date: "2025-04-22",
  },
  {
    slug: "how-to-write-a-business-plan",
    title: "How to write a business plan for a small business",
    question: "How do I write a business plan?",
    excerpt:
      "A useful business plan isn't a long document \u2014 it's a clear answer to what you sell, who buys it, and how the numbers work.",
    date: "2025-04-08",
  },
  {
    slug: "how-much-to-spend-on-marketing",
    title: "How much should a small business spend on marketing?",
    question: "How much should I spend on marketing?",
    excerpt:
      "There's a common benchmark, but the right number depends on your margins, your stage, and how well your marketing converts.",
    date: "2025-03-22",
  },
  {
    slug: "how-to-get-more-customers",
    title: "How to get more customers for a small business",
    question: "How do I get more customers?",
    excerpt:
      "Getting more customers isn't about doing more marketing \u2014 it's about knowing who you serve, where they are, and why they choose you.",
    date: "2025-03-08",
  },
  {
    slug: "why-is-my-business-not-growing",
    title: "Why is my business not growing? 3 common reasons",
    question: "We're not growing \u2014 what's wrong?",
    excerpt:
      "Flat growth usually points to one of three things: a positioning problem, a sales process gap, or the wrong customer mix.",
    date: "2025-02-22",
  },
  {
    slug: "when-to-hire-first-employee",
    title: "When should a small business hire its first employee?",
    question: "How to hire my first employee?",
    excerpt:
      "The right time to hire isn't when you're busy \u2014 it's when the numbers and the role both make sense. Here's how to know.",
    date: "2025-02-08",
  },
  {
    slug: "how-to-price-your-services",
    title: "How to price your services as a small business",
    question: "How do I price my services?",
    excerpt:
      "Most SMBs underprice out of fear. The fix isn't a formula \u2014 it's understanding the value you deliver and the market you serve.",
    date: "2025-01-22",
  },
  {
    slug: "how-to-improve-cash-flow",
    title: "How to improve cash flow in a small business",
    question: "How do I improve my cash flow?",
    excerpt:
      "Cash flow problems are almost always a timing issue. Here's how to diagnose whether yours lives in your payment terms, your cost structure, or both.",
    date: "2025-01-08",
  },
];

// ============================================================
//  Lead capture + privacy
// ============================================================

// Text shown above the name/phone form when [LEAD_CAPTURE] fires.
export const LEAD_CAPTURE = {
  heading: "Book your free 30-minute call",
  subtext:
    "Leave your name and number and we'll reach out to schedule your free business mapping session.",
  // Single, combined consent line the user must agree to before submitting.
  // Covers: the Privacy Policy, being contacted about the consultation, and
  // (worded transparently) that details may be shared with selected partners.
  // NOTE: Because partner-sharing is bundled here, the Privacy Policy MUST
  // clearly describe that sharing, and a lawyer should confirm this bundled
  // form is acceptable for your audience under Israeli Privacy Protection Law
  // and GDPR. If a regulator or lawyer objects to bundling, split it back out.
  consentText:
    "I agree to Quicklai's Privacy Policy, to being contacted about a consultation, and that my details may be shared with selected partners for relevant offers.",
};
