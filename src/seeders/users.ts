import bcrypt from "bcrypt"


export const userData = [
    {
        "id": "7f1d6d7e-ab44-47c9-30e7fc6f93b5",
        "email": "xyz@gmail.com",
        "password": "password"
    },
    {
        "id": "ab44-47c9-94e9-30e7fc6f93b5",
        "email": "taiwo@gmail.com",
        "password": "password"
    },
    {
        "id": "ab44-479-94e9-30e7fc6f93b5",
        "email": "tyler@gmail.com",
        "password": "password"
    },
    {
        "id": "ab44-479-94e9-30e7fc6f93b5",
        "email": "hydrogin@gmail.com",
        "password": "password"
    },
    {
        "id": "ab44-479-94e9-30e7fc6f93b5",
        "email": "rodney@gmail.com",
        "password": "password"
    },
    {
        "id": "ab44-47c9-94e9-30e7fc6f93b5",
        "email": "deji@gmail.com",
        "password": "password"
    },
    {
        "id": "",
        "email": "temidyo@gmail.com",
        "password": "password"
    },
    {
        "id": "",
        "email": "akinsuyi@gmail.com",
        "password": "password"
    },
    {
        "id": "",
        "email": "sabeeqlee@gmail.com",
        "password": "password"
    },
    {
        "id": "",
        "email": "alagba@gmail.com",
        "password": "password"
    }
]

const saltRounds = 10;
userData.forEach(user => {
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = hashedPassword;
})