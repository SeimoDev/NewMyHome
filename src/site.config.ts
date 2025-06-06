export interface SiteSection {
  title: string;
  content: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  sections: SiteSection[];
}

const config: SiteConfig = {
  title: 'My Home',
  description: 'Welcome to my personal site built with Vite + Vue + TypeScript',
  sections: [
    {
      title: 'About Me',
      content: 'A short introduction about yourself. Update this in site.config.ts.'
    },
    {
      title: 'Projects',
      content: 'Highlight some of your projects here. This content comes from the config file.'
    },
    {
      title: 'Contact',
      content: 'You can put your contact information here.'
    }
  ]
};

export default config;
