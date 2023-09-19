/**
 *
 * @param F 戻り値がPromiseの関数型(引数は任意)
 *
 * @example Promiseを除いた戻り値の型を取得する
 *
 * type Hoge = {value:string}
 * const hoge:Hoge = {value:"a"};
 * const f1 = async() => hoge;
 *
 * type ResolvedReturnType = ResolveReturnType<typeof f1>;
 *
 * ResolvedReturnType型は{value:string}になる
 */
export type ResolveReturnType<F extends ArrowFunction> = ReturnType<F> extends Promise<infer T> ? T : never;
type ArrowFunction = (...param: any) => Promise<any>;
