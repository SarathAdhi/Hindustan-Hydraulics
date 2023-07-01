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
    billing: {
      generate: "/supply/bill/generate",
      update: (values = {}) =>
        `/supply/bill/update?${new URLSearchParams(values)}`,
      delete: (doc_no) => `/supply/bill/delete?doc_no=${doc_no}`,
    },

    security: "/supply/security/entry",
  },
};
