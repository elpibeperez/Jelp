const dbHandler = require('../../models/InMemoryDbHandler');
const user = require('../../core/user');
const test_data = require('./user.testdata');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe('User ', () => {
    it('can create a new user', async () => {
        const user_data = test_data.basic_user;
        await expect(async () => user.new_user(user_data).not.toThrow());
    });

    it('can get a user by username', async () => {
        const user_data = test_data.basic_user;
        await user.new_user(user_data);
        const retreived_user = await user.get_by_username(user_data.username);
        expect(retreived_user.fullname).toEqual(user_data.fullname);
    });

    it('can return null when user is not there', async () => {
        const user_data = test_data.basic_user;
        const retreived_user = await user.get_by_username(user_data.username);
        expect(retreived_user).toBeNull();
    });

    it('can get a user by id', async () => {
        const user_data = test_data.basic_user;
        await user.new_user(user_data);
        const retreived_user_by_username = await user.get_by_username(user_data.username);
        const retreived_user_by_id = await user.get_by_id(retreived_user_by_username._id);
        expect(retreived_user_by_username).toEqual(retreived_user_by_id);
    });

    it('can return null if the user id is not valid', async () => {
        const retreived_user_by_id = await user.get_by_id('some_random_stuff');
        expect(retreived_user_by_id).toBeNull();
    });

    it('can return null if the user id is not there', async () => {
        const retreived_user_by_id = await user.get_by_id('56cb91bdc3464f14678934ca');
        expect(retreived_user_by_id).toBeNull();
    });

    it('can not retreive deleted values', async () => {
        const user_data = test_data.basic_user;
        await user.new_user(user_data);
        const saved_user = await user.get_by_username(user_data.username);
        const id = saved_user._id;
        await user.delete_user(id);
        let deleted_user = await user.get_by_id(id);
        expect(deleted_user).toBeNull();
        deleted_user = await user.get_by_username(user_data.username);
        expect(deleted_user).toBeNull();
    });

    it('can not create two users with the same username', async () => {
        const user_data = test_data.basic_user;
        const double_creation = async () => {
            await user.new_user(user_data);
            await user.new_user(user_data);
        };
        await expect(double_creation()).rejects.toThrow(TypeError);
    });
});
