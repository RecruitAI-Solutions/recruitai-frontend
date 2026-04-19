import { useNavigation } from "@/lib/useNavigation";
import { NavItem } from "./NavItem";

export const SidebarNav = () => {
  const groups = useNavigation("sidebar");

  return (
    <div className=" p-4 space-y-6">
      {groups.map((group, idx) => (
        <div key={idx}>
          {group.title && (
            <p className="text-xs text-muted mb-2">{group.title}</p>
          )}

          <div className="space-y-1">
            {group.items.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
