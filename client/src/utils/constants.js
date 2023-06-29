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
  "Branch Office",
].map((label) => ({ label, value: label.toLowerCase().replace(" ", "_") }));

export const counterTypeOptions = [
  "TC Bill No",
  "Proforma No",
  "DC No",
  "TC Note No",
  "LC Bill No",
  "LC Note No",
].map((label) => ({ label, value: label.toLowerCase().replace(" ", "_") }));

export const storeOptions = [
  "SMC",
  "General",
  "Instrumentation",
  "Hydraulics",
  "Hose",
].map((label) => ({ label, value: label.toLowerCase() }));
