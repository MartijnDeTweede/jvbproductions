export interface MenuItem {
  name: string;
  linkToVideo: string;
  artist: string;
}

interface Category {
  name: string;
  menuItems: MenuItem[];
}

export interface SideMenuProps {
  categories: Category[];
}
