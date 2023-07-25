export const docTypeOptions = [
	"SO No",
	"Proforma No",
	"DC No",
	"UHP DC No",
	"SAM DC No",
].map((label) => ({ label, value: label.toLowerCase().replaceAll(" ", "_") }));

export const routingOptions = [
	"Transport",
	"Travel",
	"Courier",
	"Hand Delivery",
	"Auto",
	"From UHP",
	"From SAM",
].map((label) => ({ label, value: label.toLowerCase().replaceAll(" ", "_") }));

export const counterTypeOptions = [
	"TC Bill No",
	"Proforma No",
	"DC No",
	"TC Note No",
	"LC Bill No",
	"LC Note No",
].map((label) => ({ label, value: label.toLowerCase().replaceAll(" ", "_") }));

export const storeOptions = [
	"SMC",
	"General",
	"Instrumentation",
	"Hydraulics",
	"Hose",
].map((label) => ({ label, value: label.toLowerCase() }));

export const orderStatusOptions = [
	{
		label: "Part Supplied",
		value: "part",
	},
	{
		label: "Fully Supplied",
		value: "full",
	},
];

export const storeStatusOptions = [
	{
		label: "Part Supply",
		value: "part",
	},
	{
		label: "Fully Supply",
		value: "full",
	},
];

export const inwardStoreOptions = [
	"SMC",
	"General",
	"Instrumentation",
	"Hydraulics",
	"Hose",
	"TC Counter",
	"LC Counter",
].map((label) => ({ label, value: label.toLowerCase().replaceAll(" ", "_") }));

export const inwardDocTypeOptions = [
	"Bill No",
	"DC No",
	"Note No",
	"UHP DC No",
	"SAM DC No",
	"Return Invoice No",
	"Service Materials No",
].map((label) => ({ label, value: label.toLowerCase().replaceAll(" ", "_") }));
