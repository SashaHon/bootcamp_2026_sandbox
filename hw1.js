// Code for Humans - self explainatory object with all date formats
// DRY = don't repeat yourself (e.g. ISO string)
// Separation of Concerns - separate config strings from class logic
const DATE_FORMATS = {
  ISO: "ISO",
  UTC: "UTC",
  LOCAL: "LOCAL",
};

// Separation of Concerns - define constants for weekend days instead of hardcoding numbers in the method
// Sunday (0) and Saturday (6)
const WEEKEND_DAYS = [0, 6];

// #region utils

// Code for Humans - utility function to check if a date is valid
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// DRY - utility function to validate date for the type safety, can be reused across methods
function validateDate(date) {
  if (!isValidDate(date)) {
    throw new Error("Invalid date input");
  }
}

// KISS, DRY, Separation of Concerns
function formatToTwoDigits(num) {
  return num.toString().padStart(2, "0");
}

// KISS, DRY,  Separation of Concerns
function getFormattedDateDay(date) {
  return formatToTwoDigits(date.getDate());
}

// KISS, DRY,  Separation of Concerns
function getFormattedDateMonth(date) {
  return formatToTwoDigits(date.getMonth() + 1);
}

// KISS, DRY,  Separation of Concerns
function getFormattedDate(date) {
  return {
    day: getFormattedDateDay(date),
    month: getFormattedDateMonth(date),
    year: date.getFullYear(),
  };
}

// Separation of Concerns - this function is only responsible for capitalizing strings, not date logic
function capitalizeString(separator, str) {
  return str
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(separator);
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

    validateDate(date);

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

  //  Code for Humans - rename methods to be more descriptive
  formatDateSlashSeparated() {
    validateDate(this.date);

    const { day, month, year } = getFormattedDate(this.date);
    return `${day}/${month}/${year}`;
  }

  //  Code for Humans - rename methods to be more descriptive
  formatDateDashSeparated() {
    validateDate(this.date);

    const { day, month, year } = getFormattedDate(this.date);
    return `${day} - ${month} - ${year}`;
  }

  capitalizeDateString(str) {
    if (typeof str !== "string") return "";

    return capitalizeString(" ", str);
  }

  isWeekend() {
    validateDate(this.date);
    const day = this.date.getDay();

    return WEEKEND_DAYS.includes(day);
  }
}

// DateProcessor example usage
const dateProcessorExample = new DateProcessor("2026-02-24T10:30:00Z");

console.log("DateProcessor object:", dateProcessorExample);
console.log(
  " formatDateSlashSeparated:",
  dateProcessorExample.formatDateSlashSeparated(),
);
console.log(
  "formatDateDashSeparated:",
  dateProcessorExample.formatDateDashSeparated(),
);
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
