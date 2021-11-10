const timestampOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
} as Intl.DateTimeFormatOptions;

export function getTimestamp(date: Date = new Date()): string {
    return date.toLocaleDateString("en-US", timestampOptions);
}
