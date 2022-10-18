// deno-lint-ignore-file
const is_valid_object_id = (id) => {
    if (!id) {
        return false;
    }else if (typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)  ) {
        return true
    }else if (typeof id === 'object' && id.constructor.name === 'ObjectId' ){
        return true;
    }
    return false;
}

module.exports = {
    is_valid_object_id
}