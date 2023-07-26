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

		security: {
			create: "/inward/security/create",
			update: (values = {}) => {
				Object.keys(values).forEach((key) =>
					values[key] === undefined ? delete values[key] : {}
				);

				return `/inward/security/update?${new URLSearchParams(values)}`;
			},
			delete: (values = {}) =>
				`/inward/security/delete?${new URLSearchParams(values)}`,
		},
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

		security: {
			entry: "/supply/security/entry",
			update: (values = {}) => {
				Object.keys(values).forEach((key) =>
					values[key] === undefined ? delete values[key] : {}
				);

				return `/supply/security/update?${new URLSearchParams(values)}`;
			},
			delete: (values = {}) =>
				`/supply/security/delete?${new URLSearchParams(values)}`,
		},
	},
};
