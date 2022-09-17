/*
const locationForm = document.querySelector('form')
const input = document.querySelector('input');



let zipData = undefined;

input.oninput = function () {
    if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
    }
}

locationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (input.value.trim().length === 5) {
        console.log('fetch');
        const zip = input.value.trim();
        const resource = ;
    }

    locationForm.reset();
})

const getLocationData = async (rsrc) => {
    const response = await fetch(rsrc);
    if (response.status !== 200) {
        throw new Error(`Issue Retreiving Data: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
*/
const apikey = '3TSvxwaOYLRpQT9VmAODZqa9PUJmwJm5';

async function getLocationData(resource) {
    const response = await fetch(resource);
    if (response.status !== 200) {
        throw new Error(`Issue retrieving data: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

async function getData(zip) {
    const resource = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apikey}&q=${zip}`;

    return getLocationData(resource)
    .then(data => {
        console.log('Requesting Location Key')
        return data[0];
    })
    // .then(data => {
    //     console.log('Requesting Location Weather Conditions')
    //     const resource = `http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=${apikey}`
    //     return getLocationData(resource);
    // })
    // .then(data => {
    //     console.log('Log Current Weather Conditions')
    //     zipData = data[0];
    //     return zipData;
    // })
    .catch(err => console.log(err));

    
}

async function getCityData(cityKey) {
    const resource = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apikey}`

    return getLocationData(resource)
    .then(data => data[0]);
}

async function getDetails(zip) {
    const dets = await getData(zip);
    const weather = await getCityData(dets.Key);
    
    return {dets, weather}
}

export {getDetails};