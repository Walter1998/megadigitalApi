"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigServer = void 0;
const data_source_1 = require("./data.source");
class ConfigServer {
    get initConnect() {
        return data_source_1.AppDataSource.initialize();
    }
}
exports.ConfigServer = ConfigServer;
//# sourceMappingURL=config.js.map