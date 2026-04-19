import { useNavigation } from "@/lib/useNavigation";
import { NavItem } from "./NavItem";

export const HeaderNav = ({ variant }: { variant: "public" | "dashboard" }) => {
  const layout = variant === "public" ? "header" : "dashboard-header";
  const groups = useNavigation(layout);

  return (
    <nav className="flex gap-4">
      {groups.map((group) =>
        group.items.map((item) => <NavItem key={item.to} item={item} />),
      )}
    </nav>
  );
};
