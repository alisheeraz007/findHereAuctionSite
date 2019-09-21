export function getData(payload) {
    return {
        type: "wholeData",
        payload,
    }
}

export function addImages(payload) {
    return {
        type: "getImages",
        payload,
    }
}

export function postImg(payload) {
    // console.log(payload)
    return {
        type: "postImg",
        payload,
    }
}

// export function add(payload,addType) {
//     return {
//         type: addType,
//         payload,
//     }
// }

// export function edit(payload, index,updateType) {
//     // console.log(updateType)
//     return {
//         type: updateType,
//         index: index,
//         payload: payload
//     }
// }

// export function remove(payload) {
//     // console.log(payload)
//     return {
//         type: "del",
//         payload
//     }
// }