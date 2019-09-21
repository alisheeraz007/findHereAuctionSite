export const goBack = (props, ev) => {
    props.history.goBack();
}

export const changePath = (name, props) => {
    props.history.push(`/${name}`)
}

export const capitalizeFirstLetters = (str) => {
    return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase();
    })
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}