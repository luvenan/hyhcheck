//This function takes the user input, turns everything lower case, turns the input into an array of triggers, dividing up by ', ', then turns them into singular (with possible mistakes for irregular plurals).

function makeInputArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let splitArr = ingredlower.split(', ');
    //Adds exceptions to non-standard plurals so that the words match exactly with database
    pluralize.addSingularRule(/avocadoes$/i, 'avocado')
    pluralize.addSingularRule(/molasses$/i, 'molasses')
    pluralize.addSingularRule(/raspberries$/i, 'raspberry')
    let arrIngred = splitArr.map(x => pluralize.singular(x));
    return arrIngred;
};

// This function makes arrays from the csv file, to be called once for each property and create the arrays to check against.
function makeCsvArr(csvfile, property) {
    let arr = [];
    for (let i=0; i<csvfile.data.length; i++) {
        arr.push(csvfile.data[i][property])
    };
    arr = arr.filter(Boolean);
    //console.log(arr);
    return arr;
};



export { makeInputArr, makeCsvArr };