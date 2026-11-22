/**
 * Renders one table two ways: boxed and aligned for the terminal, and as a
 * padded Markdown table that reads well both raw and rendered. The best value
 * in each "lower is better" column is marked (green in the terminal, bold in
 * Markdown).
 *
 * columns: [{ title, get: (row) => value, align?: "left" | "right", best?: (row) => number, compare?: true }]
 * best: lowest wins down the column. compare + row.lowerIsBetter: lowest wins across the row.
 */

const color = process.stdout.isTTY && !process.env.NO_COLOR;
const green = (text) => (color ? `\x1b[32;1m${text}\x1b[0m` : text);
const dim = (text) => (color ? `\x1b[2m${text}\x1b[0m` : text);

function cells(columns, rows) {
  // Across a row: when the row says lowerIsBetter, the lowest number among the
  // columns marked `compare` is the winner (for tables with apps as columns).
  const across = rows.map((row) => {
    const marked = new Set();
    if (!row.lowerIsBetter) return marked;
    const values = columns.map((column) => (column.compare ? Number.parseFloat(column.get(row)) : Number.NaN));
    const finite = values.filter((value) => Number.isFinite(value));
    if (finite.length < 2) return marked;
    const lowest = Math.min(...finite);
    values.forEach((value, c) => value === lowest && marked.add(c));
    return marked;
  });
  const winners = columns.map((column) => {
    if (!column.best || rows.length < 2) return new Set();
    const values = rows.map((row) => column.best(row));
    const finite = values.filter((value) => Number.isFinite(value));
    if (!finite.length) return new Set();
    const lowest = Math.min(...finite);
    return new Set(rows.filter((_, i) => values[i] === lowest));
  });
  return rows.map((row) =>
    columns.map((column, c) => ({
      text: String(column.get(row) ?? ""),
      best: winners[c].has(row) || across[rows.indexOf(row)].has(c),
    })),
  );
}

const pad = (text, width, align) => (align === "right" ? text.padStart(width) : text.padEnd(width));
const alignOf = (column) => column.align ?? "right";

export function terminalTable(columns, rows) {
  const body = cells(columns, rows);
  const widths = columns.map((column, c) => Math.max(column.title.length, ...body.map((row) => row[c].text.length)));
  const line = (left, mid, right) => left + widths.map((w) => "─".repeat(w + 2)).join(mid) + right;
  const out = [line("┌", "┬", "┐")];
  out.push(`│${columns.map((column, c) => ` ${pad(column.title, widths[c], alignOf(column))} `).join("│")}│`);
  out.push(line("├", "┼", "┤"));
  for (const row of body) {
    out.push(
      `│${row
        .map((cell, c) => {
          const text = pad(cell.text, widths[c], alignOf(columns[c]));
          return ` ${cell.best ? green(text) : text} `;
        })
        .join("│")}│`,
    );
  }
  out.push(line("└", "┴", "┘"));
  return out.join("\n");
}

export function markdownTable(columns, rows) {
  const body = cells(columns, rows).map((row) => row.map((cell) => (cell.best ? `**${cell.text}**` : cell.text)));
  const widths = columns.map((column, c) => Math.max(column.title.length, 3, ...body.map((row) => row[c].length)));
  const out = [`| ${columns.map((column, c) => pad(column.title, widths[c], alignOf(column))).join(" | ")} |`];
  out.push(
    `| ${widths.map((w, c) => (alignOf(columns[c]) === "right" ? `${"-".repeat(w - 1)}:` : "-".repeat(w))).join(" | ")} |`,
  );
  for (const row of body) out.push(`| ${row.map((text, c) => pad(text, widths[c], alignOf(columns[c]))).join(" | ")} |`);
  return out.join("\n");
}

/** terms: [[name, meaning]] */
export function terminalGlossary(terms) {
  const width = Math.max(...terms.map(([name]) => name.length));
  return terms.map(([name, meaning]) => `  ${name.padEnd(width)}  ${dim(meaning)}`).join("\n");
}

export function markdownGlossary(terms) {
  return terms.map(([name, meaning]) => `- **${name}**: ${meaning}`).join("\n");
}
