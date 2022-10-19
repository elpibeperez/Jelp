const dbHandler = require('../../models/InMemoryDbHandler');
const review = require('../../core/review');
const user = require('../../core/user');
const store = require('../../core/store');
const reply = require('../../core/reply');
const test_data = require('./review.testdata');
const user_data = require('./user.testdata');
const store_data = require('./store.testdata');

beforeAll(async () => {
    await dbHandler.connect()
});


afterEach(async () => {
    await dbHandler.clearDatabase()}
);


afterAll(async () => { 
    await dbHandler.closeDatabase()
})

const create_reviewer_store_and_review = async () => {
    const reviewer_data =  user_data.basic_user;
    const reviewer = await user.new_user(reviewer_data);
    const new_store_data = store_data.basic_store;
    const new_store = await store.create_store(reviewer['_id'], new_store_data);
    const review_data = test_data.simple_review;
    new_review = await review.new_review(reviewer['_id'], new_store, review_data);
    return {reviewer, new_store, new_review};
}

const basic_reply = {
    reply: 'Nice review! Tottaly agree'
}

const response_reply = {
    reply: 'You two dont know nothing'
}


describe('Reply', () => {
    it('can be created from a review', 
        async () => {
            const {reviewer, new_store, new_review} = await create_reviewer_store_and_review();
            const replier = reviewer;
            expect(new_review).toBeTruthy();
            expect(new_review.title).toEqual(test_data.simple_review.title);
            const new_reply = await reply.create_reply_for_review(replier['_id'], new_review['_id'], basic_reply);
            expect(new_reply).toBeTruthy();
        }
    );
    it('can be created from a reply', 
        async () => {
            const {reviewer, new_store, new_review} = await create_reviewer_store_and_review();
            const replier = reviewer;
            expect(new_review).toBeTruthy();
            expect(new_review.title).toEqual(test_data.simple_review.title);
            const new_reply = await reply.create_reply_for_review(replier['_id'], new_review['_id'], basic_reply);
            expect(new_reply).toBeTruthy();
            const new_reply_reply = await reply.create_reply_for_reply(replier['_id'], new_review['_id'], new_reply['_id'], response_reply);
            expect(new_reply_reply).toBeTruthy()
        }
    );
});