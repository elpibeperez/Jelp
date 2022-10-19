const stores_model = require('../models/stores');
const model_utils = require('../models/utils');
const user = require('./user');

const create_store = async (user_id, store) => {
    const owner = await user.get_by_id(user_id);
    store.managers = [owner['_id'].toString()];
    return stores_model.create(store);
};

// get store by id
const get_by_id = async (store_id) => {
    if (model_utils.is_valid_object_id(store_id)) {
        const store = await stores_model.findById(store_id);
        if (store && store.enabled) {
            return store;
        }
    }
    return null;
};

// get store by name
const get_by_name = async (name) => {
    const store = await stores_model.findOne({ name });
    if (store && store.enabled) {
        return store;
    }
    return null;
};

const is_manager = (store, user_id) => store.managers.filter((valid_manager) => valid_manager
    === user_id.toString()).length !== 0;

const patch = async (store_id, user_id, store_values) => {
    const store = await get_by_id(store_id);
    if (is_manager(store, user_id)) {
        await stores_model.findByIdAndUpdate(store_id, store_values);
    } else {
        throw new Error('User is not a manager');
    }
};

const tag = async (store_id, user_id, tags) => {
    const store = await get_by_id(store_id);
    if (is_manager(store, user_id)) {
        store.tags.push(tags);
        await store.save();
    } else {
        throw new Error('User is not a manager');
    }
};

const add_picture = async (store_id, user_id, photo) => {
    const store = await get_by_id(store_id);
    if (is_manager(store, user_id)) {
        store.pictures.push(photo);
        await store.save();
    } else {
        throw new Error('User is not a manager');
    }
};

const add_manager = async (store_id, mananger_id, new_manager_id) => {
    const store = await get_by_id(store_id);
    if (is_manager(store, mananger_id)) {
        if (!is_manager(store, new_manager_id)) {
            store.managers.push(new_manager_id.toString());
            await store.save();
        }
    } else {
        throw new Error('User is not a manager');
    }
};

const get_count = async () => stores_model.countDocuments({});

module.exports = {
    create_store,
    get_by_id,
    get_by_name,
    patch,
    tag,
    add_picture,
    is_manager,
    add_manager,
    get_count,
};
