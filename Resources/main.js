//JS code for the HYH checker

//This function turns everything lower case, turns the input into an array of triggers, dividing up by ', ', then turns them into singular (with possible mistakes for irregular plurals) 

function makeArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let splitArr = ingredlower.split(', ')
    // Here I should verify that the ingredients have been entered in the correct format, but I don't know how to do that yet accounting for the one word or two, or three word ingredients
    // let error = ''
    // if (ingredlower.includes(',')) {
    //     splitArr = ingredlower.split(', ')
    //     console.log('array contains comma')
    // } else {
    //     error = 'Please enter ingredients separated by a comma and one space, eg: banana, apple, peanut'
    // }
    //Adds exceptions to non-standard plurals so that the words match exactly with database
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

let noTriggerCounter = 10;

//This function checks for triggers. It loop through both arrays, find common items, create third array, then loops through the contains array and adds those to the final array. Then it removes the duplicates that come up. This checks if any triggers exist. 
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


//Checks for cheese ingredients using the contains function
function makeArrCheeseTriggers(arrIngred, cheeseArr, cheeseType) {
    let arrCheeseTriggers = [];
        for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < cheeseArr.length; j++) {
            if (arrIngred[i].indexOf(cheeseArr[j]) !== -1) {
                arrCheeseTriggers.push(arrIngred[i]);
            };
        };
    };
    
    arrCheeseTriggers = arrCheeseTriggers.filter((a,b) => arrCheeseTriggers.indexOf(a) === b);

    //Filters out blue cheese in the iffy array - reuse this method for refactoring the nutmeg, etc. issue
    if(cheeseType === 'iffyCheese') {
        arrCheeseTriggers = arrCheeseTriggers.filter((a) => a !== 'blue cheese')
        arrCheeseTriggers = arrCheeseTriggers.filter((a) => a !== 'queso fresco')
    }

    console.log(arrCheeseTriggers)
    return arrCheeseTriggers; 
};



//This function checks the ammount of trigger ingredients and fires the appropriate messages in the app. 
function isItSafe(triggerArr, triggerType, triggerTypeId, triggerListId) {
    let newTriggerArr = [];
    
    //First checks if array has ingredients and if it should release a not allowed message
    if(triggerType !== 'Iffy' && triggerType !== 'FreshCheese' && triggerType !== 'IffyCheese' && triggerType !=='SpecialCheese' &&  typeof triggerArr !== undefined && triggerArr.length > 0) {
        document.getElementById('notsafe').hidden = false;
        
        //Here it loops through the array of found triggers and removes some false matches. I'm not sure this belongs here, might move this on the next refactoring. 
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
    //Shows message about the type of trigger it is
    if(newTriggerArr.length > 0) {
        document.getElementById(triggerTypeId).hidden = false;
        let triggerStr = newTriggerArr.join(', ')
        document.getElementById(triggerListId).innerHTML = triggerStr;

    //Updates the trigger counter    
    } else if (triggerType !== 'FreshCheese') {
        console.log('This product has no ' + triggerType + ' triggers.')
        noTriggerCounter -= 1;
        console.log(noTriggerCounter);
    }

    //Shows cheese exception text if it is cheese
    if((triggerType === 'FreshCheese' || triggerType === 'AgedCheese' || triggerType === 'IffyCheese' || triggerType === 'SpecialCheese' ) && typeof triggerArr !== undefined && triggerArr.length > 0) {
        document.getElementById('cheeseexception').hidden = false;
        for (let i = 0; i < triggerArr.length; i++) {
            if (triggerArr[i].indexOf('feta') !== -1) {
                document.getElementById('feta').hidden = false;
                document.getElementById('iffysafety').hidden = false;
            };
            if (triggerArr[i].indexOf('cheddar') !== -1) {
                document.getElementById('cheddar').hidden = false;
                document.getElementById('iffysafety').hidden = false;
            };
            if (triggerArr[i].indexOf('provolone') !== -1) {
                document.getElementById('provolone').hidden = false;
                document.getElementById('iffysafety').hidden = false;
            };
            if (triggerArr[i].indexOf('monterey jack') !== -1) {
                document.getElementById('monterey-jack').hidden = false;
                document.getElementById('iffysafety').hidden = false;
            };
            if (triggerArr[i].indexOf('pepper jack') !== -1) {
                document.getElementById('pepper-jack').hidden = false;
                document.getElementById('iffysafety').hidden = false;
            };
        }


    }

    //Makes sure iffy safety is only shown if not safe is hidden and if the array still has items, then release the iffy message if the type is iffy. 
    if(document.getElementById('notsafe').hidden === false) {
        document.getElementById('iffysafety').hidden = true;
    } else if ((triggerType === 'Iffy' || triggerType === 'IffyCheese' || triggerType === 'SpecialCheese') && typeof triggerArr !== undefined && triggerArr.length > 0) {
        document.getElementById('iffysafety').hidden = false;
    }

    
}

//Exception function, to be called with each ingredient that is in the special cases list

function exception(arrIngred, ingredient, id) {
    let isException = false;
    let cheeseTriggers = [];
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < ingredient.length; j++) {
            if (arrIngred[i].indexOf(ingredient[j]) !== -1) {
                console.log('I found ' + ingredient);
                isException = true;
                if (id === "cheeseexception") {
                    cheeseTriggers.push(arrIngred[i])
                }
            };
            };

    };
     
    if (id === "cheeseexception") {
        document.getElementById("cheesetriggers").innerHTML = `It looks like you may have cheese as an ingredient: ${cheeseTriggers.join(', ')}`;
    }
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

function findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray, freshCheeseArray, agedCheeseArray, iffyCheeseArray, specialCheeseArray) {
    
    //Checks for triggers in arrIngred and makes arrays with each type of trigger found
    const generalTriggers = makeArrTriggers(arrIngred, generalArray, containsGeneralArray);
    const msgTriggers = makeArrTriggers(arrIngred, msgArray, containsMSGArray);
    const iffyTriggers = makeArrTriggers(arrIngred, iffyArray, containsIffyArray);

    
    //Checks for cheese triggers in arrIngred and makes arrays which each type of triggers found
    const freshCheeseTriggers = makeArrCheeseTriggers(arrIngred, freshCheeseArray, 'freshCheese');
    const agedCheeseTriggers = makeArrCheeseTriggers(arrIngred, agedCheeseArray, 'agedCheese');
    const iffyCheeseTriggers = makeArrCheeseTriggers(arrIngred, iffyCheeseArray, 'iffyCheese');
    const specialCheeseTriggers = makeArrCheeseTriggers(arrIngred, specialCheeseArray, 'specialCheese');

    console.log('The four cheese arrays are: ' + freshCheeseTriggers + ',' + agedCheeseTriggers + ',' + iffyCheeseTriggers + ',' + specialCheeseTriggers)

    //Calls the isItSafe function for each type of trigger

    isItSafe(generalTriggers, 'General',  'notsafegen', 'gentriggers');
    isItSafe(msgTriggers, 'MSG', 'notsafemsg', 'msgtriggers');
    isItSafe(iffyTriggers, 'Iffy',  'iffytext', 'iffytriggers');


    //Calls the isItsafe function for the cheeses
    isItSafe(freshCheeseTriggers, 'FreshCheese', 'freshcheesetext', 'freshcheesetriggers')
    isItSafe(agedCheeseTriggers, 'AgedCheese', 'agedcheesetext', 'agedcheesetriggers')
    isItSafe(iffyCheeseTriggers, 'IffyCheese', 'iffycheesetext', 'iffycheesetriggers')
    isItSafe(specialCheeseTriggers, 'SpecialCheese', 'specialcheesetext', 'specialcheesetriggers')

    //Calls exception function for each exception
    
    exception(arrIngred, ['tea'], 'teaexception');
    exception(arrIngred, ['coffee'], 'coffeeexception');
    exception(arrIngred, ['soy'], 'soyexception');
    exception(arrIngred, ['yeast'], 'yeastexception');
    // exception(arrIngred, cheeseArray, 'cheeseexception');
    
    //Calls cheese exception function

     
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
    noTriggerCounter = 10;
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
    document.getElementById('freshcheesetext').hidden = true; 
    document.getElementById('agedcheesetext').hidden = true; 
    document.getElementById('iffycheesetext').hidden = true;
    document.getElementById('cheeseexception').hidden = true;
    document.getElementById('feta').hidden = true;
    document.getElementById('cheddar').hidden = true;
    document.getElementById('provolone').hidden = true;
    document.getElementById('monterey-jack').hidden = true;
    document.getElementById('pepper-jack').hidden = true;
};







//This enables the button once something is typed in the textbox, disables it if it is removed

const textbox = document.getElementById('textbox')
textbox.addEventListener("keyup", event => {
    if(textbox.value.length !== 0){
        check.disabled = false  
    } else {
      check.disabled = true;
    }
})

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
            let freshCheeseArray = makeCsvArr(csvfile, 'FreshCheese');
            let agedCheeseArray = makeCsvArr(csvfile, 'AgedCheese');
            let iffyCheeseArray = makeCsvArr(csvfile, 'IffyCheese');
            let specialCheeseArray = makeCsvArr(csvfile, 'SpecialCheese');
                
            //This activates on the click of the "is it safe" button, that takes the input and loops through each array to check for triggers.
            check.onclick = function () {
                console.log(document.getElementById('textbox').value)
                let arrIngred = makeArr();
                console.log(arrIngred);
                clearresults();
                changeButton();
                console.log('ingredients have been submitted');
                //This adds a setTimeout function in order to have a delay in the response when clicking on "check more", this gives the user the understanding that the ingredients that they have typed have been processed by the app and the answer is accurate. 
                setTimeout(function(){findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray, freshCheeseArray, agedCheeseArray, iffyCheeseArray, specialCheeseArray);}, 300);
            };
        }
    });
};


//This links to the csv file and calls the main function to make the app run. 

let csvpath = "./Resources/database.csv";
myMainFun(csvpath);