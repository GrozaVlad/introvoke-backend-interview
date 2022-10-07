export async function getAllDatabaseMessages(pool:any,userId:string){
    return pool.query('SELECT * FROM messages WHERE user_id = $1',[userId]);
}

export async function getDatabaseMessage(pool:any, userId:string, messageId:string){
    return pool.query('SELECT * FROM messages WHERE message_id = $1 AND user_id = $2',[messageId, userId]);
}

export async function updateDatabaseMessage(pool:any, message:string, userId:string, messageId:string) {
    return pool.query('UPDATE public.messages SET message=$1,created_at=$2 WHERE user_id = $3 AND message_id=$4;',[message,new Date(), userId, messageId])
}

export async function deleteDatabaseMessage(pool:any,messageId:string,userId:any){
    return pool.query('DELETE FROM public.messages WHERE message_id = $1 AND user_id = $2',[messageId, userId])
}

export async function createDatabaseMessage(pool:any, message:string, userId:any) {
    return pool.query('INSERT INTO messages(message, user_id, created_at) VALUES ($1, $2, $3)',[message,userId, new Date()]);
}