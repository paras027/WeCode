import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
    input:{
        type:String,
    },
    output:{
        type:String,
    },
    explanation:{
        type:String,
    }
})

const testCaseSchema = new mongoose.Schema({
    input:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    output:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    isHidden:{
        type:Boolean,
        default:true
    }
})

const problemSchema = new mongoose.Schema({
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
     starterCode: {
      type: String,
    },
    constraints:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    },{
    timestamps:true
    }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;