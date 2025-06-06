export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Movie App",
  description: "Aqui você encontrará seu filme favorito!",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
  },
};
