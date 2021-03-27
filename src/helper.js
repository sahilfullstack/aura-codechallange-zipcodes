const inputDataSet = require('../src/data.json');

// search exactly as zip or begins with queryName
function search_by_zip (zip){
    const filteredZip = inputDataSet.filter((data) => {
        return data.zip.match(zip)? true : false;
    });

    return filteredZip;
}

// search exactly as primary_city or begins with queryName
function search_by_name (name) {
    const filteredPrimaryCity = inputDataSet.filter((data) => {
        return data.primary_city.match(name)? true : false;
    });

    return filteredPrimaryCity;
}

// search closest city by coords, throw error if no city found
function search_by_coordinates (lat, long) {
    
    let smallestDifference = Infinity;
    let closestCity =  {};
    const latitude = Number(lat);
    const longitude = Number(long);

    inputDataSet.forEach((data) => {
        const diff = Math.abs(latitude - Number(data.latitude)) 
                        + Math.abs(longitude - Number(data.longitude));
        if (diff < smallestDifference) {
            smallestDifference = diff;
            closestCity = data;
        }
    });

    /* 
        Some error occurs in parsing
    */
    if (!Object.keys(closestCity)) {
        throw new Error('Something went wrong! Please try again.');
    }

    return [closestCity];
}

module.exports = {search_by_zip, search_by_name, search_by_coordinates}