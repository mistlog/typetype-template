import { TypeContext, TypeRuntime } from "@mistlog/type-query";
import { INumberTypeLiteral, transform } from "@mistlog/typetype";
import fs from "fs";
import path from "path";

export function transcribe(path: string, source: string) {
    const runtime = new TypeRuntime(path, source);
    const typeInfo = runtime.run();

    // inject global function/data here:
    const globalContext = {
        sum(a: number, b: number) {
            return {
                kind: "NumberTypeLiteral",
                value: a + b
            } as INumberTypeLiteral
        }
    }

    const context = new TypeContext(typeInfo, globalContext);

    const result = transform(source, { debug: true, context });
    return result;
}

const filePath = path.resolve(__dirname, "./assets/sum.type")
const input = fs.readFileSync(filePath, "utf-8");
const output = transcribe(filePath, input);
console.log(output.code);
fs.writeFileSync(path.resolve(__dirname, "./assets/sum.ts"), output.code, "utf-8");
