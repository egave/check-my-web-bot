import Base from './base.ts'
import { UrlData } from '../types/UrlData.ts';

const Sessions = Base.use('session', true)

export class SessionDb {

    key: string;
    urlData?: UrlData[];
    
    // urlData?: {
    //     url: string
    //     action: number
    //     content_type: string
    //     last_status: number
    //     last_md5: string
    // }[]
    
    constructor(data: SessionDb) {
		this.key = data.key
        this.urlData = data.urlData
        console.debug ("this.key="+this.key);
        console.debug ("this.urlData="+this.urlData);
	}

    static async find(query: any = {}, limit?: number, lastId?: string) {
        console.debug ("Inside SessionsDb.find()");

        const { items, count, last } = await Sessions.find(query, limit, lastId)
        
        console.debug ("After Sessions.find()"+{ items, count, last });
        
        if (!items) return { count: 0, last: undefined, items: [] }

        return { count, last, items: items.map((session: SessionDb) => new SessionDb(session)) }
    }
}