import { transform } from "@mistlog/typetype";
import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "./assets/syntax.type"), "utf-8");
const output = transform(input, { debug: true });
console.log(output.code);
fs.writeFileSync(path.resolve(__dirname, "./assets/syntax.ts"), output.code, "utf-8");
