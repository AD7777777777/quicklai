// ============================================================
//  Quicklai — central config
//  Edit these values to customize your site in one place.
// ============================================================

export const SITE = {
  name: "Quicklai",
  tagline: "your AI solutions advisor",
  // NOTE: No longer used by the UI — the site now captures leads directly
  // (chat + "Get in touch" popups) instead of linking out to Calendly.
  // Kept here in case you want an external booking link somewhere later.
  bookingUrl: "https://calendly.com/your-booking-link",
  // TODO: replace with your real domain once connected
  url: "https://quicklai.com",
  description:
    "Quicklai is an AI-solutions advisor for small and medium business owners, focused on management and marketing. Get instant, tailored advice plus specific AI tools and automations Quicklai can build for you — then leave your details and we'll get back to you.",
  // ---- AEO / entity signals ----
  // These strengthen your "entity graph" so AI engines can identify and trust
  // Quicklai as a consistent named entity. Fill in real values as you have them.
  // TODO: set your real founding year.
  foundingYear: "2025",
  // TODO (E-E-A-T): set a real named author with a short credential line.
  // A named human author is a stronger authorship signal than an organization.
  // Leave name empty to fall back to attributing content to Quicklai itself.
  author: {
    name: "",
    jobTitle: "AI Solutions Advisor",
    // Optional: a profile URL (LinkedIn etc.) once you have one.
    url: "",
  },
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
    "Quicklai is an AI-solutions advisor for small and medium business (SMB) owners, focused on business management and marketing. It gives instant, tailored advice and recommends specific AI tools and automations Quicklai can build to solve your business's challenges, then gets back to you to take them further.",
};

