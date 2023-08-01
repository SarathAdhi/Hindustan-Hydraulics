export const parseObject = (object = {}, keys = []) => {
	return Object.keys(object)
		.filter((key) => keys.includes(key))
		.reduce((obj, key) => {
			obj[key] = object[key];
			return obj;
		}, {});
};
