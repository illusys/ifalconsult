import type { ReactNode } from "react";

export type Column = {
  key: string;
  header: string;
  numeric?: boolean;
  nowrap?: boolean;
};

export function Table({
  columns,
  rows,
  caption,
}: {
  columns: Column[];
  rows: Record<string, ReactNode>[];
  caption?: string;
}) {
  return (
    <div className="table-wrap">
      <table className="table">
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.numeric ? "num" : ""}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={[c.numeric ? "num" : "", c.nowrap ? "nowrap" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
