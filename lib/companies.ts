export const COMPANY_CATEGORIES = [
  "Core Labs",
  "Consumer AI",
  "Devtools",
  "Infra",
  "Agents",
  "Vertical AI",
] as const

export type CompanyCategory = (typeof COMPANY_CATEGORIES)[number]

export const FEATURED_TIERS = ["core", "hot", "scene"] as const

export type FeaturedTier = (typeof FEATURED_TIERS)[number]

export type Company = {
  slug: string
  name: string
  website: string
  shortDescription: string
  whyItMatters: string
  category: CompanyCategory
  locationLabel: string
  coordinates: [number, number]
  founded: number
  featuredTier: FeaturedTier
  logoUrl?: string
  sourceUrl: string
  sourceLabel: string
}

export function getCompanyMonogram(company: Company) {
  if (company.name === "11x") {
    return "11"
  }

  const parts = company.name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return company.name.slice(0, 2).toUpperCase()
}

export function getCompanyDomain(company: Company) {
  return new URL(company.website).hostname
}

export function getCompanyLogoUrl(company: Company) {
  if (company.logoUrl) {
    return company.logoUrl
  }

  const domain = getCompanyDomain(company)

  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

// Only companies with a public, source-backed SF office location are included below.
// The broader YC discovery list remains out of the map until exact location sources are added.
export const COMPANIES: Company[] = [
  {
    slug: "openai",
    name: "OpenAI",
    website: "https://openai.com",
    shortDescription: "Frontier AI lab behind ChatGPT and a huge share of the current AI wave.",
    whyItMatters: "The obvious anchor on any map of modern SF AI.",
    category: "Core Labs",
    locationLabel: "1455 3rd St, San Francisco",
    coordinates: [-122.3887896, 37.7700459],
    founded: 2015,
    featuredTier: "core",
    sourceUrl:
      "https://cdn.openai.com/pdf/8e938d69-0b67-4994-b9ff-683733ed587e/openai-letter-minister-solomon.pdf",
    sourceLabel: "OpenAI letterhead",
  },
  {
    slug: "anthropic",
    name: "Anthropic",
    website: "https://www.anthropic.com",
    shortDescription: "Claude-maker focused on frontier models, safety, and serious product adoption.",
    whyItMatters: "If OpenAI is one pole of SF AI, Anthropic is the other.",
    category: "Core Labs",
    locationLabel: "548 Market St, San Francisco",
    coordinates: [-122.4001044, 37.7900832],
    founded: 2021,
    featuredTier: "core",
    sourceUrl: "https://craft.co/anthropic/locations",
    sourceLabel: "Craft locations page",
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    website: "https://www.perplexity.ai",
    shortDescription: "Answer engine with a strong consumer feel and nonstop mindshare.",
    whyItMatters: "One of the clearest consumer-facing AI stories to come out of SF.",
    category: "Consumer AI",
    locationLabel: "115 Sansome St, San Francisco",
    coordinates: [-122.4010654, 37.7914533],
    founded: 2022,
    featuredTier: "core",
    sourceUrl: "https://craft.co/perplexity-ai/locations",
    sourceLabel: "Craft locations page",
  },
  {
    slug: "scale-ai",
    name: "Scale AI",
    website: "https://scale.com",
    shortDescription: "Data, evaluation, and enterprise infrastructure for training and deploying AI.",
    whyItMatters: "Too central to the SF AI ecosystem to leave off the map.",
    category: "Infra",
    locationLabel: "650 Townsend St, San Francisco",
    coordinates: [-122.4036566, 37.7709567],
    founded: 2016,
    featuredTier: "core",
    sourceUrl: "https://craft.co/scale-ai/locations",
    sourceLabel: "Craft locations page",
  },
  {
    slug: "baseten",
    name: "Baseten",
    website: "https://www.baseten.com",
    shortDescription: "Inference platform for shipping AI products fast with production-ready performance.",
    whyItMatters: "A strong infra name with builder credibility and a sharp product story.",
    category: "Infra",
    locationLabel: "575 Sutter St, San Francisco",
    coordinates: [-122.4097317, 37.7888158],
    founded: 2019,
    featuredTier: "core",
    sourceUrl: "https://craft.co/baseten/locations",
    sourceLabel: "Craft locations page",
  },
  {
    slug: "harvey",
    name: "Harvey",
    website: "https://www.harvey.ai",
    shortDescription: "Legal AI company building one of the clearest vertical AI success stories.",
    whyItMatters: "Shows how much of SF AI is about real workflows, not just foundation models.",
    category: "Vertical AI",
    locationLabel: "575 Market St, San Francisco",
    coordinates: [-122.4003752, 37.7895414],
    founded: 2022,
    featuredTier: "hot",
    sourceUrl: "https://craft.co/harvey-ai/locations",
    sourceLabel: "Craft locations page",
  },
  {
    slug: "xai",
    name: "xAI",
    website: "https://x.ai",
    shortDescription:
      "Elon Musk's AI lab building Grok, focused on reasoning and truth-seeking.",
    whyItMatters:
      "A major frontier lab operating from the Pioneer Building, OpenAI's former SF headquarters.",
    category: "Core Labs",
    locationLabel: "3180 18th St, San Francisco",
    coordinates: [-122.4146, 37.7622],
    founded: 2023,
    featuredTier: "core",
    sourceUrl:
      "https://traded.co/deals/california/office/lease/3180-18th-street/",
    sourceLabel: "Traded.co lease record",
  },
  {
    slug: "sierra",
    name: "Sierra",
    website: "https://sierra.ai",
    shortDescription:
      "AI agents for enterprise customer experience, co-founded by Bret Taylor and Clay Bavor.",
    whyItMatters:
      "One of the fastest-growing AI agent companies, with the largest office expansion in SF.",
    category: "Agents",
    locationLabel: "235 Second St, San Francisco",
    coordinates: [-122.3972, 37.786],
    founded: 2023,
    featuredTier: "core",
    sourceUrl:
      "https://traded.co/deals/california/office/lease/235-second-street/",
    sourceLabel: "Traded.co lease record",
  },
  {
    slug: "thinking-machines",
    name: "Thinking Machines Lab",
    website: "https://thinkingmachines.ai",
    shortDescription:
      "AI research lab co-founded by former OpenAI CTO Mira Murati, building frontier AI models.",
    whyItMatters:
      "The fastest-rising AI lab in SF, founded by one of the most prominent figures in modern AI.",
    category: "Core Labs",
    locationLabel: "2300 Harrison St, San Francisco",
    coordinates: [-122.4127, 37.7606],
    founded: 2025,
    featuredTier: "core",
    sourceUrl:
      "https://traded.co/deals/california/office/lease/2300-harrison-street/",
    sourceLabel: "Traded.co lease record",
  },
  {
    slug: "together-ai",
    name: "Together AI",
    website: "https://www.together.ai",
    shortDescription:
      "Cloud platform for running and fine-tuning open-source AI models at scale.",
    whyItMatters:
      "Key infrastructure provider for the open-source AI model ecosystem.",
    category: "Infra",
    locationLabel: "251 Rhode Island St, San Francisco",
    coordinates: [-122.4027, 37.7667],
    founded: 2022,
    featuredTier: "hot",
    sourceUrl: "https://www.together.ai/terms-of-service",
    sourceLabel: "Together AI Terms of Service",
  },
  {
    slug: "cursor",
    name: "Cursor",
    website: "https://cursor.com",
    shortDescription:
      "AI-powered code editor built on VS Code with deep LLM integration for code generation.",
    whyItMatters:
      "The dominant AI code editor, one of the fastest-growing developer tools ever built.",
    category: "Devtools",
    locationLabel: "33 New Montgomery St, San Francisco",
    coordinates: [-122.4013, 37.7886],
    founded: 2022,
    featuredTier: "hot",
    sourceUrl: "https://www.cbinsights.com/company/anysphere",
    sourceLabel: "CB Insights company profile",
  },
  {
    slug: "cognition",
    name: "Cognition",
    website: "https://cognition.ai",
    shortDescription:
      "Creator of Devin, an autonomous AI software engineer for end-to-end coding tasks.",
    whyItMatters:
      "Pioneered the autonomous AI coding agent category with Devin.",
    category: "Agents",
    locationLabel: "1875 Mission St, San Francisco",
    coordinates: [-122.4198, 37.7671],
    founded: 2023,
    featuredTier: "hot",
    sourceUrl:
      "https://www.bizprofile.net/ca/san-francisco/cognition-ai-inc",
    sourceLabel: "California business filing via BizProfile",
  },
  {
    slug: "physical-intelligence",
    name: "Physical Intelligence",
    website: "https://physicalintelligence.company",
    shortDescription:
      "AI research lab building general-purpose foundation models for robotics.",
    whyItMatters:
      "Leading the physical AI frontier with foundation models that teach robots real-world tasks.",
    category: "Core Labs",
    locationLabel: "396 Treat Ave, San Francisco",
    coordinates: [-122.4136, 37.7639],
    founded: 2024,
    featuredTier: "hot",
    sourceUrl:
      "https://www.bizprofile.net/ca/san-francisco/physical-intelligence-pi-inc",
    sourceLabel: "California business filing via BizProfile",
  },
  {
    slug: "cohere",
    name: "Cohere",
    website: "https://cohere.com",
    shortDescription:
      "Enterprise AI platform building large language models for business applications.",
    whyItMatters:
      "Major LLM provider with a significant SF presence alongside its Toronto headquarters.",
    category: "Core Labs",
    locationLabel: "755 Sansome St, San Francisco",
    coordinates: [-122.402, 37.7972],
    founded: 2019,
    featuredTier: "hot",
    sourceUrl:
      "https://bandana.com/companies/e362a6da-588c-42f7-bd1a-538c52757bb7/locations/418a9ab4-a428-4a8b-94b6-2d78bbbcaf0f",
    sourceLabel: "Bandana company directory",
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    website: "https://elevenlabs.io",
    shortDescription:
      "AI voice technology platform for realistic speech synthesis and voice cloning.",
    whyItMatters:
      "The leading voice AI platform, powering speech synthesis for thousands of applications.",
    category: "Infra",
    locationLabel: "303 2nd St, San Francisco",
    coordinates: [-122.3958, 37.7849],
    founded: 2022,
    featuredTier: "hot",
    sourceUrl:
      "https://websets.exa.ai/websets/directory/elevenlabs-offices",
    sourceLabel: "Exa directory listing",
  },
  {
    slug: "writer",
    name: "Writer",
    website: "https://writer.com",
    shortDescription:
      "Enterprise AI platform for building and deploying AI agents grounded in company data.",
    whyItMatters:
      "One of few enterprise AI companies building its own foundation models.",
    category: "Vertical AI",
    locationLabel: "111 Maiden Lane, San Francisco",
    coordinates: [-122.4062, 37.788],
    founded: 2020,
    featuredTier: "hot",
    sourceUrl: "https://www.cbinsights.com/company/qordoba",
    sourceLabel: "CB Insights company profile",
  },
  {
    slug: "11x",
    name: "11x",
    website: "https://www.11x.ai",
    shortDescription:
      "AI digital workers that automate sales development and go-to-market tasks.",
    whyItMatters:
      "Leading the AI digital worker category with backing from Benchmark and a16z.",
    category: "Agents",
    locationLabel: "677 Harrison St, San Francisco",
    coordinates: [-122.3969, 37.7829],
    founded: 2022,
    featuredTier: "hot",
    sourceUrl: "https://www.bizprofile.net/ca/san-francisco/11x-ai-inc",
    sourceLabel: "California business filing via BizProfile",
  },
  {
    slug: "abnormal",
    name: "Abnormal Security",
    website: "https://abnormal.ai",
    shortDescription:
      "AI-powered email security platform that detects and prevents business email compromise.",
    whyItMatters:
      "Major AI cybersecurity company using behavioral AI to protect enterprise email.",
    category: "Vertical AI",
    locationLabel: "185 Clara St, San Francisco",
    coordinates: [-122.4017, 37.7799],
    founded: 2018,
    featuredTier: "hot",
    sourceUrl: "https://opengovus.com/sam-entity/C1MPKNUNE761",
    sourceLabel: "SAM.gov entity registration",
  },
  {
    slug: "imbue",
    name: "Imbue",
    website: "https://imbue.com",
    shortDescription:
      "AI research lab building agents that can reason and code, formerly Generally Intelligent.",
    whyItMatters:
      "Billion-dollar AI research lab focused on building agents with robust reasoning.",
    category: "Core Labs",
    locationLabel: "2261 Market St, San Francisco",
    coordinates: [-122.4322, 37.7647],
    founded: 2021,
    featuredTier: "hot",
    sourceUrl:
      "https://files.nitrd.gov/90-fr-9088/Imbue-AI-RFI-2025.pdf",
    sourceLabel: "OSTP public filing",
  },
  {
    slug: "llamaindex",
    name: "LlamaIndex",
    website: "https://www.llamaindex.ai",
    shortDescription:
      "Open-source data framework for connecting custom data sources with LLMs.",
    whyItMatters:
      "The leading RAG framework, core infrastructure for thousands of AI applications.",
    category: "Devtools",
    locationLabel: "325 5th St, San Francisco",
    coordinates: [-122.4031, 37.7801],
    founded: 2022,
    featuredTier: "hot",
    sourceUrl: "https://www.builtinsf.com/company/llamaindex",
    sourceLabel: "Built In SF company profile",
  },
  {
    slug: "langchain",
    name: "LangChain",
    website: "https://www.langchain.com",
    shortDescription:
      "Open-source framework and platform for building LLM-powered applications.",
    whyItMatters:
      "De facto standard framework for LLM application development.",
    category: "Devtools",
    locationLabel: "42 Decatur St, San Francisco",
    coordinates: [-122.4063, 37.7726],
    founded: 2023,
    featuredTier: "scene",
    sourceUrl:
      "https://www.bizprofile.net/ca/san-francisco/langchain-inc",
    sourceLabel: "California business filing via BizProfile",
  },
  {
    slug: "wandb",
    name: "Weights & Biases",
    website: "https://wandb.ai",
    shortDescription:
      "ML developer platform for experiment tracking, model management, and dataset versioning.",
    whyItMatters:
      "Ubiquitous MLOps tool used by OpenAI, NVIDIA, and Meta.",
    category: "Infra",
    locationLabel: "400 Alabama St, San Francisco",
    coordinates: [-122.4124, 37.7641],
    founded: 2017,
    featuredTier: "scene",
    sourceUrl:
      "https://www.bizprofile.net/ca/san-francisco/weights-and-biases-inc",
    sourceLabel: "California business filing via BizProfile",
  },
  {
    slug: "descript",
    name: "Descript",
    website: "https://www.descript.com",
    shortDescription:
      "AI-powered video and podcast editor enabling text-based media editing.",
    whyItMatters:
      "Pioneered AI-native media editing with text-based video and audio workflows.",
    category: "Consumer AI",
    locationLabel: "375 Alabama St, San Francisco",
    coordinates: [-122.4123, 37.7645],
    founded: 2017,
    featuredTier: "scene",
    sourceUrl: "https://www.descript.com/terms",
    sourceLabel: "Descript Terms of Service",
  },
  {
    slug: "lightfield",
    name: "Lightfield",
    website: "https://lightfield.app",
    shortDescription:
      "AI-native CRM built by the team behind Tome, the AI presentation tool.",
    whyItMatters:
      "Notable SF pivot from a viral AI presentation tool to AI-native enterprise CRM.",
    category: "Vertical AI",
    locationLabel: "600 Townsend St, San Francisco",
    coordinates: [-122.4018, 37.7718],
    founded: 2020,
    featuredTier: "scene",
    sourceUrl: "https://www.cbinsights.com/company/tome-1",
    sourceLabel: "CB Insights company profile",
  },
  {
    slug: "browserbase",
    name: "Browserbase",
    website: "https://www.browserbase.com",
    shortDescription:
      "Cloud platform providing headless browser infrastructure for AI agents.",
    whyItMatters:
      "Critical web-browsing infrastructure powering the AI agent ecosystem.",
    category: "Infra",
    locationLabel: "166 Geary St, San Francisco",
    coordinates: [-122.406, 37.7877],
    founded: 2024,
    featuredTier: "scene",
    sourceUrl:
      "https://www.bizprofile.net/ca/san-francisco/browserbase-inc",
    sourceLabel: "California business filing via BizProfile",
  },
  {
    slug: "labelbox",
    name: "Labelbox",
    website: "https://labelbox.com",
    shortDescription:
      "AI data platform for training data labeling, curation, and model evaluation.",
    whyItMatters:
      "Essential data infrastructure for enterprise AI model training and evaluation.",
    category: "Infra",
    locationLabel: "510 Treat Ave, San Francisco",
    coordinates: [-122.4145, 37.762],
    founded: 2018,
    featuredTier: "scene",
    sourceUrl: "https://www.zoominfo.com/c/labelbox-inc/452502399",
    sourceLabel: "ZoomInfo company listing",
  },
  {
    slug: "forethought",
    name: "Forethought",
    website: "https://forethought.ai",
    shortDescription:
      "AI agents platform automating customer support ticket resolution for enterprises.",
    whyItMatters:
      "Early mover in AI-powered customer support automation.",
    category: "Agents",
    locationLabel: "345 California St, San Francisco",
    coordinates: [-122.4005, 37.7931],
    founded: 2017,
    featuredTier: "scene",
    sourceUrl:
      "https://www.cbinsights.com/company/forethought-technologies",
    sourceLabel: "CB Insights company profile",
  },
  {
    slug: "sourcegraph",
    name: "Sourcegraph",
    website: "https://sourcegraph.com",
    shortDescription:
      "Code intelligence platform with AI-powered search and the Amp coding agent.",
    whyItMatters:
      "Established code search platform that built a competitive AI coding agent.",
    category: "Devtools",
    locationLabel: "400 Montgomery St, San Francisco",
    coordinates: [-122.4027, 37.7929],
    founded: 2013,
    featuredTier: "scene",
    sourceUrl:
      "https://github.com/sourcegraph/handbook/blob/main/content/company-info-and-process/about-sourcegraph/general-office-info.md",
    sourceLabel: "Sourcegraph public handbook",
  },
  {
    slug: "wispr",
    name: "Wispr Flow",
    website: "https://wisprflow.ai",
    shortDescription:
      "AI voice dictation app that adapts to each user's writing style.",
    whyItMatters:
      "Fast-growing voice AI product replacing traditional text input with dictation.",
    category: "Consumer AI",
    locationLabel: "444 Townsend St, San Francisco",
    coordinates: [-122.3983, 37.7746],
    founded: 2021,
    featuredTier: "scene",
    sourceUrl: "https://www.cbinsights.com/company/wispr",
    sourceLabel: "CB Insights company profile",
  },
  {
    slug: "bland",
    name: "Bland AI",
    website: "https://www.bland.ai",
    shortDescription:
      "Enterprise platform for AI phone agents handling sales, support, and scheduling.",
    whyItMatters:
      "Automating enterprise phone communications with AI-powered voice agents.",
    category: "Agents",
    locationLabel: "292 Ivy St, San Francisco",
    coordinates: [-122.4229, 37.7774],
    founded: 2023,
    featuredTier: "scene",
    sourceUrl: "https://craft.co/bland-ai/locations",
    sourceLabel: "Craft locations page",
  },
]
