const dbHandler = require('../../models/InMemoryDbHandler');
const review = require('../../core/review');
const user = require('../../core/user');

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

describe('Review ', () => {
    it('can have a new test', 
        async () => {
            expect(1).toEqual(1);
        }
    );

});