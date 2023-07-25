export const ApiRoutes = {
	inward: {
		create: "/inward/create",
		store: {
			create: "/inward/store/create",
			"no-security": "/inward/store/no-security",
			update: (values = {}) =>
				`/inward/store/update?${new URLSearchParams(values)}`,
			delete: (values = {}) =>
				`/inward/store/delete?${new URLSearchParams(values)}`,
		},
		security: "/inward/security/create",
	},
	supply: {
		counter: {
			entry: "/supply/counter/entry",
			update: (values = {}) =>
				`/supply/counter/update?${new URLSearchParams(values)}`,
			delete: (values = {}) =>
				`/supply/counter/delete?${new URLSearchParams(values)}`,
		},

		store: {
			entry: "/supply/store/entry",
			unbillied: "/supply/store/unbilled",
			update: (values = {}) =>
				`/supply/store/update?${new URLSearchParams(values)}`,
			delete: (values = {}) =>
				`/supply/store/delete?${new URLSearchParams(values)}`,
		},

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
