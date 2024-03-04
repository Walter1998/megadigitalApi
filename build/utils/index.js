"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const base_routes_1 = __importDefault(require("../routes/base.routes"));
const per_routes_1 = __importDefault(require("../shared/infra/http/routes/per.routes"));
require("reflect-metadata");
const app = new app_1.default([
    new base_routes_1.default(),
    new per_routes_1.default()
]);
app.listen();
//# sourceMappingURL=index.js.map