import mongoose, { Document, Schema, Types, Model } from "mongoose";

export interface IExample {
    input: string;
    output: string;
    explanation?: string;
}

export interface ITestCase {
    input: Record<string, unknown> | string | number | boolean | unknown[];
    output: Record<string, unknown> | string | number | boolean | unknown[];
    isHidden: boolean;
}

export interface IStarterCode {
    cpp: string;
    python: string;
    javascript: string;
    java: string;
}

export interface IProblem extends Document {
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";

    tags: string[];

    testCases: Types.DocumentArray<ITestCase>;

    examples: Types.DocumentArray<IExample>;

    starterCode: IStarterCode;

    timeLimit: number;

    memoryLimit: number;

    constraints?: string;

    createdBy: Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}

const exampleSchema = new Schema<IExample>({
    input: String,
    output: String,
    explanation: String
});

const testCaseSchema = new Schema<ITestCase>({
    input: {
        type: Schema.Types.Mixed,
        required: true
    },
    output: {
        type: Schema.Types.Mixed,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: true
    }
});

const problemSchema = new Schema<IProblem>(
{
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        required:true
    },

    tags:[String],

    testCases:[testCaseSchema],

    examples:[exampleSchema],

    starterCode:{
        cpp:{
            type:String,
            default:""
        },
        python:{
            type:String,
            default:""
        },
        javascript:{
            type:String,
            default:""
        },
        java:{
            type:String,
            default:""
        }
    },

    timeLimit:{
        type:Number,
        default:2000
    },

    memoryLimit:{
        type:Number,
        default:256
    },

    constraints:String,

    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
});

const Problem = mongoose.model<IProblem, Model<IProblem>>(
    "Problem",
    problemSchema
);

export default Problem;
