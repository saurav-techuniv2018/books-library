const allRoutes = require('../../src/routes');
const server = require('../../src/server');

describe('server', () => {
  test('should contain correct number of routes', () => {
    // Add one for swagger docs
    const allRoutesCount = allRoutes.length + 1;
    expect(allRoutesCount).toBe(server.table('localhost')[0].table.length);
  });
});
