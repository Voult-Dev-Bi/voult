// VOULT — Projects data
// Edited via admin.html. Each project renders as a .proj-card on projects.html.
//
// Fields:
//   id          unique slug, lowercase-hyphenated
//   group       "main" | "founders"
//   wide        true = large 2-col hero-style card, false = standard grid card
//   tag         short label shown on the image corner, e.g. "Delivering"
//   location    e.g. "Riyadh, KSA"
//   role        e.g. "BIM Coordination"
//   name        project title
//   description only shown when wide is true
//   images      array of { src, alt } — 1 or 2 images (2 shows swipe arrows + dots)

window.VOULT_PROJECTS = [
  {
    id: "ksp",
    group: "main",
    wide: true,
    tag: "Delivering",
    location: "Riyadh, KSA",
    role: "BIM Coordination",
    name: "King Salman Park",
    description: "One of the largest urban park developments underway in Riyadh. VOULT is part of the coordination team keeping a vast, multi-discipline federated model coherent across an exceptionally complex site.",
    images: [
      { src: "assets/projects/ksp-01.jpg", alt: "Aerial view of King Salman Park's circular green ring set within Riyadh's urban grid" },
      { src: "assets/projects/ksp-02.jpg", alt: "Aerial view of King Salman Park showing central landscaped terrain and water features" }
    ]
  },
  {
    id: "seenlights",
    group: "main",
    wide: false,
    tag: "Commercial",
    location: "Riyadh, KSA",
    role: "Architecture BIM",
    name: "SEEN Lights Office Building",
    description: "",
    images: [
      { src: "assets/projects/seenlights-01.jpg", alt: "SEEN Lights office building exterior, corner view of arched ground floor showroom" },
      { src: "assets/projects/seenlights-02.jpg", alt: "SEEN Lights office building facade render, arched entrances and glazed frontage" }
    ]
  },
  {
    id: "osus",
    group: "main",
    wide: false,
    tag: "High-Rise",
    location: "Riyadh, KSA",
    role: "BIM Coordination",
    name: "OSUS Tower",
    description: "",
    images: [
      { src: "assets/projects/osus-01.jpg", alt: "OSUS Tower aerial night view, timber-toned high-rise with planted terraces along a Riyadh boulevard" },
      { src: "assets/projects/osus-02.jpg", alt: "OSUS Tower close-up facade showing stepped planted balconies against the Riyadh skyline" }
    ]
  },
  {
    id: "murabba",
    group: "main",
    wide: false,
    tag: "Heritage",
    location: "Riyadh, KSA",
    role: "Architecture BIM",
    name: "Murabba Palace Renovation",
    description: "",
    images: [
      { src: "assets/projects/murabba-01.jpg", alt: "Murabba Palace at dusk after renovation, illuminated Najdi-style facade with palm-lined forecourt" },
      { src: "assets/projects/murabba-02.jpg", alt: "Murabba Palace renovated facade, angled view showing lit parapet detailing and glazed entrance wing" }
    ]
  },
  {
    id: "calicut",
    group: "main",
    wide: false,
    tag: "Transit",
    location: "Kerala, India",
    role: "BIM Coordination",
    name: "Calicut Railway Station",
    description: "",
    images: [
      { src: "assets/projects/calicut-01.jpg", alt: "Calicut Railway Station redevelopment, exterior facade with heritage-style architecture" },
      { src: "assets/projects/calicut-02.jpg", alt: "Calicut Railway Station aerial view of platforms and air concourse roof structure" }
    ]
  },
  {
    id: "rsg-fourseasons",
    group: "founders",
    wide: false,
    tag: "Hospitality",
    location: "Saudi Arabia",
    role: "Five-Star Hotel",
    name: "Red Sea Global — Four Seasons",
    description: "",
    images: [
      { src: "assets/projects/rsg-fourseasons-01.jpg", alt: "Red Sea Global Four Seasons resort pavilion with woven timber screen facade among palm trees" },
      { src: "assets/projects/rsg-fourseasons-02.jpg", alt: "Red Sea Global Four Seasons villa entrance with circular timber canopy and landscaped garden path" }
    ]
  },
  {
    id: "diriyah-gate",
    group: "main",
    wide: false,
    tag: "Mixed-Use",
    location: "Riyadh, KSA",
    role: "Architecture BIM",
    name: "Diriyah Gate",
    description: "",
    images: [
      { src: "assets/projects/diriyah-gate-01.jpg", alt: "Diriyah Gate dusk view of Najdi-style mudbrick architecture with a busy market plaza and dining terraces" },
      { src: "assets/projects/diriyah-gate-02.jpg", alt: "Diriyah Gate hotel infinity pool terrace overlooking oasis palm groves at sunset" },
      { src: "assets/projects/diriyah-gate-03.jpg", alt: "Diriyah Gate marketplace courtyard at dusk with traditional rug stalls and lantern lighting" }
    ]
  },
  {
    id: "amaala",
    group: "founders",
    wide: false,
    tag: "Hospitality",
    location: "Saudi Arabia",
    role: "Luxury Villas",
    name: "AMAALA — Six Senses",
    description: "",
    images: [
      { src: "assets/projects/amaala-01.jpg", alt: "AMAALA Six Senses aerial view of coastal villa resort with lagoon and overwater pavilions" },
      { src: "assets/projects/amaala-02.jpg", alt: "AMAALA Six Senses villa cluster with private pools set along a rocky coastline" }
    ]
  }
];
