import { describe, expect, it } from 'vitest';
import {
  apiRoutes,
  appRoles,
  defaultTenant,
  hasPermission,
  orderStatuses,
  rolePermissions
} from '../src/index';

describe('Lia core contract', () => {
  it('exports the approved roles and tenant defaults', () => {
    expect(appRoles).toEqual([
      'model_production_operator',
      'prosthesis_production_operator',
      'delivery_operator',
      'clinic_admin',
      'bureau_admin',
      'platform_admin'
    ]);
    expect(defaultTenant).toMatchObject({ slug: 'lia', brandName: 'Lia' });
  });

  it('maps administrative permissions without granting cross-tenant platform access by default', () => {
    expect(hasPermission('clinic_admin', 'users:write')).toBe(true);
    expect(hasPermission('bureau_admin', 'production:write')).toBe(true);
    expect(hasPermission('delivery_operator', 'users:write')).toBe(false);
    expect(rolePermissions.platform_admin).toContain('tenants:write');
  });

  it('keeps shared API routes and order status values stable', () => {
    expect(apiRoutes.health).toBe('/api/health');
    expect(apiRoutes.dbHealth).toBe('/api/db/health');
    expect(apiRoutes.accessProfiles).toBe('/api/access-profiles');
    expect(orderStatuses).toContain('in_prosthesis_production');
    expect(orderStatuses).toContain('delivered');
  });
});
