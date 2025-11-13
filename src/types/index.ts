export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  icon?: string;
}