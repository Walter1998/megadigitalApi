"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const PersonaRepository_1 = require("../../modules/persona/infra/typeorm/repositories/PersonaRepository");
tsyringe_1.container.registerSingleton("PersonaRepository", PersonaRepository_1.PersonaRepository);
//# sourceMappingURL=index.js.map