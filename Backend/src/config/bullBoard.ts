import {createBullBoard} from "@bull-board/api"
import {BullMQAdapter} from "@bull-board/api/bullMQAdapter"
import {ExpressAdapter} from "@bull-board/express"
import { judgeQueue } from "../queue/judge.queue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues:[
        new BullMQAdapter(judgeQueue)
    ],serverAdapter
})

export {serverAdapter}