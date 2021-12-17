// This script will be run only if database (/data/db) is empty (same as all scripts in /docker-entrypoint-initdb.d/)
// Tested on mongo db version 5.0.3

db.log.insertOne({"message": "Database created."});

db.createUser(
    {
        user: _getEnv("MONGO_USER"),
        pwd: cat(_getEnv("MONGO_PASSWORD_FILE")),
        roles: [
            "readWrite", "dbAdmin"
        ]
    }
);
