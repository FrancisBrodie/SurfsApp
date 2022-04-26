import { hashPassword } from '../password-helpers.js'

export const createUser = (user, databaseClient) => {
    const hashedPassword = hashPassword(user.password);
    return databaseClient
        .query(
            "INSERT into users (email, hashed_password) values ($1, $2) returning id",
            [
                user.email,
                hashedPassword,
                // user.language,
                // user.countries,
                // user.cities,
            ]
        )
}