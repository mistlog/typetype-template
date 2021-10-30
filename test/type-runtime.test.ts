import fs from "fs";
import path from "path";
import { TypeRuntime } from "@mistlog/type-query";

test("get type info from type runtime", () => {
    const filePath = path.resolve(__dirname, "./assets/type-info.type")
    const input = fs.readFileSync(filePath, "utf-8");

    //
    const runtime = new TypeRuntime(filePath, input);
    const typeInfo = runtime.run();

    //
    expect(typeInfo.tsType).toMatchInlineSnapshot(`
Object {
  "Todo": "{ title: string; description: string; completed: boolean; }",
}
`);

    expect(Object.keys(typeInfo.tsAST["Todo"])).toMatchInlineSnapshot(`
Array [
  "checker",
  "flags",
  "id",
  "objectFlags",
  "symbol",
  "members",
  "properties",
  "callSignatures",
  "constructSignatures",
  "stringIndexInfo",
  "numberIndexInfo",
  "aliasSymbol",
  "aliasTypeArguments",
]
`);

    expect(typeInfo.typeFile).toMatchInlineSnapshot(`
Object {
  "body": Array [
    Object {
      "declarator": Object {
        "initializer": Object {
          "kind": "ObjectTypeLiteral",
          "props": Array [
            Object {
              "kind": "TypeObjectProperty",
              "name": Object {
                "kind": "Identifier",
                "name": "title",
              },
              "optional": false,
              "readonly": false,
              "value": Object {
                "kind": "StringType",
                "value": "string",
              },
            },
            Object {
              "kind": "TypeObjectProperty",
              "name": Object {
                "kind": "Identifier",
                "name": "description",
              },
              "optional": false,
              "readonly": false,
              "value": Object {
                "kind": "StringType",
                "value": "string",
              },
            },
            Object {
              "kind": "TypeObjectProperty",
              "name": Object {
                "kind": "Identifier",
                "name": "completed",
              },
              "optional": false,
              "readonly": false,
              "value": Object {
                "kind": "TypeReference",
                "typeName": Object {
                  "kind": "Identifier",
                  "name": "boolean",
                },
              },
            },
          ],
        },
        "kind": "TypeVariableDeclarator",
        "name": Object {
          "kind": "Identifier",
          "name": "Todo",
        },
      },
      "export": false,
      "kind": "TypeVariableDeclaration",
    },
  ],
  "kind": "TypeFile",
}
`);
})