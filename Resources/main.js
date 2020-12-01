//JS code for the HYH checker

//This function turns the input into an array of triggers, dividing up by ', ', also turn everything lowercase.

function makeArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let arrIngred = ingredlower.split(', ');
    return arrIngred;
};


//The three functions below make arrays out of the info on the csv file imported from the database of triggers

    // Selects the property general triggers in each array and makes another array with only the general triggers items
     
    function makeGenArr(csvfile) {
        let generalArray = [];
        for (let i=0; i<csvfile.data.length; i++) {
            generalArray.push(csvfile.data[i].General)
        };
        console.log(generalArray);
        return generalArray;
    };
    
    //Selects the property msg in each array and makes another array with only the msg items
    function makeMsgArr(csvfile) {
        let msgArray = [];
        for (let i=0; i<csvfile.data.length; i++) {
            msgArray.push(csvfile.data[i].MSG)
        };
        console.log(msgArray)
        return msgArray;
    };
       
    // Selects the property iffy ingredients in each array and makes another array with only the general triggers items
    function makeIffyArr(csvfile) {
        let iffyArray = [];
        for (let i=0; i<csvfile.data.length; i++) {
        iffyArray.push(csvfile.data[i].Iffy)
        };
    console.log(iffyArray);
    return iffyArray;
    };

//The function below reads the csv file in javascript uses it to populate the arrays. 

function myMainFun(csvpath) {
    Papa.parse(csvpath, {
        download: true,
        header: true,
        complete: function(csvfile){
        console.log(csvfile)
            let generalArray = makeGenArr(csvfile);
            let msgArray = makeMsgArr(csvfile);
            let iffyArray = makeIffyArr(csvfile);

            //This activates on the click of the "is it safe" button, that takes the input and loops through each array to check for triggers.
            check.onclick = function() {
                console.log('ingredients have been submitted')
                findTriggers(makeArr(), generalArray, msgArray, iffyArray);
                check.hidden = true;
                reset.hidden = false;
            }
        }
    });
};


//This links the creation of the array to a csv upload, but will be later removed or adapted to read the file locally, under the path: ./Resources/database.csv

let csvpath = "./Resources/database.csv"
myMainFun(csvpath);
      
 

//This function checks for triggers. It loop through both arrays, find common items, create third array, check if any triggers. If none, say it is safe. If some, return message saying it is unsafe with trigger list, with three possible categories: general triggers, msg, and iffy ingredients.

//let generalArray = ["caffeine", "lemon", "parmesan"];
//let msgArray = ["gelatin", "hydrolized", "natural flavoring"];
//let iffyArray = ["carob", "citric acid", "coconut"];


function findTriggers(arrIngred, generalArray, msgArray, iffyArray) {
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




//This creates a variable for the button, then creates an event listener when the button is pressed, then it triggers the functions I need. In the end it changes the button to reset.




//This gives functionality to the reset button, erasing all previous values. 

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