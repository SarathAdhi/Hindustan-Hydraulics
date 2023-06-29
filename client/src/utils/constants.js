export const docTypeOptions = [
  "SO No",
  "Proforma No",
  "DC No",
  "UHP DC No",
  "SAM DC No",
].map((label) => ({ label, value: label.toLowerCase().replaceAll(" ", "_") }));
