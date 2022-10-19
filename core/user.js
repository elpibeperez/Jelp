const users_model = require('../models/users');

const model_utils = require('../models/utils');

const get_by_username = async (username) => {
    const user = await users_model.findOne({ username });
    if (user && user.enabled) {
        return user;
    }
    return null;
};

const new_user = async (user_data) => {
    const old_user = await get_by_username(user_data.username);
    if (old_user == null) {
        return users_model.create(user_data);
    } throw new TypeError();
};

const get_by_id = async (user_id) => {
    if (model_utils.is_valid_object_id(user_id)) {
        const user = await users_model.findById(user_id);
        if (user && user.enabled) {
            return user;
        }
    }
    return null;
};

const update_user = async (user_id, user_values) => users_model
    .indByIdAndUpdate(user_id, user_values);

const delete_user = async (user_id) => users_model.findByIdAndUpdate(user_id, { enabled: false });

module.exports = {
    new_user,
    get_by_username,
    get_by_id,
    update_user,
    delete_user,
};
