import { MongoClient } from "mongodb";

class Mongo {
    private db: MongoClient | null = null

    set database(db: MongoClient) {
        this.db = db
        this.db.connect().then(() => {
            console.log('MongoDB connected.')
        }).catch(console.log)
    }

    get database() {
        return this.db!;
    }
}

export const MongoDB = new Mongo()