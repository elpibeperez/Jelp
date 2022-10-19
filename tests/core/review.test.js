const dbHandler = require('../../models/InMemoryDbHandler');
const review = require('../../core/review');
const user = require('../../core/user');
const store = require('../../core/store');
const test_data = require('./review.testdata');
const user_data = require('./user.testdata');
const store_data = require('./store.testdata');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

const create_reviewer_store_and_review = async () => {
    const reviewer_data = user_data.basic_user;
    const reviewer = await user.new_user(reviewer_data);
    const new_store_data = store_data.basic_store;
    const new_store = await store.create_store(reviewer['_id'], new_store_data);
    const review_data = test_data.simple_review;
    const new_review = await review.new_review(reviewer['_id'], new_store, review_data);
    return { reviewer, new_store, new_review };
};

describe('Review', () => {
    it('can be created by a reviewer', async () => {
        const { reviewer, new_store, new_review } = await create_reviewer_store_and_review();
        expect(new_review).toBeTruthy();
        expect(new_review.title).toEqual(test_data.simple_review.title);
    });

    it('can get a review by id', async () => {
        const { reviewer, new_store, new_review } = await create_reviewer_store_and_review();
        const review_by_id = await review.get_by_id(new_review['_id']);
        expect(review_by_id).toBeTruthy();
        expect(review_by_id.title).toEqual(new_review.title);
    });

    it('can get a reviews by store id', async () => {
        const { reviewer, new_store, new_review } = await create_reviewer_store_and_review();
        const review_by_id = await review.get_by_store(new_store['_id']);
        expect(review_by_id).toBeTruthy();
        expect(review_by_id[0].title).toEqual(new_review.title);
    });

    it('can be patched by the reviewer', async () => {
        const { reviewer, new_store, new_review } = await create_reviewer_store_and_review();
        const title = 'New title';
        const patch = { title };
        await review.patch(reviewer['_id'], new_review['_id'], patch);
        const updated_review = await review.get_by_id(new_review['_id']);
        expect(updated_review).toBeTruthy();
        expect(updated_review.title).toEqual(title);
    });

    it('can be deleted by the reviewer', async () => {
        const { reviewer, new_store, new_review } = await create_reviewer_store_and_review();
        expect(new_review).toBeTruthy()
        await review.delete_review(reviewer['_id'], new_review['_id'])
        const deleted_review = await review.get_by_id(new_review['_id']);
        expect(deleted_review).toBeFalsy();
    });
});
