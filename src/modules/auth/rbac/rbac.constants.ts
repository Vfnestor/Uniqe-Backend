export const ROLE_METADATA_KEY =
  "uniqe_roles";

export const PERMISSION_METADATA_KEY =
  "uniqe_permissions";

export const RBAC_ROLES = {
  USER: "user",
  OWNER: "owner",
} as const;

export const RBAC_PERMISSIONS = {
  ADMIN_ACCESS: "admin.access",

  UAPPS_VIEW: "uapps.view",
  UAPPS_MANAGE: "uapps.manage",

  UWEB_VIEW: "uweb.view",
  UWEB_MANAGE: "uweb.manage",

  USHOP_VIEW: "ushop.view",
  USHOP_MANAGE: "ushop.manage",
  USHOP_ORDERS: "ushop.orders",

  USCHOOL_VIEW: "uschool.view",
  USCHOOL_MANAGE: "uschool.manage",

  UCORE_VIEW: "ucore.view",
  UCORE_MANAGE: "ucore.manage",

  LAB_VIEW: "lab.view",
  LAB_MANAGE: "lab.manage",

  USERS_VIEW: "users.view",
  USERS_MANAGE: "users.manage",

  CONTENT_VIEW: "content.view",
  CONTENT_MANAGE: "content.manage",

  MEDIA_VIEW: "media.view",
  MEDIA_MANAGE: "media.manage",

  NOTIFICATIONS_VIEW:
    "notifications.view",
  NOTIFICATIONS_MANAGE:
    "notifications.manage",

  ANALYTICS_VIEW:
    "analytics.view",

  SETTINGS_VIEW:
    "settings.view",
  SETTINGS_MANAGE:
    "settings.manage",
} as const;