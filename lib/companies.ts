export const COMPANY_CATEGORIES = [
  "Exchange",
  "Infrastructure",
  "Custody",
  "DeFi",
  "Payments",
  "Analytics",
  "Investor",
] as const

export type CompanyCategory = (typeof COMPANY_CATEGORIES)[number]

export const CATEGORY_COLORS: Record<CompanyCategory, string> = {
  Exchange: "#d32f2f",
  Infrastructure: "#7b1fa2",
  Custody: "#1565c0",
  DeFi: "#00897b",
  Payments: "#fbc02d",
  Analytics: "#e65100",
  Investor: "#2e7d32",
}

export function categoryPillForeground(
  category: CompanyCategory
): "#ffffff" | "#1a1a2e" {
  return category === "Payments" ? "#1a1a2e" : "#ffffff"
}

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
  logoUrl?: string
  hideFromSidebar?: boolean
  mapSprite?: "default" | "boss"
  sourceUrl: string
  sourceLabel: string
}

export const YC_BOSS_SLUG = "coinbase" as const

export function getCompanyMonogram(company: Company) {
  const parts = company.name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return company.name.slice(0, 2).toUpperCase()
}

export function getCompanyDomain(company: Company) {
  return new URL(company.website).hostname
}

export function getCompanyLogoUrl(company: Company) {
  if (company.logoUrl) return company.logoUrl
  const domain = getCompanyDomain(company)
  return "https://www.google.com/s2/favicons?domain=" + domain + "&sz=128"
}

