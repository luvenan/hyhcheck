//JS code for the HYH checker


//This is how the pluralize plugin works to turn words into singular. This means that I will need to add to all the exceptions on the list in order to trigger a match each time. Otherwise, it should be fine. I should add it to the code right now, and then add the exceptions as I find them. 
/*pluralize.addSingularRule(/avocadoes$/i, 'avocado')
let testarray = ['peanuts', 'avocadoes', 'bananas'];
console.log(testarray.map(x => pluralize.singular(x)))*/

//This function turns everything lower case, turns the input into an array of triggers, dividing up by ', ', then turns them into singular (with possible mistakes for irregular plurals) 

function makeArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let splitArr = ingredlower.split(', ');
    pluralize.addSingularRule(/avocadoes$/i, 'avocado')
    pluralize.addSingularRule(/molasses$/i, 'molasses')
    pluralize.addSingularRule(/raspberries$/i, 'raspberry')
    let arrIngred = splitArr.map(x => pluralize.singular(x));
    return arrIngred;
};

//This gives functionality to the reset button, erasing all previous values. It also creates a variable for the check button.

const check = document.getElementById('checkbutton');
const reset = document.getElementById('resetbutton');

reset.onclick = function() {
    console.log('the form has been reset')
    let textarea = document.getElementById('textbox');
    textarea.value = "";
    check.hidden = false;
    reset.hidden = true;
    document.getElementById('safe').hidden = true;
    document.getElementById('notsafe').hidden = true;
    document.getElementById('notsafegen').hidden = true;
    document.getElementById('notsafemsg').hidden = true;
    document.getElementById('iffysafety').hidden = true;
}


//The six functions below make arrays out of the info on the csv file imported from the database of triggers

    // Selects the property General in each array and makes another array with only the general triggers items
     
    function makeGenArr(csvfile) {
        let generalArray = [];
        for (let i=0; i<csvfile.data.length; i++) {
            generalArray.push(csvfile.data[i].General)
        };
        console.log(generalArray);
        return generalArray;
    };

    
    //Selects the property MSG in each array and makes another array with only the msg items
    function makeMsgArr(csvfile) {
        let msgArray = [];
        for (let i=0; i<csvfile.data.length; i++) {
            msgArray.push(csvfile.data[i].MSG)
        };
        console.log(msgArray)
        return msgArray;
    };
       
    // Selects the property Iffy in each array and makes another array with only the iffy triggers items
    function makeIffyArr(csvfile) {
        let iffyArray = [];
        for (let i=0; i<csvfile.data.length; i++) {
        iffyArray.push(csvfile.data[i].Iffy)
        };
    console.log(iffyArray);
    return iffyArray;
    };

// Selects the property containsGeneral triggers in each array and makes another array with only the keywords that if part of an ingredient name, then that ingredient is a general trigger

function makeContainsGenArr(csvfile) {
    let containsGeneralArray = [];
    for (let i=0; i<csvfile.data.length; i++) {
        containsGeneralArray.push(csvfile.data[i].ContainsGeneral)
    };
    console.log(containsGeneralArray);
    return containsGeneralArray;
};

// Selects the property containsMSG triggers in each array and makes another array with only the keywords that if part of an ingredient name, then that ingredient is an msg trigger

function makeContainsMSGArr(csvfile) {
    let containsMSGArray = [];
    for (let i=0; i<csvfile.data.length; i++) {
        containsMSGArray.push(csvfile.data[i].ContainsMSG)
    };
    console.log(containsMSGArray);
    return containsMSGArray;
};

// Selects the property containsIffy triggers in each array and makes another array with only the keywords that if part of an ingredient name, then that ingredient is an Iffy trigger

