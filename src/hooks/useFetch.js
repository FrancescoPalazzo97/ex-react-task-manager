export default async function useFetch(URL, method, obj) {
    let methodObj = {};

    switch (method) {
        case 'POST':
            methodObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            };
            break;
        case 'DELETE':
            methodObj = {
                method: 'DELETE'
            };
            break;
        case 'PUT':
            methodObj = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            };
            break;
        default:
            methodObj = {};
    }

    const res = await fetch(URL, methodObj);
    return await res.json();
    //return data;
}