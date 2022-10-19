const is_valid_object_id = (id) => {
    if (!id) {
        return false;
    } if (typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
        return true;
    } if (typeof id === 'object' && id.constructor.name === 'ObjectId') {
        return true;
    }
    return false;
};

module.exports = {
    is_valid_object_id,
};
