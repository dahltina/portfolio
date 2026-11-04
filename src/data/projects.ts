import content from './projects.json';
import type { Project, ProjectLink } from '../types/projects';

export const projects = content as Project[];
export const featuredProjects = projects.filter(project => project.featured);

export function getProject(slug: string): Project {
  const project = projects.find(project => project.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

export function projectLink(project: Project): ProjectLink {
  return {
    href: `${project.slug}.html`,
    title: project.name,
    category: project.category.replace('Frontend development', 'Frontend'),
    image: project.preview,
  };
}

export function relatedProjects(project: Project): ProjectLink[] {
  const related = project.relatedSlugs
    ? project.relatedSlugs.map(getProject)
    : featuredProjects.filter(item => item.slug !== project.slug);
  return related.map(projectLink);
}
