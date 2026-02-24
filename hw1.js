// Code for Humans - self explainatory object with all date formats
// DRY = don't repeat yourself (e.g. ISO string)
// Separation of Concerns - separate config strings from class logic
const DATE_FORMATS = {
  ISO: "ISO",
  UTC: "UTC",
  LOCAL: "LOCAL",
};

// #region utils

// Code for Humans - utility function to check if a date is valid
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// #endregion

class DateProcessor {
  constructor(date) {
    this.date = new Date(date);
  }

  processDateComplex(
    inputDate,
    includeTime = false,
    extraOffset = 0,
    config = {},
  ) {
    let date = new Date(inputDate);

    if (!isValidDate(date)) {
      throw new Error("Invalid date");
    }

    const offset = config.offsetHours || 0;
    const format = config.format || DATE_FORMATS.ISO;

    let resultDate = new Date(
      date.getTime() + (offset + extraOffset) * 60 * 60 * 1000,
    );

    if (includeTime) {
      return `${resultDate.toLocaleDateString()} ${resultDate.toLocaleTimeString()}`;
    }

    if (format === DATE_FORMATS.ISO) {
      return resultDate.toISOString();
    } else if (format === DATE_FORMATS.UTC) {
      return resultDate.toUTCString();
    } else if (format === DATE_FORMATS.LOCAL) {
      return resultDate.toLocaleString();
    } else {
      return resultDate.toString();
    }
  }

  formatDateShort() {
    const d = this.date;
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatDateLong() {
    const d = this.date;
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day} - ${month} - ${year}`;
  }

  capitalizeDateString(str) {
    if (typeof str !== "string") return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  isWeekend() {
    const day = this.date.getDay();
    return day === 0 || day === 6;
  }
}

// DateProcessor example usage
const dateProcessorExample = new DateProcessor("2026-02-24T10:30:00Z");

console.log("DateProcessor object:", dateProcessorExample);
console.log("formatDateShort:", dateProcessorExample.formatDateShort());
console.log("formatDateLong:", dateProcessorExample.formatDateLong());
console.log(
  "capitalizeDateString:",
  dateProcessorExample.capitalizeDateString("monday february"),
);
console.log("isWeekend:", dateProcessorExample.isWeekend());

console.log(
  "processDateComplex (ISO):",
  dateProcessorExample.processDateComplex("2026-02-24T10:30:00Z", false, 0, {
    format: DATE_FORMATS.ISO,
  }),
);
console.log(
  "processDateComplex (UTC):",
  dateProcessorExample.processDateComplex("2026-02-24T10:30:00Z", false, 0, {
    format: DATE_FORMATS.UTC,
  }),
);
console.log(
  "processDateComplex (LOCAL, +2h):",
  dateProcessorExample.processDateComplex("2026-02-24T10:30:00Z", false, 2, {
    format: DATE_FORMATS.LOCAL,
  }),
);
console.log(
  "processDateComplex (includeTime):",
  dateProcessorExample.processDateComplex("2026-02-24T10:30:00Z", true),
);
