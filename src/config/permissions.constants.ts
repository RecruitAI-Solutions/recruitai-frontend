import data from "@/config/role-permissions.json";

export const PERMISSIONS = data.permissions.reduce(
  (acc, permission) => {
    const key = permission.name.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
    acc[key] = permission.code;
    return acc;
  },
  {} as Record<string, string>,
);
