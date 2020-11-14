//JS code for the HYH checker. Should be a nested loop that goes through the form array, then checks through the trigger array, should return a trigger list array. For each trigger in the contains array, should return a personalized message that needs to replace the content and make a function run because it makes the part show up. 

//First: turn the input into an array of triggers, dividing up by ', ', also turn everything lowercase.
function makeArr(ingredients) {
    let arrIngred = ingredients.split(', ');
    return arrIngred;
};

//Short trigger list to test functionality


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
    return foundTriggers;
};



/*Test area for the nested loop
let testArray = ['milk', 'orange', 'peanuts', 'tomato'];
let triggerList = ['peanuts', 'almonds', 'msg', 'orange', 'soy sauce'];

let commonArr = findTriggers(testArray, triggerList);
console.log(commonArr);
*/



//Show triggers that were found on the DOM


   
 

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