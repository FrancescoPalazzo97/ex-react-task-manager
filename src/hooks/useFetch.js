export default async function useFetch(URL, method) {
    let methodObj;

    switch (method) {
        case 'POST':

    }
    const res = await fetch(URL);
    const data = await res.json();
    return data;
}