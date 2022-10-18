const replies_model = require('../models/replies');
const model_utils = require('../models/utils');


const create_reply_for_review = async (replyer_id, review_id, reply) => {
    reply.replier = replyer_id; 
    reply.review = review_id;
    return await replies_model.create(reply);
}

const create_reply_for_reply = async (replyer_id, review_id, reply_id, reply) => {
    reply.replier = replyer_id; 
    reply.review = review_id;
    reply.father_reply = reply_id
    return await replies_model.create(reply);
}



module.exports = {
    create_reply_for_review,
    create_reply_for_reply
}