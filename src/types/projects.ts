export type GalleryLayout = 'natural' | 'two-column' | 'grid' | 'three' | 'staggered' | 'stacked' | 'square' | 'portrait' | 'specimen';

export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectMedia extends ProjectImage {
  type: 'image' | 'video' | 'slideshow';
  background?: string;
  poster?: string;
  autoplay?: boolean;
  slides?: string[];
}

export interface ProjectSection {
  title: string;
  layout: GalleryLayout | 'logos' | 'palette';
  images?: ProjectMedia[];
  colors?: { name: string; hex: string }[];
}

export interface Project {
  slug: string;
  name: string;
  featured: boolean;
  category: string;
  type?: string;
  year?: string | null;
  tools?: string[];
  headline?: string;
  intro: string[];
  hero: ProjectImage;
  preview?: ProjectImage;
  links: { label: string; href: string }[];
  sections: ProjectSection[];
  pageTitle?: string;
  description?: string;
  relatedSlugs?: string[];
}

export interface ProjectLink {
  href: string;
  title: string;
  category: string;
  image?: ProjectImage;
}
