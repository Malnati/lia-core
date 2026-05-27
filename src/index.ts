
export const liaDomains = {
  portal: 'https://aneety.com/',
  api: 'https://api.aneety.com/',
  core: 'https://core.aneety.com/',
  pwa: 'https://pwa.aneety.com/',
  desktop: 'https://desktop.aneety.com/',
  dashboard: 'https://dashboard.aneety.com/'
} as const;

export const defaultApiBaseUrl = liaDomains.api;

export const appRoles = [
  'model_production_operator',
  'prosthesis_production_operator',
  'delivery_operator',
  'clinic_admin',
  'bureau_admin',
  'platform_admin'
] as const;

export type AppRole = (typeof appRoles)[number];

export const appPermissions = [
  'orders:read',
  'orders:write',
  'checkpoints:write',
  'attachments:read',
  'attachments:write',
  'payments:read',
  'payments:write',
  'users:read',
  'users:write',
  'profiles:read',
  'profiles:write',
  'tenants:read',
  'tenants:write',
  'production:read',
  'production:write',
  'dashboard:read'
] as const;

export type AppPermission = (typeof appPermissions)[number];

export const rolePermissions: Record<AppRole, readonly AppPermission[]> = {
  model_production_operator: ['orders:read', 'checkpoints:write', 'attachments:read', 'attachments:write'],
  prosthesis_production_operator: ['orders:read', 'checkpoints:write', 'attachments:read', 'production:read', 'production:write'],
  delivery_operator: ['orders:read', 'checkpoints:write', 'attachments:read'],
  clinic_admin: [
    'orders:read',
    'orders:write',
    'checkpoints:write',
    'attachments:read',
    'attachments:write',
    'payments:read',
    'payments:write',
    'users:read',
    'users:write',
    'profiles:read',
    'dashboard:read'
  ],
  bureau_admin: [
    'orders:read',
    'orders:write',
    'checkpoints:write',
    'attachments:read',
    'attachments:write',
    'payments:read',
    'payments:write',
    'users:read',
    'users:write',
    'profiles:read',
    'profiles:write',
    'production:read',
    'production:write',
    'dashboard:read'
  ],
  platform_admin: appPermissions
};

export function hasPermission(role: AppRole, permission: AppPermission): boolean {
  return rolePermissions[role].includes(permission);
}

export type TenantConfig = {
  slug: string;
  brandName: string;
  operationName: string;
  primaryColor: string;
  darkColor: string;
  locale: string;
};

export const defaultTenant: TenantConfig = {
  slug: 'lia',
  brandName: 'Lia',
  operationName: 'Lia Paraguay',
  primaryColor: '#087f83',
  darkColor: '#0f172a',
  locale: 'pt-BR'
};

export const orderStatuses = [
  'draft',
  'awaiting_payment',
  'paid',
  'pickup_scheduled',
  'picked_up',
  'in_model_production',
  'model_ready',
  'in_prosthesis_production',
  'prosthesis_ready',
  'ready_for_delivery',
  'delivery_scheduled',
  'delivered',
  'cancelled'
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export const checkpointKeys = [
  'pickup_checkin',
  'pickup_checkout',
  'model_production_start',
  'model_production_done',
  'prosthesis_production_start',
  'prosthesis_production_done',
  'delivery_checkin',
  'delivery_checkout'
] as const;

export type CheckpointKey = (typeof checkpointKeys)[number];

export type AccessProfile = {
  id: string;
  tenantId: string;
  name: string;
  roles: AppRole[];
  permissions: AppPermission[];
  active: boolean;
};

export type AppUser = {
  id: string;
  tenantId: string;
  authUserId: string;
  displayName: string;
  email?: string;
  phone?: string;
  profileId: string;
  active: boolean;
};

export type Order = {
  id: string;
  tenantId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  product: string;
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed';
  notes?: string;
  updatedAt: string;
  createdAt: string;
};

export const apiRoutes = {
  health: '/api/health',
  dbHealth: '/api/db/health',
  orders: '/api/orders',
  users: '/api/users',
  accessProfiles: '/api/access-profiles'
} as const;

export type LiaApiClientOptions = {
  baseUrl?: string;
  getAccessToken: () => Promise<string | undefined> | string | undefined;
};

export function createLiaApiClient(options: LiaApiClientOptions) {
  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await options.getAccessToken();
    const headers = new Headers(init.headers);
    headers.set('content-type', headers.get('content-type') ?? 'application/json');
    if (token) headers.set('authorization', `Bearer ${token}`);

    const response = await fetch(new URL(path, options.baseUrl ?? defaultApiBaseUrl), { ...init, headers });
    if (!response.ok) {
      throw new Error(`Lia API ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  }

  return {
    getHealth: () => request<{ status: string }>(apiRoutes.health),
    listOrders: () => request<Order[]>(apiRoutes.orders),
    listUsers: () => request<AppUser[]>(apiRoutes.users),
    listAccessProfiles: () => request<AccessProfile[]>(apiRoutes.accessProfiles)
  };
}
