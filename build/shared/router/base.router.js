"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
class BaseRouter {
    router;
    controller;
    middleware;
    constructor(TController, UMiddleware) {
        this.router = (0, express_1.Router)();
        this.controller = new TController();
        this.middleware = new UMiddleware();
        this.routes();
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    routes() { }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=base.router.js.map