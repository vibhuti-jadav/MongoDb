import mongoo from "mongoos"

const TaskSchema = mongoos.Schema({
    task:{
        type:String,
        required:true,
        trim:true,
    },
    description :{
        type:String,
        required:true,
        trim:true,
    }
})

const TaskModel = mongoos.model("Task",TaskSchema);

export default TaskModel;