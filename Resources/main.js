//JS code for the HYH checker

//This function turns everything lower case, turns the input into an array of triggers, dividing up by ', ', then turns them into singular (with possible mistakes for irregular plurals) 

function makeArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let splitArr = ingredlower.split(', ');
    //Adds exceptions to non-standard plurals so that the wrods match exactly with database
    pluralize.addSingularRule(/avocadoes$/i, 'avocado')
    pluralize.addSingularRule(/molasses$/i, 'molasses')
    pluralize.addSingularRule(/raspberries$/i, 'raspberry')
    let arrIngred = splitArr.map(x => pluralize.singular(x));
    return arrIngred;
};



//This function makes arrays from the csv file, to be called once for each property and create the arrays to check against.
function makeCsvArr(csvfile, property) {
    let arr = [];
    for (let i=0; i<csvfile.data.length; i++) {
        arr.push(csvfile.data[i][property])
    };
    arr = arr.filter(Boolean);
    console.log(arr);
    return arr;
};
 

//Declares initial state of noTriggerCounter

let noTriggerCounter = 5;

//This function checks for triggers. It loop through both arrays, find common items, create third array. This checks if any triggers exist. 
function makeArrTriggers(arrIngred, propertyArr, containsPropArr) {
    let arrTriggers = [];
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < propertyArr.length; j++) {
            if (arrIngred[i] === propertyArr[j]) {
                arrTriggers.push(arrIngred[i]);
            };
        };
    };
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < containsPropArr.length; j++) {
            if (arrIngred[i].indexOf(containsPropArr[j]) !== -1) {
                arrTriggers.push(arrIngred[i]);
            };
        };
    };
    arrTriggers = arrTriggers.filter((a,b) => arrTriggers.indexOf(a) === b);
    return arrTriggers; 
};


//This function checks the ammount of trigger ingredients and triggers the appropriate messages in the app. 
function isItSafe(triggerArr, triggerType, triggerTypeId, triggerListId) {
    let newTriggerArr = [];
    if(triggerType !== 'Iffy' && triggerArr !== undefined) {
        document.getElementById('notsafe').hidden = false;
        
        //Here it loops through the array of found triggers and removes some false matches
        for (let i = 0; i < triggerArr.length; i++) {
            if (triggerArr[i].indexOf('nutmeg') === -1 && triggerArr[i].indexOf('coconut') === -1 && triggerArr[i].indexOf('butternut') === -1 && triggerArr[i].indexOf('cocoa butter') === -1 && triggerArr[i].indexOf('cacao butter') === -1) {
                newTriggerArr.push(triggerArr[i]);
            };
        }
        
       console.log(`The triggerArr of ${triggerType} is ${triggerArr}`);  
        
       // newTriggerArr = triggerArr;
    } else {
        newTriggerArr = triggerArr;
    }
    if(newTriggerArr.length > 0) {
        document.getElementById(triggerTypeId).hidden = false;
        let triggerStr = newTriggerArr.join(', ')
        document.getElementById(triggerListId).innerHTML = triggerStr + '.';
    } else {
        console.log('This product has no ' + triggerType + ' triggers.')
        noTriggerCounter -= 1;
        console.log(noTriggerCounter);
    }
}

//Exception function, to be called with each ingredient that is in the special cases list
function exception(arrIngred, ingredient, id) {
    if (arrIngred.indexOf(ingredient) !== -1) {
        document.getElementById(id).hidden = false;   
    } else {
        noTriggerCounter -= 1;
        console.log(`This product has no ${ingredient}!`);
        console.log(noTriggerCounter);
    }; 
};


//This function checks for triggers and releases a message with the results

function findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray) {
    
    //Checks for triggers in arrIngred and makes arrays with each type
    const generalTriggers = makeArrTriggers(arrIngred, generalArray, containsGeneralArray);
    const msgTriggers = makeArrTriggers(arrIngred, msgArray, containsMSGArray);
    const iffyTriggers = makeArrTriggers(arrIngred, iffyArray, containsIffyArray);

    
    //Calls the isItSafe function for each type of trigger

    isItSafe(generalTriggers, 'General',  'notsafegen', 'gentriggers');
    isItSafe(msgTriggers, 'MSG', 'notsafemsg', 'msgtriggers');
    isItSafe(iffyTriggers, 'Iffy',  'iffysafety', 'iffytriggers');

    //Calls exception function for each exception
    
    exception(arrIngred, 'tea', 'teaexception');
    exception(arrIngred, 'coffee', 'coffeeexception');
     
    //If all ingredient checks come out negative, then the product is safe. This releases the safe message.
    if (noTriggerCounter === 0){
        console.log('This product is safe!');
        document.getElementById('safe').hidden = false;
    };
};

//This function clears the results when a new value is submitted

function clearresults() {
    console.log('the form has been reset');
    noTriggerCounter = 5;
    document.getElementById('safe').hidden = true;
    document.getElementById('notsafe').hidden = true;
    document.getElementById('notsafegen').hidden = true;
    document.getElementById('notsafemsg').hidden = true;
    document.getElementById('iffysafety').hidden = true;
    document.getElementById('teaexception').hidden = true;
    document.getElementById('coffeeexception').hidden = true; 
};

//This function changes the button from "is it safe?" to "check more", changes its styling, and ressets the results

const check = document.getElementById('checkbutton');

function changeButton() {
    document.getElementById('resultsandbutton').style.justifyContent = "space-between";
    let button = document.getElementById('checkbutton');
    button.innerHTML = "CHECK MORE"
    button.style.backgroundColor = "white";
    button.style.color = "#6B3AAF";
    button.style.border = "1px solid #6B3AAF";
}

//The function below reads the csv file in javascript uses it to populate the arrays, then adds an event listener to clicking the is it safe button and gives the results.

function myMainFun(csvpath) {
    Papa.parse(csvpath, {
        download: true,
        header: true,
        complete: function (csvfile) {
            console.log(csvfile);
            let generalArray = makeCsvArr(csvfile, 'General');
            let msgArray = makeCsvArr(csvfile, 'MSG');
            let iffyArray = makeCsvArr(csvfile, 'Iffy');
            let containsGeneralArray = makeCsvArr(csvfile, 'ContainsGeneral');
            let containsMSGArray = makeCsvArr(csvfile, 'ContainsMSG');
            let containsIffyArray = makeCsvArr(csvfile, 'ContainsIffy');
                
            //This activates on the click of the "is it safe" button, that takes the input and loops through each array to check for triggers.
            check.onclick = function () {
                let arrIngred = makeArr();
                console.log(arrIngred);
                clearresults();
                changeButton();
                console.log('ingredients have been submitted');
                findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray);
            };
        }
    });
};


//This links to the csv file and calls the main function to make the app run. 

let csvpath = "./Resources/database.csv";
myMainFun(csvpath);