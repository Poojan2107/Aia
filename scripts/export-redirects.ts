import fs from "fs";
import path from "path";
import { legacyRedirects } from "../src/lib/redirects/legacy";

function generateRedirectCsv() {
  const header = ["Old URL", "New URL", "HTTP Status", "Reason / Destination Description"];
  const rows = legacyRedirects.map((rule) => {
    let reason = "Canonical page migration";
    if (rule.status === 410) {
      reason = "Legacy utility/sample page removed permanently";
    } else if (rule.to.includes("#")) {
      reason = "Anchor section on consolidated parent page";
    } else if (rule.status === 302) {
      reason = "Temporary localized route alias";
    }

    return [
      `"${rule.from}"`,
      `"${rule.to}"`,
      rule.status,
      `"${reason}"`,
    ].join(",");
  });

  const content = [header.join(","), ...rows].join("\n");
  const outDir = path.resolve(process.cwd(), "docs");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, "redirect-map.csv");
  fs.writeFileSync(outPath, content, "utf-8");
  console.log(`Successfully exported ${legacyRedirects.length} redirects to ${outPath}`);
}

generateRedirectCsv();

