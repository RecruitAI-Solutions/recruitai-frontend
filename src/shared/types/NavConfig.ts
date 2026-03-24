export interface NavItem {
  label: string;
  path: string;
  icon: string;
  permissions?: string[]; // Required permissions to see item
}

export interface NavConfig {
  role: "recruiter" | "admin";
  roleDisplay: string;
  accentColor: "green" | "purple";
  navItems: NavItem[];
}
