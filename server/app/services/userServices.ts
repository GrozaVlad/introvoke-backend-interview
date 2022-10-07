import hashPassword from '../services/crypto';
import {v4 as uuid} from 'uuid';

export async function getUserIdentity(pool,username,password) {
    const hashedPassword = hashPassword(password)

    return pool.query('SELECT * FROM users WHERE username=$1 AND password=$2',[username,hashedPassword]);
}

export async function createNewBasicUser(pool,username, password) {
    const userId = uuid();
    const hashedPassword = hashPassword(password)

    return pool.query('INSERT INTO users (user_id, role, password, username) VALUES ($1, $2, $3, $4)',[userId, 'USER', hashedPassword, username]);
}