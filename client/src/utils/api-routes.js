export const ApiRoutes = {
  inward: {
    create: "/inward/create",
    store: "/inward/store/create",
    security: "/inward/security/create",
  },
  supply: {
    counter: "/supply/counter/entry",
    store: "/supply/store/entry",
    order: "/supply/order/create",
    billing: "/supply/bill/generate",
    billing_update: (values = {}) =>
      `/supply/bill/update?${new URLSearchParams(values)}`,
    security: "/supply/security/entry",
  },
};
