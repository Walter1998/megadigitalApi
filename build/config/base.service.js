"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const config_1 = require("./config");
class BaseService extends config_1.ConfigServer {
    getEntity;
    useRepository;
    constructor(getEntity) {
        super();
        this.getEntity = getEntity;
        this.useRepository = this.initRepository(getEntity);
    }
    async initRepository(entity) {
        const connection = await this.initConnect;
        return connection.getRepository(entity);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map