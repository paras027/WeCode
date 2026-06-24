import mongoose from "mongoose"

const submissionModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true
    },
    code:{
        type: String,
        requried:true
    },
    language:{
        type: String,
        requried:true
    },
    status:{
        type: String,
        enum:["Accepted","Failed","Pending","Running"],
        requried:true
    },
    runtime:Number,
    memory:Number,
    verdict:{
        type:String,
        enum:["Wrong Answer","Accepted","Time Limit Exceeded","Runtime Error","Compilation Error"],
        default:null
    },
    error:{
        type:String,
        default:""
    },
    result:[{
        type:mongoose.Schema.Types.Mixed,
        expected:String,
        output:String,
        passed:Boolean
    }]
},{
    timestamps:true
})

const Submission = mongoose.model("Submission",submissionModel)
export default Submission