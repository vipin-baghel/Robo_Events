// Converts name ("Water Rocket") => "water-rocket"
export const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

