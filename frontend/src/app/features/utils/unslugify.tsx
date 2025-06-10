// Converts slug ("water-rocket") => "Water Rocket"
export const unslugify = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());