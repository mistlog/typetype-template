import { TypeContext, TypeQuery, TypeRuntime } from "@mistlog/type-query";
import { ITupleType, IUnionType, transform } from "@mistlog/typetype";
import fs from "fs";
import path from "path";

export function transcribe(path: string, source: string) {
    const runtime = new TypeRuntime(path, source);
    const typeInfo = runtime.run();

    const context = new TypeContext(typeInfo, {}, typeInfo => {
        const query = new TypeQuery(typeInfo);
        query.install(unionToTuple);
        return query
    });

    const result = transform(source, { debug: true, context });
    return result;
}

export function unionToTuple(ast: IUnionType): ITupleType {
    return {
        kind: "TupleType",
        items: ast.types
    }
}

const filePath = path.resolve(__dirname, "./assets/union-to-tuple.type")
const input = fs.readFileSync(filePath, "utf-8");
const output = transcribe(filePath, input);
console.log(output.code);
fs.writeFileSync(path.resolve(__dirname, "./assets/union-to-tuple.ts"), output.code, "utf-8");