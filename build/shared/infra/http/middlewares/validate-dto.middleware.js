"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMiddlewareDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_sanitizer_1 = require("class-sanitizer");
const http_response_1 = require("../../../response/http.response");
class ValidateMiddlewareDTO {
    httpResponse;
    constructor(httpResponse = new http_response_1.HttpResponse()) {
        this.httpResponse = httpResponse;
    }
    validator(req, res, next, type) {
        const dtoObj = (0, class_transformer_1.plainToClass)(type, req.body);
        (0, class_validator_1.validate)(dtoObj).then((err) => {
            if (err.length > 0) {
                const dtoErrors = err.map((error) => Object.values(error.constraints)).join(', ');
                return this.httpResponse.BadRequest(res, dtoErrors);
            }
            else {
                (0, class_sanitizer_1.sanitize)(dtoObj);
                req.body = dtoObj;
                next();
            }
        });
    }
}
exports.ValidateMiddlewareDTO = ValidateMiddlewareDTO;
//# sourceMappingURL=validate-dto.middleware.js.map