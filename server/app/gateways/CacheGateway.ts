export async function setRedisCollectionData(redisClient,collectionKey: string, redisTTL: number, index: string, payload: any) {
    try {
        await redisClient.setex(`${collectionKey}:${index}`, redisTTL, JSON.stringify(payload));
    } catch (error) {
        console.log("Cache insert went wrong")
    }
}

export async function getRedisCollectionData(redisClient,collectionKey: string, index: string) {
    try {
       const result = await redisClient.get(`${collectionKey}:${index}`);
       if(!result) {
           return "";
       } else {
           return JSON.parse(result);
       }
    } catch (error) {
        console.log("Cache retrieve went wrong")
    }
}

export async function delRedisCollectionData(redisClient,collectionKey: string, index: string) {
    try {
        await redisClient.del(`${collectionKey}:${index}`)
    } catch(error) {
        console.log("Cache delete went wrong");
    }
}