export const COMPANIES: Company[] = [
  {
    slug: "coinbase",
    name: "Coinbase",
    website: "https://www.coinbase.com",
    shortDescription: "America's largest publicly traded crypto exchange, serving 100M+ verified users worldwide.",
    whyItMatters: "Coinbase's 2021 Nasdaq IPO was crypto's mainstream debut. Its Mission Rock HQ signals the industry's permanent roots in SF.",
    category: "Exchange",
    locationLabel: "1090 Dr. Maya Angelou Lane, Mission Rock, SF",
    coordinates: [-122.38969, 37.77414],
    founded: 2012,
    mapSprite: "boss",
    sourceUrl: "https://www.costar.com/article/1157093459/coinbase-signs-major-san-francisco-office-deal",
    sourceLabel: "CoStar – Coinbase Mission Rock lease",
  },
  {
    slug: "kraken",
    name: "Kraken",
    website: "https://www.kraken.com",
    shortDescription: "One of the oldest and most trusted crypto exchanges, built on a never-been-hacked track record.",
    whyItMatters: "A pioneer since 2011, Kraken offers spot, futures, and staking — and is one of the few major exchanges never compromised by hackers.",
    category: "Exchange",
    locationLabel: "100 Pine St Suite 1250, San Francisco",
    coordinates: [-122.3976, 37.79399],
    founded: 2011,
    sourceUrl: "https://craft.co/kraken/locations",
    sourceLabel: "Craft.co – Kraken office locations",
  },
  {
    slug: "ripple",
    name: "Ripple",
    website: "https://www.ripple.com",
    shortDescription: "Blockchain payments network enabling instant, low-cost cross-border settlements via XRP.",
    whyItMatters: "Ripple's XRP Ledger and RLUSD stablecoin are rewriting how banks move money across borders at a fraction of traditional costs.",
    category: "Payments",
    locationLabel: "600 Battery St, San Francisco",
    coordinates: [-122.4017, 37.79901],
    founded: 2012,
    sourceUrl: "https://coinpaper.com/3362/ripple-headquarters-location-pioneering-the-future-of-finance",
    sourceLabel: "CoinPaper – Ripple HQ location",
  },
  {
    slug: "anchorage-digital",
    name: "Anchorage Digital",
    website: "https://www.anchorage.com",
    shortDescription: "The only federally chartered crypto bank in the US, offering institutional custody and staking.",
    whyItMatters: "Anchorage holds an OCC national trust bank charter — the first in crypto history — giving institutions a fully regulated on-ramp to digital assets.",
    category: "Custody",
    locationLabel: "221 Pine St, San Francisco",
    coordinates: [-122.39981, 37.7935],
    founded: 2017,
    sourceUrl: "https://salestools.io/en/report/anchorage-digital-headquarters",
    sourceLabel: "SalesTools – Anchorage Digital HQ",
  },
  {
    slug: "alchemy",
    name: "Alchemy",
    website: "https://www.alchemy.com",
    shortDescription: "The developer platform powering the world's top blockchain apps with APIs, nodes, and tooling.",
    whyItMatters: "Alchemy is the AWS of Web3 — the invisible infrastructure behind apps serving hundreds of millions of users on Ethereum, Polygon, and beyond.",
    category: "Infrastructure",
    locationLabel: "542 Brannan St, San Francisco",
    coordinates: [-122.39674, 37.77626],
    founded: 2017,
    sourceUrl: "https://craft.co/alchemy/locations",
    sourceLabel: "Craft.co – Alchemy office locations",
  },
  {
    slug: "okx-sf",
    name: "OKX (SF Office)",
    website: "https://www.okx.com",
    shortDescription: "Global crypto exchange and Web3 wallet platform serving 50M+ users across 100+ countries.",
    whyItMatters: "OKX is building the super-app for Web3 — combining spot, derivatives, DeFi, and NFTs. The SF office anchors its growing US presence.",
    category: "Exchange",
    locationLabel: "1 Sansome St, San Francisco",
    coordinates: [-122.40074, 37.79141],
    founded: 2017,
    sourceUrl: "https://www.okx.com/en-us/help/privacy-notice-us",
    sourceLabel: "OKX US Privacy Notice – SF office",
  },
  {
    slug: "okx-sj",
    name: "OKX (US HQ)",
    website: "https://www.okx.com",
    shortDescription: "OKX's US regional headquarters, established in 2025 as the exchange expands into the American market.",
    whyItMatters: "OKX chose San Jose as its American beachhead — a signal of crypto's deepening roots in Silicon Valley's financial and tech ecosystem.",
    category: "Exchange",
    locationLabel: "160 W Santa Clara St Suite 1200, San Jose",
    coordinates: [-121.89001, 37.33521],
    founded: 2017,
    sourceUrl: "https://comments.cftc.gov/Handlers/PdfHandler.ashx?id=35636",
    sourceLabel: "CFTC filing – OKX San Jose address",
  },
  {
    slug: "coinlist",
    name: "CoinList",
    website: "https://coinlist.co",
    shortDescription: "The premier platform for compliant token launches and early-stage crypto investing.",
    whyItMatters: "CoinList launched Solana, Filecoin, Algorand, and Celo — the public debut stage for the most impactful Web3 protocols ever built.",
    category: "Exchange",
    locationLabel: "850 Montgomery St Suite 350, San Francisco",
    coordinates: [-122.40459, 37.79747],
    founded: 2017,
    sourceUrl: "https://craft.co/coinlist/locations",
    sourceLabel: "Craft.co – CoinList office locations",
  },
  {
    slug: "protocol-labs",
    name: "Protocol Labs",
    website: "https://protocol.ai",
    shortDescription: "Open-source R&D lab behind IPFS and Filecoin, building foundational internet infrastructure.",
    whyItMatters: "Protocol Labs created IPFS and Filecoin — the decentralized storage layer for Web3 powering NFTs, DAOs, and dApps at scale.",
    category: "Infrastructure",
    locationLabel: "548 Market St, San Francisco",
    coordinates: [-122.39961, 37.79042],
    founded: 2014,
    sourceUrl: "https://craft.co/protocol-labs/locations",
    sourceLabel: "Craft.co – Protocol Labs office locations",
  },
  {
    slug: "chainlink-labs",
    name: "Chainlink Labs",
    website: "https://chainlinklabs.com",
    shortDescription: "Developer of the Chainlink oracle network, connecting smart contracts to real-world data.",
    whyItMatters: "Chainlink oracles secure over $15T in smart contract value. Without reliable data feeds, most DeFi protocols simply could not function.",
    category: "Infrastructure",
    locationLabel: "50 California St Suite 1500, San Francisco",
    coordinates: [-122.3989, 37.79348],
    founded: 2017,
    sourceUrl: "https://www.zoominfo.com/c/chainlink-labs-inc/370521140",
    sourceLabel: "ZoomInfo – Chainlink Labs HQ",
  },
  {
    slug: "solana-labs",
    name: "Solana Labs",
    website: "https://solanalabs.com",
    shortDescription: "Core engineering team behind the Solana blockchain — the fastest L1 with sub-second finality.",
    whyItMatters: "Solana processes 65,000+ TPS and hosts everything from memecoins to institutional payments. Born in SF, now a top-3 global blockchain.",
    category: "Infrastructure",
    locationLabel: "201 Spear St, San Francisco",
    coordinates: [-122.39135, 37.78955],
    founded: 2018,
    sourceUrl: "https://www.dnb.com/business-directory/company-profiles.solana_labs_inc.859cf1f2a74384e9c5d25ff42624584e.html",
    sourceLabel: "D&B – Solana Labs SF address",
  },
  {
    slug: "bitgo",
    name: "BitGo",
    website: "https://www.bitgo.com",
    shortDescription: "Institutional-grade digital asset custody, trading, and prime brokerage platform.",
    whyItMatters: "BitGo secures more on-chain assets than any other qualified custodian — the backbone of institutional crypto settlement globally.",
    category: "Custody",
    locationLabel: "2443 Ash St, Palo Alto",
    coordinates: [-122.147, 37.432],
    founded: 2013,
    sourceUrl: "https://www.waze.com/live-map/directions/us/ca/palo-alto/bitgo,-inc.",
    sourceLabel: "Waze / public maps – BitGo Palo Alto",
  },
  {
    slug: "aptos-labs",
    name: "Aptos Labs",
    website: "https://aptoslabs.com",
    shortDescription: "Builder of the Aptos L1 blockchain, founded by ex-Meta/Diem engineers focused on safety and speed.",
    whyItMatters: "Aptos achieves 160,000 TPS in tests via its Block-STM parallel execution engine — born from Silicon Valley's deepest crypto engineering talent.",
    category: "Infrastructure",
    locationLabel: "745 Emerson St, Palo Alto",
    coordinates: [-122.1656, 37.4483],
    founded: 2021,
    sourceUrl: "https://www.cbinsights.com/company/aptos",
    sourceLabel: "CB Insights – Aptos Labs profile",
  },
  {
    slug: "mysten-labs",
    name: "Mysten Labs",
    website: "https://mystenlabs.com",
    shortDescription: "Creator of the Sui blockchain, designed for high-throughput consumer Web3 apps and gaming.",
    whyItMatters: "Sui's object-centric model enables sub-second finality and seamless UX — positioning it as the blockchain of choice for consumer apps.",
    category: "Infrastructure",
    locationLabel: "379 University Ave, Palo Alto",
    coordinates: [-122.1611, 37.4472],
    founded: 2021,
    sourceUrl: "https://www.highperformr.ai/company/mysten-labs",
    sourceLabel: "Highperformr – Mysten Labs HQ",
  },
  {
    slug: "a16z-crypto",
    name: "a16z Crypto",
    website: "https://a16zcrypto.com",
    shortDescription: "Andreessen Horowitz's dedicated crypto fund — the world's largest Web3 VC with $7.6B+ deployed.",
    whyItMatters: "a16z backed Coinbase, Uniswap, OpenSea, and hundreds more. No single firm has shaped the Web3 ecosystem's trajectory more than a16z.",
    category: "Investor",
    locationLabel: "2865 Sand Hill Rd Suite 101, Menlo Park",
    coordinates: [-122.19936, 37.4152],
    founded: 2009,
    mapSprite: "boss",
    sourceUrl: "https://a16z.com/offices/",
    sourceLabel: "a16z – official office locations",
  },
  {
    slug: "robinhood",
    name: "Robinhood",
    website: "https://robinhood.com",
    shortDescription: "Commission-free investing app and one of the largest retail crypto gateways in the US.",
    whyItMatters: "Robinhood democratized investing for a generation. With 24/7 crypto trading and self-custody wallets, it's now a major Web3 on-ramp.",
    category: "Exchange",
    locationLabel: "85 Willow Rd, Menlo Park",
    coordinates: [-122.18283, 37.45361],
    founded: 2013,
    sourceUrl: "https://craft.co/robinhood/locations",
    sourceLabel: "Craft.co – Robinhood HQ Menlo Park",
  },
  {
    slug: "forte",
    name: "Forte",
    website: "https://www.forte.io",
    shortDescription: "Blockchain gaming platform enabling developers to integrate NFT economies with ease.",
    whyItMatters: "Forte builds the rails for Web3 gaming — letting studios launch in-game economies without wrestling with smart contract complexity.",
    category: "Infrastructure",
    locationLabel: "611 Gateway Blvd Suite 120, South San Francisco",
    coordinates: [-122.40028, 37.65628],
    founded: 2019,
    sourceUrl: "https://craft.co/forte-labs/locations",
    sourceLabel: "Craft.co – Forte Labs office",
  },
]
