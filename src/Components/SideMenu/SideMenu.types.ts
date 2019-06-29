interface MenuItem {
  name: string;
  linkToVideo: string;
}

interface Category {
  name: string;
  menuItems: MenuItem[];
}

export interface SideMenuProps {
  categories: Category[];
}