// The system prompt that powers the chat widget.
// Positioning: an AI-solutions advisor for business management & marketing.
// Flow: ask 5-8 evolving questions, give useful advice, then recommend 1-2
// specific AI tools/solutions Quicklai can build, then capture the lead.
export const SYSTEM_PROMPT = `You are Quicklai — an AI-solutions advisor for small and medium-sized businesses (SMBs), specializing in business management and marketing. You help owners understand their real challenges and show them where custom AI tools and automation can solve those challenges. You are warm, sharp, and genuinely useful — an advisor first, not a salesperson.

Your expertise centers on business management and marketing, but when a user raises another kind of business issue, you address it too — through the lens of how AI and automation could help.

YOUR CONVERSATION HAS THREE PHASES:

PHASE 1 — DISCOVERY (this is most of the conversation):
Ask 5 to 8 questions, ONE at a time, to understand the business and the real problem before giving direction. Crucially, let the questions EVOLVE from the user's answers — each question should build directly on what they just told you, digging deeper into the specific situation they've revealed, rather than running through a fixed checklist. Start broad with what their business does, then follow the thread: whatever they raise as a pain point or goal, ask about that in more and more detail. Keep each message to 1–2 short sentences plus the question. Briefly acknowledge each answer before asking the next. Ask at least 5 questions, and up to 8, before moving on — enough to genuinely understand where AI could help. Over the conversation, make sure you understand: what their business does, its size/stage, their main challenge or goal, and the specific details of that challenge (how it works today, where the friction or lost time is).

RELEVANCE RULE — this is critical: every question after the first must reference something specific the user just said (their business type, the problem they named, a detail they gave) — never a generic, could-apply-to-anyone question. If you catch yourself about to ask something that would make equal sense regardless of their previous answer, stop and ask something that follows directly from it instead. Do not run a fixed script of questions in your head; treat each answer as the only thing that determines your next question.

PHASE 2 — THE ADVICE + AI RECOMMENDATION (the payoff):
First, give genuinely useful business advice tailored to what they told you — 1–2 short paragraphs that name the core issue clearly and give real, actionable direction. This advice carries the substance and comes first; it should feel valuable on its own, even before any AI angle. It must reference at least two concrete specifics from what they told you during discovery (their business type, the exact problem, a number or detail they gave) — a reader should be able to tell this advice was written for their answers, not a template that would fit any business.

Then close strong with the part that makes Quicklai different: recommend 1 or 2 SPECIFIC AI tools or solutions that Quicklai could build to solve the exact issues raised during the chat. This is the highlight of the whole conversation. For each recommendation:
- Name it concretely and tie it directly to a problem they described — e.g. "an AI agent that answers your customers' common questions instantly, day or night," "an automation that follows up with every lead within minutes so none go cold," "an AI marketing assistant that drafts and schedules your social posts in your voice," "a tool that turns your enquiries into booked appointments automatically."
- Say briefly what it would do for them — the concrete benefit (hours saved, leads recovered, faster response, more consistent marketing).
- Frame it clearly as something Quicklai builds for them ("Quicklai could build you...").
Recommend one tool if one clearly fits, two if two distinct problems came up — never more than two, and never a generic list. These must be genuinely tailored to their situation, because specificity is what makes it credible. Open this part in a way that lands, such as "Here's where AI could really move the needle for you:".

PHASE 3 — THE INVITATION:
Immediately after, invite them to leave their details so the Quicklai team can get back to them and take these AI solutions further. Make clear it's free and there's no obligation. Then, on their own lines, output exactly these three markers:
[BUSINESS_FIELD: a short 2-5 word description of their business field/industry based on what they told you, e.g. "bakery / food retail" or "freelance graphic design"]
[RECOMMENDED_TOOLS: a short summary of the 1-2 specific AI tools/solutions you just recommended, e.g. "AI agent for after-hours enquiries; automated lead follow-up" — so the team knows what was discussed]
[LEAD_CAPTURE]
Output these markers only ONCE in the entire conversation, only after you've given the advice and AI recommendation. ALL THREE markers are required every time — never omit [RECOMMENDED_TOOLS]. For [BUSINESS_FIELD], fill in the actual field you inferred — if you truly can't tell, write [BUSINESS_FIELD: unknown]. For [RECOMMENDED_TOOLS], you MUST name the actual AI tool(s) you recommended in this chat (the same ones from your advice), so the team can pick up where the conversation left off — never leave it blank; if you somehow didn't name a specific tool, briefly describe the most fitting AI solution for their situation here. Do not mention the markers or brackets to the user — the app strips them out and turns [LEAD_CAPTURE] into a simple form. Your text before the markers should naturally invite them to leave their details, something like "If you'd like, leave your details and we'll get back to you to take these further."

AFTER LEAD CAPTURE:
If the user provides their details (you'll see a system note that a lead was captured), thank them warmly, confirm someone will get back to them soon using the contact method they chose, and offer to keep answering questions in the meantime. Do not output [LEAD_CAPTURE] again.

IMPORTANT RULES:
- One question at a time during discovery. Never dump multiple questions in one message.
- Let each question evolve from the last answer — follow the thread, don't run a checklist.
- Keep every message short and conversational.
- Give real advice first; the AI tool recommendation is the strong close, not the whole answer.
- Recommend 1–2 specific, tailored AI tools — never more than two, never a generic list, never a pushy pitch. Specificity and genuine relevance are what make it land.
- Never give the full detailed build plan — scoping the AI solutions is what the follow-up conversation is for.
- Be genuinely helpful, never pushy. The invitation should feel like the natural next step.`;

// Starter questions shown in the empty state of the chat widget.
// Blog index FAQ — gives the blog hub its own FAQPage schema, which AI
// answer engines pull from heavily.
export const BLOG_FAQS = [
  {
    q: "What does the Quicklai blog cover?",
    a: "Practical answers on using AI in a small or medium business — customer service, lead follow-up, marketing, content, automation, and day-to-day operations. Every post answers a specific question business owners actually ask.",
  },
  {
    q: "Who are these AI guides written for?",
    a: "Owners and managers of small and medium businesses who want to use AI and automation to manage and market their business — no technical background needed.",
  },
  {
    q: "Can Quicklai build the AI tools described in these posts?",
    a: "Yes. Quicklai builds custom AI solutions, AI agents, and automation tools for small and medium businesses. Leave your details and we'll get back to you to talk through what would fit your business.",
  },
];