function makeContainsIffyArr(csvfile) {
    let containsIffyArray = [];
    for (let i=0; i<csvfile.data.length; i++) {
        containsIffyArray.push(csvfile.data[i].ContainsIffy)
    };
    console.log(containsMSGArray);
    return containsIffyArray;
};

 
//This function checks for triggers. It loop through both arrays, find common items, create third array, check if any triggers. If none, say it is safe. If some, return message saying it is unsafe with trigger list, with three possible categories: general triggers, msg, and iffy ingredients.

function findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray,  containsMSGArray, containsIffyArray) {
    let noTriggerCounter = 3;
    
    //If statement for general triggers
    let generalTriggers = [];
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < generalArray.length; j++) {
            if (arrIngred[i] === generalArray[j]) {
                generalTriggers.push(arrIngred[i]);
            };
        };
    };    
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < containsGeneralArray.length; j++) {
            if (arrIngred[i].indexOf(containsGeneralArray[j]) !== -1) {
                generalTriggers.push(arrIngred[i]);
            };
        };
    };

    if (generalTriggers.length > 0) {
        document.getElementById('notsafe').hidden = false;
        document.getElementById('notsafegen').hidden = false;
        let stringGen = generalTriggers.join(', ')
        document.getElementById('gentriggers').innerHTML = stringGen;
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no general triggers')
        console.log(noTriggerCounter)
    }

    //If statements for msg triggers
    let msgTriggers = [];
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < msgArray.length; j++) {
            if (arrIngred[i] === msgArray[j]) {
                msgTriggers.push(arrIngred[i]);
            };
        };
    };
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < containsMSGArray.length; j++) {
            if (arrIngred[i].indexOf(containsMSGArray[j]) !== -1) {
                msgTriggers.push(arrIngred[i]);
            };
        };
    };


    if (msgTriggers.length > 0) {
        document.getElementById('notsafe').hidden = false;
        document.getElementById('notsafemsg').hidden = false;
        let stringMsg = msgTriggers.join(', ')
        document.getElementById('msgtriggers').innerHTML = stringMsg + '.';
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no msg triggers')
        console.log(noTriggerCounter)
    }

    //If statements for iffy ingredients
    let iffyTriggers = [];
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < iffyArray.length; j++) {
            if (arrIngred[i] === iffyArray[j]) {
                iffyTriggers.push(arrIngred[i]);
            };
        };
    };

    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < containsIffyArray.length; j++) {
            if (arrIngred[i].indexOf(containsIffyArray[j]) !== -1) {
                iffyTriggers.push(arrIngred[i]);
            };
        };
    };

    if (iffyTriggers.length > 0) {
        document.getElementById('iffysafety').hidden = false;
        let stringIffy = iffyTriggers.join(', ')
        document.getElementById('iffytriggers').innerHTML = stringIffy + '.';
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no iffy triggers')
        console.log(noTriggerCounter)
    }

    if (noTriggerCounter === 0){
        console.log('This product is safe!')
        document.getElementById('safe').hidden = false;
    }
};

//The function below reads the csv file in javascript uses it to populate the arrays, then adds an event listener to clicking the is it safe button and gives the results. 

function myMainFun(csvpath) {
    Papa.parse(csvpath, {
        download: true,
        header: true,
        complete: function(csvfile){
        console.log(csvfile)
            let generalArray = makeGenArr(csvfile);
            let msgArray = makeMsgArr(csvfile);
            let iffyArray = makeIffyArr(csvfile);
            let containsGeneralArray = makeContainsGenArr(csvfile);
            let containsMSGArray = makeContainsMSGArr(csvfile);
            let containsIffyArray = makeContainsIffyArr(csvfile);

            //This activates on the click of the "is it safe" button, that takes the input and loops through each array to check for triggers.
            check.onclick = function() {
                console.log('ingredients have been submitted')
                findTriggers(makeArr(), generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray);
                check.hidden = true;
                reset.hidden = false;
            }
        }
    });
};


//This links the creation of the array to the csv file and calls the main function to make the app run. 

let csvpath = "./Resources/database.csv"
myMainFun(csvpath);