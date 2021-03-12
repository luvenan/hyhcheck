//This file contains the helper functions used in main.js

//Function to make array from database.csv
function makeArr(csvfile, property) {
    let arr = [];
    for (let i=0; i<csvfile.data.length; i++) {
        arr.push(csvfile.data[i].property)
    };
    arr = arr.filter( Boolean );
    console.log(arr);
    return arr;
};



