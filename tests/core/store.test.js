// deno-lint-ignore-file
const dbHandler = require('../../models/DbHandler');
const store = require('../../core/store');
const user = require('../../core/user');
const test_data = require('./store.testdata');
const user_data = require('./user.testdata');


beforeAll(async () => {
    await dbHandler.connect()
});


afterEach(async () => {
    await dbHandler.clearDatabase()}
);


afterAll(async () => { 
    await dbHandler.closeDatabase()
})

const create_owner_and_store = async () => {
    const owner_data =  user_data.basic_user;
    const owner = await user.new_user(owner_data);
    const store_data = test_data.basic_store;
    await store.create_store(owner['_id'], store_data);
    const new_store = await store.get_by_name(store_data.name);
    return {owner, new_store}
}

const create_user_two = async () => {
    const other_user =  user_data.other_user;
    const user_two = await user.new_user(other_user);
    return user_two;
}

describe('Store ', () => {
    it('can create a new store', 
        async () => {
            await create_owner_and_store();
            const store_count = await store.get_count(); 
            expect(store_count).toEqual(1);
        }
    );

    it('can get a store by name', 
        async () => {
            const {owner, new_store} = await create_owner_and_store();
            expect(new_store).toBeTruthy();
            expect(test_data.basic_store.name).toEqual(new_store.name)
        }
    );

    it('can get a store by id', 
        async () => {
            const {owner, new_store} = await create_owner_and_store();
            const store_from_id = await store.get_by_id(new_store['_id']);
            expect(store_from_id).toBeTruthy();
            expect(store_from_id.name).toEqual(new_store.name)
        }
    );
    
    it('can be patched with an owner', 
        async () => {
            const {owner, new_store} = await create_owner_and_store();
            expect(new_store).toBeTruthy();
            const patch_description = new_store.description + ' suffix';
            
            await store.patch(new_store['_id'], owner['_id'], {description: patch_description});
            const patched_store = await store.get_by_id(new_store['_id']);
            expect(patched_store.description).toEqual(patch_description);
        }
    );

    it('can\'t be patched with a user that is not an owner', 
        async () => {
            const {owner, new_store} = await create_owner_and_store();
            expect(new_store).toBeTruthy();
            const other_user = await create_user_two();
            expect(other_user).toBeTruthy();
            const patch_description = new_store.description + ' suffix';
            try{
                await store.patch(new_store['_id'], other_user['_id'], {description: patch_description})
            } catch (error) {
                expect(error.message).toBeTruthy();
                expect(error.message).toEqual('User is not a manager');
            }
        }
    );

    it('can be tagged by the owner', 
        async () => {
            const {owner, new_store} = await create_owner_and_store();
            expect(new_store).toBeTruthy();
            const store_id = new_store['_id']
            const new_tag = 'tag'
            await store.tag(new_store['_id'], owner['_id'], new_tag);
            const tagged_store = await store.get_by_id(store_id);
            const tagged_match = tagged_store.tags.filter(tag => tag === new_tag).length;
            expect(tagged_match).toEqual(1);
        }
    );

    it('can\'t be tagged with a user that is not an owner', 
        async () => {
            const {owner, new_store} = await create_owner_and_store();
            expect(new_store).toBeTruthy();
            const other_user = await create_user_two();
            expect(other_user).toBeTruthy();
            try{
                await store.tag(new_store['_id'], other_user['_id'], "a new tag")
            } catch (error) {
                expect(error.message).toBeTruthy();
                expect(error.message).toEqual('User is not a manager');
            }
        }
    );
});