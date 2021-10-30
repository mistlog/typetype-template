import { transcribe } from "@mistlog/type-query";
import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "./assets/tuple-to-object.type")
const input = fs.readFileSync(filePath, "utf-8");
const output = transcribe(filePath, input);
console.log(output.code);
fs.writeFileSync(path.resolve(__dirname, "./assets/tuple-to-object.ts"), output.code, "utf-8");
