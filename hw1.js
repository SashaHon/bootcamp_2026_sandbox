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
    if (isNaN(date)) {
      throw new Error("Invalid date");
    }

    const offset = config.offsetHours || 0;
    const format = config.format || "ISO";

    let resultDate = new Date(
      date.getTime() + (offset + extraOffset) * 60 * 60 * 1000,
    );

    if (includeTime) {
      return `${resultDate.toLocaleDateString()} ${resultDate.toLocaleTimeString()}`;
    }

    if (format === "ISO") {
      return resultDate.toISOString();
    } else if (format === "UTC") {
      return resultDate.toUTCString();
    } else if (format === "LOCAL") {
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
