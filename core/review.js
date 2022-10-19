const reviews_model = require('../models/reviews');
const model_utils = require('../models/utils');

const new_review = async (reviewer_id, store_id, review) => {
    review.reviewer = reviewer_id;
    review.store = store_id;
    return reviews_model.create(review);
};

const get_by_id = async (review_id) => {
    if (model_utils.is_valid_object_id(review_id)) {
        const review = await reviews_model.findById(review_id);
        if (review) {
            return review;
        }
    }
    return null;
};

const get_by_store = async (store_id) => {
    if (model_utils.is_valid_object_id(store_id)) {
        const reviews = await reviews_model.find({ store: store_id });
        if (reviews) {
            return reviews;
        }
    }
    return null;
};

const is_the_reviewer = async (review, reviewer_id) => model_utils.is_valid_object_id(reviewer_id)
    && review.reviewer.toString() === reviewer_id.toString();

const patch = async (reviewer_id, review_id, review_patch) => {
    if (!model_utils.is_valid_object_id(review_id)) {
        throw new Error('Invalid review ID Format');
    }
    const review = await get_by_id(review_id);
    if (is_the_reviewer(review, reviewer_id)) {
        await reviews_model.findByIdAndUpdate(review_id, review_patch);
    } else {
        throw new Error('User is not the reviewer');
    }
};

const delete_review = async (reviewer_id, review_id) => {
    if (!model_utils.is_valid_object_id(reviewer_id)) {
        throw new Error('User is not the reviewer');
    }
    await reviews_model.deleteOne({ _id: review_id });
};

module.exports = {
    new_review,
    get_by_id,
    get_by_store,
    patch,
    delete_review,
};
