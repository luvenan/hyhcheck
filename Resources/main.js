//JS code for the HYH checker. Should be a nested loop that goes through the form array, then checks through the trigger array, should return a trigger list array. For each trigger in the contains array, should return a personalized message that needs to replace the content and make a function run because it makes the part show up. 

//Select the target value property
let ingredients = document.getElementById('textbox').target.value;
//console.log(ingredients)

//First: turn the input into an array of triggers, dividing up by ', ', also turn everything lowercase.


function makeArr(ingredients) {
    let ingredlower = ingredients.toLowerCase();
    let arrIngred = ingredlower.split(', ');
    return arrIngred1;
};

/*test for the makeArr function
let ingredients = 'bananas, CITRUS, Chocolate, apple'
let newarr = makeArr(ingredients);
console.log(newarr);
*/

//Short trigger list to test functionality
let triggerList = ['peanuts', 'almonds', 'msg', 'orange', 'soy sauce'];


//Loop through both arrays, find common items, create third array

function findTriggers(arr1, arr2) {
    let foundTriggers = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                foundTriggers.push(arr1[i]);
            };
        };
    };
    if (foundTriggers === []) {
        document.getElementById('safe').hidden = false;
    }
    if (foundTriggers === true) {
        document.getElementById('unsafe').hidden = false;
        document.getElementById('listoftriggers').innerHTML = foundTriggers;
    }
    return foundTriggers;
};



/*Test area for the nested loop
let testArray = ['milk', 'orange', 'peanuts', 'tomato'];

let commonArr = findTriggers(testArray, triggerList);
console.log(commonArr);
*/

//Creates event listener for clicking the send button, to run findTriggers (or a function that uses it as a callback function)
let button = document.getElementById('send');
let arrIngred2 = makeArr(ingredients);
button.onclick = findTriggers(arrIngred2, triggerList);


   
 

//For later, trigger area, divided by categories
let msg = [];
let processedMeats = [];
let dairy = [];
let nuts = [];
let fruits = [];
let vegetables = [];
let freshYeast = [];
let sugarSubs = [];
let others = [];