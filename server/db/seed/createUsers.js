const { faker } = require('@faker-js/faker');

const createUsers = (numberOfUsers) => {
    const users = [];
    for (let i = 0;i < numberOfUsers; i++) {
        let username = faker.internet.userName();  // username needs to be unique
        const password = faker.internet.password();
        let email = faker.internet.email();  // email needs to be unique
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const usernameArray = users.map(user=>user.username);
        const emailArray = users.map(user=>user.email);
        while (usernameArray.includes(username)) {
            username = faker.internet.userName();
        };
        while (emailArray.includes(email)) {
            username = faker.internet.email();
        }
        users.push({
            username,
            password,
            firstName,
            lastName,
            email
        });
    };

    // Non-random users
    users.push(...[
        {username: 'a', password: 'a', firstName: 'a', lastName: 'a', email:'a@a.com'},
        {username: 'b', password: 'b', firstName: 'b', lastName: 'b', email:'b@b.com'},
        {username: 'c', password: 'c', firstName: 'c', lastName: 'c', email:'c@c.com'},
    ])

    return users;
};

module.exports = createUsers;