export const STARTER_QUESTIONS = [
  "How can AI help my business?",
  "How do I get more customers?",
  "Can AI handle my customer enquiries?",
  "How do I automate repetitive tasks?",
  "How can I improve my marketing?",
  "How do I follow up with leads faster?",
  "What can AI do for a small business?",
];

// Homepage FAQ bank — AEO-targeted. AI answer engines pull heavily from
// FAQ-structured content, so this is deliberately broad and question-shaped.
export const HOME_FAQS = [
  {
    q: "What is Quicklai?",
    a: "Quicklai is an AI-solutions advisor for small and medium business owners, focused on management and marketing. It gives instant, tailored advice, recommends specific AI tools and automations it can build to solve your challenges, and then gets back to you to take them further.",
  },
  {
    q: "Is the advice free?",
    a: "Yes. The AI advisor is free to use for quick, tailored guidance and AI recommendations. When you're ready to build the solutions, leave your details and we'll get back to you — free and with no obligation.",
  },
  {
    q: "Who is Quicklai for?",
    a: "Quicklai is built for owners of small and medium-sized businesses — founders, solo operators, and growing teams who want to use AI and automation to improve how they manage and market their business.",
  },
  {
    q: "What happens after I leave my details?",
    a: "We get back to you using the contact method you chose — call, WhatsApp, or email — to talk through the AI solutions that fit your business and how we could build them. It's free and there's no obligation.",
  },
  {
    q: "What kinds of questions can I ask Quicklai?",
    a: "Anything about managing or marketing your business — customer service, lead follow-up, marketing, automation, operations, or growth. Quicklai identifies the core issue and shows you where AI tools could solve it.",
  },
  {
    q: "How is Quicklai different from ChatGPT?",
    a: "Quicklai is focused specifically on small and medium businesses, and it doesn't just give advice — it recommends specific AI tools and automations it can build for you, then connects you with a real advisor to make them happen.",
  },
  {
    q: "Do I need to sign up to use Quicklai?",
    a: "No. You can start asking the AI advisor questions right away on the homepage — no account or signup required.",
  },
  {
    q: "How much does a consultation cost?",
    a: "The AI advisor and the first conversation are completely free. Any ongoing work is discussed then, based on what your business actually needs.",
  },
  {
    q: "How quickly will I get answers?",
    a: "The AI advisor responds instantly. If you leave your details, a real advisor gets back to you shortly using the contact method you chose.",
  },
  {
    q: "What industries does Quicklai work with?",
    a: "Quicklai works across industries — services, retail, trades, e-commerce, hospitality, and more. The advice and the AI solutions it recommends adapt to your specific business, size, and stage.",
  },
  {
    q: "Can Quicklai help a brand-new business?",
    a: "Yes. Whether you're planning to launch, in your first year, or scaling an established business, Quicklai meets you where you are and shows where AI could give you an early edge.",
  },
];

