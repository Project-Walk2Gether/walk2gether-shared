import * as yup from "yup";
export declare function objectOf<T extends yup.Schema | yup.Lazy<unknown>>(schema: T): yup.Lazy<yup.MakePartial<{
    [x: string]: T extends yup.ISchema<any, any, any, any> ? T extends infer T_1 ? T_1 extends T ? T_1 extends yup.ISchema<any, any, infer F extends yup.Flags, any> ? Extract<F, "s"> extends never ? T_1["__outputType"] : never : T_1["__outputType"] : never : never : T extends yup.Reference<infer T_2> ? T_2 : unknown;
}> extends infer T_3 ? T_3 extends yup.MakePartial<{
    [x: string]: T extends yup.ISchema<any, any, any, any> ? T extends infer T_4 ? T_4 extends T ? T_4 extends yup.ISchema<any, any, infer F extends yup.Flags, any> ? Extract<F, "s"> extends never ? T_4["__outputType"] : never : T_4["__outputType"] : never : never : T extends yup.Reference<infer T_2> ? T_2 : unknown;
}> ? T_3 extends {} ? { [k in keyof T_3]: T_3[k]; } : T_3 : never : never, yup.AnyObject, any>;
export declare function optionalObjectOf<T extends yup.Schema | yup.Lazy<unknown>>(schema: T): yup.Lazy<(yup.MakePartial<{
    [x: string]: T extends yup.ISchema<any, any, any, any> ? T extends infer T_1 ? T_1 extends T ? T_1 extends yup.ISchema<any, any, infer F extends yup.Flags, any> ? Extract<F, "s"> extends never ? T_1["__outputType"] : never : T_1["__outputType"] : never : never : T extends yup.Reference<infer T_2> ? T_2 : unknown;
}> extends infer T_3 ? T_3 extends yup.MakePartial<{
    [x: string]: T extends yup.ISchema<any, any, any, any> ? T extends infer T_4 ? T_4 extends T ? T_4 extends yup.ISchema<any, any, infer F extends yup.Flags, any> ? Extract<F, "s"> extends never ? T_4["__outputType"] : never : T_4["__outputType"] : never : never : T extends yup.Reference<infer T_2> ? T_2 : unknown;
}> ? T_3 extends {} ? { [k in keyof T_3]: T_3[k]; } : T_3 : never : never) | null | undefined, yup.AnyObject, any>;
