type Literal = boolean | null | number | string;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
type JsonValue = Literal | JsonObject | JsonArray;

export type { JsonObject, JsonArray, JsonValue };