// Blog posts — starter set, AEO-targeted at real SMB questions.
export const BLOG_POSTS = [
  {
    slug: "ai-know-where-to-start",
    title: "AI for small business: where should you start?",
    question: "Where do I start with AI in my business?",
    excerpt:
      "Start where AI gives the fastest return: usually instant customer response and lead follow-up. Pick one clear, painful problem, solve it with AI, then expand from that proven win.",
    date: "2026-06-22",
  },
  {
    slug: "ai-repurpose-content",
    title: "How can AI repurpose content across channels?",
    question: "Can AI turn one piece of content into many?",
    excerpt:
      "AI can turn a single blog post, video, or idea into social posts, emails, and more — tailored to each channel — so one effort fuels weeks of consistent marketing.",
    date: "2026-06-08",
  },
  {
    slug: "ai-small-business-chatbot",
    title: "Should a small business use an AI chatbot?",
    question: "Should I get an AI chatbot for my business?",
    excerpt:
      "A well-built AI chatbot is worth it when you get repeat questions or miss enquiries — it answers instantly, captures leads around the clock, and frees your time, unlike the clunky bots of the past.",
    date: "2026-05-22",
  },
  {
    slug: "ai-scale-marketing-without-staff",
    title: "How can AI scale marketing without hiring?",
    question: "How can I scale marketing without hiring?",
    excerpt:
      "AI lets you scale marketing output — more content, more channels, more follow-up — without adding staff, by automating the production and consistency a growing marketing effort demands.",
    date: "2026-05-08",
  },
  {
    slug: "ai-improve-conversion-rate",
    title: "How can AI improve my conversion rate?",
    question: "How can AI help me convert more customers?",
    excerpt:
      "AI improves conversion by responding to interest instantly, answering objections in the moment, following up persistently, and personalizing the experience — capturing sales that delay and silence would lose.",
    date: "2026-04-22",
  },
  {
    slug: "ai-automate-invoicing-reminders",
    title: "How can AI automate invoicing and payment reminders?",
    question: "Can AI chase my unpaid invoices?",
    excerpt:
      "AI can send invoices, follow up on overdue payments with polite reminders on a schedule, and flag persistent non-payers — improving cash flow without the awkward manual chasing.",
    date: "2026-04-08",
  },
  {
    slug: "ai-manage-social-media-messages",
    title: "How can AI manage social media messages?",
    question: "Can AI handle my social media messages?",
    excerpt:
      "An AI agent can respond to comments and direct messages across your social channels instantly, answer common questions, and flag anything needing your personal attention.",
    date: "2026-03-22",
  },
  {
    slug: "ai-generate-marketing-ideas",
    title: "How can AI help generate marketing ideas?",
    question: "Can AI help me come up with marketing ideas?",
    excerpt:
      "AI can suggest campaign concepts, content topics, and offers tailored to your business and customers — ending the 'what should I do for marketing?' block that stalls small business owners.",
    date: "2026-03-08",
  },
  {
    slug: "ai-onboard-new-customers",
    title: "How can AI improve customer onboarding?",
    question: "Can AI help onboard new customers?",
    excerpt:
      "AI can guide new customers through getting started, answer their early questions instantly, and send timely next steps automatically — making onboarding smooth without hands-on effort each time.",
    date: "2026-02-22",
  },
  {
    slug: "ai-track-business-performance",
    title: "How can AI help track business performance?",
    question: "Can AI help me track my numbers?",
    excerpt:
      "AI can pull your data together, surface the metrics that matter, and flag trends or problems early — giving you a clear read on your business without manual reporting.",
    date: "2026-02-08",
  },
  {
    slug: "ai-handle-repetitive-emails",
    title: "How can AI handle repetitive emails?",
    question: "Can AI handle my repetitive emails?",
    excerpt:
      "AI can draft replies to common emails, sort your inbox, and send routine responses automatically — clearing the repetitive email that consumes an owner's time every single day.",
    date: "2026-01-22",
  },
  {
    slug: "ai-customer-retention",
    title: "How can AI help retain customers?",
    question: "How can AI help me keep customers?",
    excerpt:
      "AI helps retention by staying in touch consistently, re-engaging customers who go quiet, and personalizing follow-up — keeping you present so customers return instead of drifting away.",
    date: "2026-01-08",
  },
  {
    slug: "ai-write-product-descriptions",
    title: "How can AI write product descriptions?",
    question: "Can AI write my product descriptions?",
    excerpt:
      "AI can write clear, persuasive, on-brand product descriptions at scale — turning a tedious task that owners put off into something done in minutes, consistently across your whole catalog.",
    date: "2025-12-22",
  },
  {
    slug: "ai-streamline-operations",
    title: "How can AI streamline small business operations?",
    question: "How can AI streamline my operations?",
    excerpt:
      "AI streamlines operations by connecting your tools, automating handoffs between steps, and removing the manual coordination that creates delays and errors in day-to-day work.",
    date: "2025-12-08",
  },
  {
    slug: "ai-nurture-leads-automatically",
    title: "How can AI nurture leads over time?",
    question: "How can AI nurture my leads?",
    excerpt:
      "AI can stay in touch with leads who aren't ready yet — sending relevant, well-timed messages automatically until they're ready to buy — so slow-burn prospects don't get forgotten.",
    date: "2025-11-22",
  },
  {
    slug: "ai-answer-faqs-automatically",
    title: "How can AI answer customer FAQs automatically?",
    question: "Can AI answer my customers' common questions?",
    excerpt:
      "An AI assistant trained on your business can answer customer FAQs instantly and accurately, any hour — freeing you from repeating the same answers and ensuring customers never wait.",
    date: "2025-11-08",
  },
  {
    slug: "ai-personalize-customer-marketing",
    title: "How can AI personalize marketing for customers?",
    question: "How can AI personalize my marketing?",
    excerpt:
      "AI can tailor messages, offers, and timing to each customer based on their behavior and history — delivering the relevance that lifts response, at a scale no small team could do manually.",
    date: "2025-10-22",
  },
  {
    slug: "ai-data-entry-automation",
    title: "How can AI eliminate manual data entry?",
    question: "Can AI handle my data entry?",
    excerpt:
      "AI can move information between your tools, extract data from documents and messages, and keep records updated automatically — ending the manual data entry that drains hours and invites errors.",
    date: "2025-10-08",
  },
  {
    slug: "ai-manage-online-reviews",
    title: "How can AI help manage online reviews?",
    question: "How can AI help with my reviews?",
    excerpt:
      "AI can request reviews at the right moment, draft thoughtful responses to every review, and flag issues that need your attention — building your reputation without the manual effort.",
    date: "2025-09-22",
  },
  {
    slug: "ai-marketing-automation-guide",
    title: "What is AI marketing automation for small businesses?",
    question: "What is AI marketing automation?",
    excerpt:
      "AI marketing automation uses AI to run marketing tasks — content, emails, follow-ups, and social posts — automatically and intelligently, keeping marketing consistent without constant manual effort.",
    date: "2025-09-08",
  },
  {
    slug: "ai-small-business-competitive-advantage",
    title: "How can AI give a small business a competitive advantage?",
    question: "Can AI help me compete with bigger companies?",
    excerpt:
      "AI lets a small business punch above its weight — matching larger competitors on response speed, availability, and marketing consistency, while keeping the personal touch big companies lose.",
    date: "2025-08-22",
  },
  {
    slug: "ai-qualify-leads-automatically",
    title: "How can AI qualify leads automatically?",
    question: "How can AI qualify my leads?",
    excerpt:
      "AI can ask every new lead the right questions, score them against your ideal customer, and route the best ones to you — so you spend time only on prospects worth pursuing.",
    date: "2025-08-08",
  },
  {
    slug: "ai-content-creation-small-business",
    title: "How can AI help create content for a small business?",
    question: "How can AI help me create content?",
    excerpt:
      "AI can draft blog posts, social captions, emails, and product descriptions in your voice, and repurpose one piece into many — making consistent content realistic for a small team.",
    date: "2025-07-22",
  },
  {
    slug: "ai-improve-customer-experience",
    title: "How can AI improve customer experience?",
    question: "How can AI improve my customer experience?",
    excerpt:
      "AI improves customer experience through speed and consistency — instant answers, no missed messages, timely follow-up, and reliable service at every hour, without adding staff.",
    date: "2025-07-08",
  },
  {
    slug: "ai-reduce-business-costs",
    title: "How can AI reduce costs for a small business?",
    question: "Can AI help me cut costs?",
    excerpt:
      "AI reduces costs mainly by doing work that would otherwise require hiring or overtime — handling enquiries, follow-up, admin, and marketing at a fraction of the cost of extra staff.",
    date: "2025-06-22",
  },
  {
    slug: "ai-social-media-small-business",
    title: "How can AI help with social media for a small business?",
    question: "How can AI help my social media?",
    excerpt:
      "AI can plan, draft, and schedule social posts in your voice, repurpose content across platforms, and keep you consistently present — without social media taking over your week.",
    date: "2025-06-08",
  },
  {
    slug: "ai-appointment-booking-automation",
    title: "How can AI automate appointment booking?",
    question: "Can AI handle my bookings?",
    excerpt:
      "An AI booking assistant can answer scheduling questions, offer available times, book appointments, and send reminders automatically — filling your calendar without the back-and-forth.",
    date: "2025-05-22",
  },
  {
    slug: "ai-email-marketing-automation",
    title: "How can AI improve email marketing for a small business?",
    question: "How can AI help with email marketing?",
    excerpt:
      "AI can write emails in your voice, personalize them at scale, send follow-up sequences automatically, and pick the right timing — turning email into a consistent channel without the manual work.",
    date: "2025-05-08",
  },
  {
    slug: "ai-lead-generation-small-business",
    title: "How can AI help with lead generation?",
    question: "How can AI get me more leads?",
    excerpt:
      "AI supports lead generation by capturing every enquiry, responding instantly, qualifying prospects, and keeping your marketing consistent — so more of the interest you create turns into real leads.",
    date: "2025-04-22",
  },
  {
    slug: "ai-save-time-business-owner",
    title: "How can AI save time for a business owner?",
    question: "How can AI save me time?",
    excerpt:
      "AI saves owners time by taking over repetitive tasks entirely — customer replies, follow-ups, scheduling, admin, and routine marketing — often recovering several hours every week.",
    date: "2025-04-08",
  },
  {
    slug: "ai-agent-vs-automation",
    title: "AI agents vs automation: what's the difference for a small business?",
    question: "What's the difference between AI agents and automation?",
    excerpt:
      "Automation follows fixed rules to handle repetitive tasks; an AI agent understands context and makes judgment calls, like conversing with a customer. Most businesses benefit from both.",
    date: "2025-03-22",
  },
  {
    slug: "ai-marketing-small-business",
    title: "How can AI improve marketing for a small business?",
    question: "How can I improve my marketing?",
    excerpt:
      "AI improves small business marketing by keeping it consistent — drafting posts and emails in your voice, repurposing content, and freeing you from the feast-or-famine cycle most owners fall into.",
    date: "2025-03-08",
  },
  {
    slug: "ai-follow-up-leads-faster",
    title: "How can AI help me follow up with leads faster?",
    question: "How do I follow up with leads faster?",
    excerpt:
      "AI can respond to every new lead within seconds, qualify them, and keep following up automatically — so leads never go cold while you're busy with other work.",
    date: "2025-02-22",
  },
  {
    slug: "ai-customer-service-small-business",
    title: "How can AI handle customer service for a small business?",
    question: "Can AI handle my customer enquiries?",
    excerpt:
      "An AI customer service agent can answer common questions instantly, day or night, capture enquiries, and pass complex issues to you — so no customer waits and nothing slips through.",
    date: "2025-02-08",
  },
  {
    slug: "ai-tools-automate-small-business",
    title: "What can AI automate in a small business?",
    question: "How do I automate repetitive tasks?",
    excerpt:
      "AI can automate customer replies, lead follow-up, appointment booking, invoice reminders, data entry, and routine marketing — the repetitive work that quietly eats an owner's day.",
    date: "2025-01-22",
  },
  {
    slug: "how-ai-helps-small-business",
    title: "How can AI help a small business?",
    question: "How can AI help my business?",
    excerpt:
      "AI helps small businesses most by removing repetitive work, responding to customers faster, and making marketing more consistent — freeing owners to focus on growth.",
    date: "2025-01-08",
  },
];

// ============================================================
//  Lead capture + privacy
// ============================================================

// Text shown above the lead form when [LEAD_CAPTURE] fires.
export const LEAD_CAPTURE = {
  heading: "How should we get back to you?",
  subtext:
    "Leave your details and pick how you'd like us to get back to you — it's free and there's no obligation.",
  // The contact methods offered (multi-select). Edit labels here to change them.
  contactMethods: ["Call", "WhatsApp", "Email"],
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
