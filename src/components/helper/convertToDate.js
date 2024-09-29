function detectAndConvertDate(dateStr) {
  // Regex patterns for common date formats
  const formats = [
    { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: "MM/DD/YYYY" },
    { regex: /^\d{2}-\d{2}-\d{4}$/, format: "MM-DD-YYYY" },
    { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: "DD/MM/YYYY" },
    { regex: /^\d{4}-\d{2}-\d{2}$/, format: "YYYY-MM-DD" },
    { regex: /^\d{2}-\d{2}-\d{4}$/, format: "DD-MM-YYYY" },
    { regex: /^[A-Za-z]+\s\d{1,2},\s\d{4}$/, format: "Month Day, Year" }, // For formats like "October 10, 2023"
  ];

  let formatMatched = null;

  // Detect the format
  for (let format of formats) {
    if (format.regex.test(dateStr)) {
      formatMatched = format.format;
      break;
    }
  }

  if (!formatMatched) {
    return null;
  }

  let parts, day, month, year;

  switch (formatMatched) {
    case "MM/DD/YYYY":
    case "MM-DD-YYYY":
      parts = dateStr.split(/\/|-/);
      month = parseInt(parts[0], 10) - 1; // Months are zero-indexed in JS
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
      break;

    case "DD/MM/YYYY":
    case "DD-MM-YYYY":
      parts = dateStr.split(/\/|-/);
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
      break;

    case "YYYY-MM-DD":
      parts = dateStr.split("-");
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      day = parseInt(parts[2], 10);
      break;

    case "Month Day, Year":
      parts = dateStr.split(/[\s,]+/);
      month = new Date(`${parts[0]} 1`).getMonth(); // Convert month name to index
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
      break;

    default:
      return null;
  }

  return new Date(year, month, day);
}

export default detectAndConvertDate;
