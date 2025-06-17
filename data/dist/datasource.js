"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDataSource = exports.getDataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const getDataSourceOptions = () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [(0, path_1.join)(__dirname, './entities', '*.entity.{ts,js}')],
    migrations: [(0, path_1.join)(__dirname, './migrations', '**', '*.ts')],
});
exports.getDataSourceOptions = getDataSourceOptions;
exports.ApiDataSource = new typeorm_1.DataSource((0, exports.getDataSourceOptions)());
//# sourceMappingURL=datasource.js.map