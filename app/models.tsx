// import { createClient } from '@supabase/supabase-js'
//
//
//
//
// const Tasks : Task[] = []
//
// // Init database
// const supabase = createClient(process.env.DATABASE_URL!, process.env.DATABASE_KEY!)
//
// function initTasks() {
//
//
// }
//
// async function addTask(task : Task) {
//     Tasks.push(task)
//
//     let { data: Tasks, error } = await supabase
//         .from('Tasks')
//         .select('id')
//
// }
//
// function updateTask(task : Task) {
//     Tasks[Tasks.indexOf(task)] = task
// }
//
// function removeTask(task : Task){
//     Tasks.splice(Tasks.indexOf(task), 1)
// }
//
//
// export default Tasks