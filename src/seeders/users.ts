import bcrypt from "bcrypt"


export const userData = [
    {
        "id": "4dee9dfb-e1f9-491b-88e2-287e3a7c56ea",
        "email": "xyz@gmail.com",
        "password": "password"
    },
    {
        "id": "2e80b813-f659-456d-93f9-1887917123cb",
        "email": "taiwo@gmail.com",
        "password": "password"
    },
    {
        "id": "31696c84-9791-41e2-8a55-0087d00d2163",
        "email": "tyler@gmail.com",
        "password": "password"
    },
    {
        "id": "913daa03-23c4-4593-af41-a8a96d10a787",
        "email": "hydrogin@gmail.com",
        "password": "password"
    },
    {
        "id": "aaba7d7d-b69b-4717-beb0-b7067f05aad2",
        "email": "rodney@gmail.com",
        "password": "password"
    },
    {
        "id": "9d2c90ff-d2d6-4c18-9790-8b4d8d5cfcc4",
        "email": "deji@gmail.com",
        "password": "password"
    },
    {
        "id": "df2b862b-bb29-459f-ae70-7fb19cd9a2b9",
        "email": "temidyo@gmail.com",
        "password": "password"
    },
    {
        "id": "f6a47b09-0898-4b78-a630-9ca45207d9fc",
        "email": "akinsuyi@gmail.com",
        "password": "password"
    },
    {
        "id": "4bce1247-13c1-4441-8b2b-b80571473b5e",
        "email": "sabeeqlee@gmail.com",
        "password": "password"
    },
    {
        "id": "769d35cb-8be7-484d-a4c6-4c418bd79b83",
        "email": "alagba@gmail.com",
        "password": "password"
    }
]

const saltRounds = 10;
userData.forEach(user => {
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = hashedPassword;
})