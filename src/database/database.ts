import { Database } from '@vuex-orm/core';
import Employee from '@/models/Employee';

const database = new Database();

database.register(Employee);

export default database;
