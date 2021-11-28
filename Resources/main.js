//JS code for the HYH checker
//This is just a test


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

let noTriggerCounter = 6;

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


//This function checks the ammount of trigger ingredients and fires the appropriate messages in the app. 
function isItSafe(triggerArr, triggerType, triggerTypeId, triggerListId) {
    let newTriggerArr = [];
    if(triggerType !== 'Iffy' && typeof triggerArr !== undefined && triggerArr.length > 0) {
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
        document.getElementById(triggerListId).innerHTML = triggerStr;
        
    } else {
        console.log('This product has no ' + triggerType + ' triggers.')
        noTriggerCounter -= 1;
        console.log(noTriggerCounter);
    }
    if(document.getElementById('notsafe').hidden === false) {
        document.getElementById('iffysafety').hidden = true;
    } else if (triggerType === 'Iffy' && typeof triggerArr !== undefined && triggerArr.length > 0) {
        document.getElementById('iffysafety').hidden = false;
    }
}

//Exception function, to be called with each ingredient that is in the special cases list

function exception(arrIngred, ingredient, id) {
    let isException = false;
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < ingredient.length; j++) {
            if (arrIngred[i].indexOf(ingredient[j]) !== -1) {
                console.log('I found ' + ingredient);
                isException = true;
            };
            };
        };
     
    if (isException === true) {
        console.log('is Exception is true')
        document.getElementById(id).hidden = false;
        if(document.getElementById('notsafe').hidden === false) {
             document.getElementById('iffysafety').hidden = true;
        } else {
            document.getElementById('iffysafety').hidden = false;
        }
    } else {
        console.log('isException is false')
        noTriggerCounter -= 1;
            console.log(`This product has no ${[...ingredient]}!`);
            console.log(noTriggerCounter);
    }
};


//This function checks for triggers and releases a message with the results

function findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray) {
    
    //Checks for triggers in arrIngred and makes arrays with each type of trigger found
    const generalTriggers = makeArrTriggers(arrIngred, generalArray, containsGeneralArray);
    const msgTriggers = makeArrTriggers(arrIngred, msgArray, containsMSGArray);
    const iffyTriggers = makeArrTriggers(arrIngred, iffyArray, containsIffyArray);

    
    //Calls the isItSafe function for each type of trigger

    isItSafe(generalTriggers, 'General',  'notsafegen', 'gentriggers');
    isItSafe(msgTriggers, 'MSG', 'notsafemsg', 'msgtriggers');
    isItSafe(iffyTriggers, 'Iffy',  'iffytext', 'iffytriggers');

    //Calls exception function for each exception
    
    exception(arrIngred, ['tea'], 'teaexception');
    exception(arrIngred, ['coffee'], 'coffeeexception');
    exception(arrIngred, ['soy'], 'soyexception');
    //Future exceptions to create. When the cheese exception is coded, will have to create another line with the right 
    //exception(arrIngred, 'cheese', 'cheeseexception');
     
    //If all ingredient checks come out negative, then the product is safe. This releases the safe message. -- Consider changing the trigger counter to a boolean system
    if (noTriggerCounter === 0){
        console.log('This product is safe!');
        document.getElementById('safe').hidden = false;
        document.getElementById('safetext').hidden = false;
    };
};

//This function clears the results when a new value is submitted

function clearresults() {
    console.log('the form has been reset');
    noTriggerCounter = 6;
    document.getElementById('safe').hidden = true;
    document.getElementById('safetext').hidden = true;
    document.getElementById('notsafe').hidden = true;
    document.getElementById('notsafegen').hidden = true;
    document.getElementById('iffysafety').hidden = true;
    document.getElementById('notsafemsg').hidden = true;
    document.getElementById('iffytext').hidden = true;
    document.getElementById('teaexception').hidden = true;
    document.getElementById('coffeeexception').hidden = true; 
    document.getElementById('soyexception').hidden = true; 
};


//This is an attempt to make the button disabled if no text, but is not successful, try again later. 
/*

console.log(document.getElementById('textbox').value)

function enableButton() {
    if(!document.getElementById('textbox').value.length) { 
         check.disabled = true; 
    } else { 
        check.disabled = false;
    }
}

document.getElementById('textbox').value.keyup= enableButton();
*/

//This function changes the button from "is it safe?" to "check more", changes its styling, and ressets the results

const check = document.getElementById('checkbutton');
function changeButton() {
     document.getElementById('resultsandbutton').style.justifyContent = "space-between";
     check.innerHTML = "CHECK MORE"
     check.style.backgroundColor = "white";
     check.style.color = "#6B3AAF";
     check.style.border = "1px solid #6B3AAF";
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
            //add cheese variables according to columns
            //let freshCheeseArray = makeCsvArr(csvfile, 'freshCheese');
            //let agedCheeseArray = makeCsvArr(csvfile, 'agedCheese');
                
                
            //This activates on the click of the "is it safe" button, that takes the input and loops through each array to check for triggers.
            check.onclick = function () {
                console.log(document.getElementById('textbox').value)
                let arrIngred = makeArr();
                console.log(arrIngred);
                clearresults();
                changeButton();
                console.log('ingredients have been submitted');
                //This adds a setTimeout function in order to have a delay in the response when clicking on "check more", this gives the user the understanding that the ingredients that they have typed have been processed by the app and the answer is accurate. 
                setTimeout(function(){findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray);}, 300);
            };
        }
    });
};


//This links to the csv file and calls the main function to make the app run. 

let csvpath = "./Resources/database.csv";
myMainFun(csvpath);