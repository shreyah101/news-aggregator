export const FALLBACK_NEWS = [
  {
    _id: "demo-1",
    title: "James Webb Telescope Discovers Ancient Galaxy Defying Cosmic Physics",
    description: "Astronomers have uncovered an extraordinarily bright primordial galaxy from the dawn of time, offering unprecedented insights into how early cosmic structures formed.",
    url: "https://www.nasa.gov",
    urlToImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop",
    source: { name: "Cosmic Chronicle" },
    publishedAt: new Date().toISOString(),
    category: "Science"
  },
  {
    _id: "demo-2",
    title: "The Quiet Renaissance of Human-Centric Software & Mindful Interfaces",
    description: "A growing movement of designers and engineers are rejecting notification fatigue in favor of calm, storybook interfaces that respect reader focus and mental clarity.",
    url: "https://techcrunch.com",
    urlToImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
    source: { name: "Design Gazette" },
    publishedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    category: "Technology"
  },
  {
    _id: "demo-3",
    title: "Global Clean Energy Investments Surpass Fossil Fuels by Record Margin",
    description: "Renewable energy infrastructure, solar grids, and battery storage breakthroughs are driving unprecedented capital shifts across major global markets.",
    url: "https://bloomberg.com",
    urlToImage: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=1000&auto=format&fit=crop",
    source: { name: "Financial Dispatch" },
    publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    category: "Business"
  },
  {
    _id: "demo-4",
    title: "The Art of Slow Living: Why Morning Walks Boost Cognitive Longevity",
    description: "Neuroscientists find that gentle 20-minute morning walks under natural light dramatically enhance dopamine regulation, deep focus, and circadian resilience.",
    url: "https://healthline.com",
    urlToImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    source: { name: "Wellness Journal" },
    publishedAt: new Date(Date.now() - 3600000 * 9).toISOString(),
    category: "Health"
  },
  {
    _id: "demo-5",
    title: "Underdog Squad Clinches International Relay in Breathtaking Photo Finish",
    description: "In one of the most electric track finals in recent memory, a quartet of rising athletes surged from behind in the final 50 meters to seize victory.",
    url: "https://espn.com",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    source: { name: "Athletic Review" },
    publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    category: "Sports"
  },
  {
    _id: "demo-6",
    title: "Independent Cinema Enjoys Global Resurgence with Handcrafted Film Crafts",
    description: "Audiences flock to celluloid screenings and intimate character-driven storytelling as contemporary filmmakers embrace analog grain and tangible aesthetics.",
    url: "https://variety.com",
    urlToImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
    source: { name: "Arts & Letters" },
    publishedAt: new Date(Date.now() - 3600000 * 15).toISOString(),
    category: "Entertainment"
  }
];
