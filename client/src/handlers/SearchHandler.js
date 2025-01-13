import { logger } from "@/utils/Logger.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class SearchHandler extends SocketHandler {
    constructor() {
        super()
        this.on('SEARCH_QUERY_UPDATED', this.onSearch())
    }
    onSearch() {
        logger.log('Search')
    }
}

export const searchHandler = new SearchHandler()