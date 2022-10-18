const stores_model = require('../models/stores');
const model_utils =  require('../models/utils')
const user = require('./user');


// create store
const create_store = async (user_id, store) => {
    const owner = await user.get_by_id(user_id);
    store.managers = [owner['_id'].toString()];
    return await stores_model.create(store);
}

// get store by id
const get_by_id = async (store_id) => {
    if (model_utils.is_valid_object_id(store_id)) {
        const store = await stores_model.findById(store_id);
        if (store && store.enabled) {
            return store;
        }
    }
    return null;    
    
}

// get store by name
const get_by_name = async (name) => {
    store = await stores_model.findOne({name});   
    if (store && store.enabled) {
        return store;
    }
    return null;
}


// patch store
const patch = async (store_id, user_id, store_values) => {
    const store = await get_by_id(store_id);
    const is_a_manager = store.managers.filter( valid_manager => valid_manager == user_id.toString()).length
    if (is_a_manager) {
        await stores_model.findByIdAndUpdate(store_id, store_values);    
    } else {
        throw new Error('User is not a manager'); 
    }
}

const tag = async (store_id, user_id, tags) => {
    const store = await get_by_id(store_id);
    const is_a_manager = store.managers.filter( valid_manager => valid_manager == user_id.toString()).length
    if (is_a_manager) {
        store.tags.push(tags);
        await store.save()
    } else {
        throw new Error('User is not a manager'); 
    }
}

const add_photo = (store_id, photo) => {

}

const is_manager = (store_id, user_id) => {

}

const add_manager = (store_id, user_id) => {
    
}

const get_count = async () => {
    return await stores_model.countDocuments({});
}

module.exports = {
    create_store,
    get_by_id,
    get_by_name,
    patch,
    tag,
    add_photo,
    is_manager, 
    add_manager,
    get_count
}