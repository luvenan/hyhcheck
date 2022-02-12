//Imports modules to make arrays of triggers found in igredient list
import { makeArrTriggers, makeArrCheeseTriggers } from './makeArrTriggers.js';

//Declares initial state of noTriggerCounter, to be used by all three functions below
let noTriggerCounter = 10;

//This function checks the ammount of trigger ingredients and fires the appropriate messages in the app. 
function findTriggers(triggerArr, triggerType, triggerTypeId, triggerListId) {
    //Checks if array has ingredients and if it should release a 'not allowed' message
    if(triggerType !== 'Iffy' && triggerType !== 'FreshCheese' && triggerType !== 'IffyCheese' && triggerType !=='SpecialCheese' &&  typeof triggerArr !== undefined && triggerArr.length > 0) {
        document.getElementById('notsafe').hidden = false;
    };
 
    //Shows message about the type of trigger it is and list the triggers
    if(triggerArr.length > 0) {
        document.getElementById(triggerTypeId).hidden = false;
        let triggerStr = triggerArr.join(', ')
        document.getElementById(triggerListId).innerHTML = triggerStr;

    //Updates the trigger counter    
    } else if (triggerType !== 'FreshCheese') {
        //console.log('This product has no ' + triggerType + ' triggers.')
        noTriggerCounter -= 1;
        //console.log(noTriggerCounter);
    }

    //Shows cheese exception text if it is contains cheese
    if((triggerType === 'FreshCheese' || triggerType === 'AgedCheese' || triggerType === 'IffyCheese' || triggerType === 'SpecialCheese' ) && typeof triggerArr !== undefined && triggerArr.length > 0) {
        document.getElementById('cheeseexception').hidden = false;
        //Loops through cheeses, identifies if any fall into the exception list, and if so, shows the exception text.
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
        };
    };


    //Makes sure iffy safety is only shown if "not allowed" is hidden and if the array still has items, then release the iffy message if the type is iffy. 
    if(document.getElementById('notsafe').hidden === false) {
        document.getElementById('iffysafety').hidden = true;
    } else if ((triggerType === 'Iffy' || triggerType === 'IffyCheese' || triggerType === 'SpecialCheese') && typeof triggerArr !== undefined && triggerArr.length > 0) {
        document.getElementById('iffysafety').hidden = false;
    };
};


// Exception function, to be called with each ingredient that is in the special cases list
function findException(arrIngred, ingredient, id) {
    let isException = false;
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < ingredient.length; j++) {
            if (arrIngred[i].indexOf(ingredient[j]) !== -1) {
                //console.log('I found ' + ingredient);
                isException = true;
            };
        };
    };
    
    if (isException === true) {
        //console.log('is Exception is true')
        document.getElementById(id).hidden = false;
        if(document.getElementById('notsafe').hidden === false) {
             document.getElementById('iffysafety').hidden = true;
        } else {
            document.getElementById('iffysafety').hidden = false;
        }
    } else {
        //console.log('isException is false')
        noTriggerCounter -= 1;
        //console.log(`This product has no ${[...ingredient]}!`);
        //console.log(noTriggerCounter);
    };
};


//This function checks for triggers and releases a message with the results

function isItAllowed(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray, freshCheeseArray, agedCheeseArray, iffyCheeseArray, specialCheeseArray) {
    //Resets noTriggerCounter to 10
    noTriggerCounter = 10;
    
    //Checks for triggers in arrIngred and makes arrays with each type of trigger found
    const generalTriggers = makeArrTriggers(arrIngred, generalArray, containsGeneralArray, 'General');
    const msgTriggers = makeArrTriggers(arrIngred, msgArray, containsMSGArray, 'MSG');
    const iffyTriggers = makeArrTriggers(arrIngred, iffyArray, containsIffyArray, 'Iffy');

    
    //Checks for cheese triggers in arrIngred and makes arrays which each type of triggers found
    const freshCheeseTriggers = makeArrCheeseTriggers(arrIngred, freshCheeseArray, 'FreshCheese');
    const agedCheeseTriggers = makeArrCheeseTriggers(arrIngred, agedCheeseArray, 'AgedCheese');
    const iffyCheeseTriggers = makeArrCheeseTriggers(arrIngred, iffyCheeseArray, 'IffyCheese');
    const specialCheeseTriggers = makeArrCheeseTriggers(arrIngred, specialCheeseArray, 'SpecialCheese');

    //console.log('The four cheese arrays are: ' + freshCheeseTriggers + ',' + agedCheeseTriggers + ',' + iffyCheeseTriggers + ',' + specialCheeseTriggers)

    //Calls the findTriggers function for each type of trigger
    findTriggers(generalTriggers, 'General',  'notsafegen', 'gentriggers');
    findTriggers(msgTriggers, 'MSG', 'notsafemsg', 'msgtriggers');
    findTriggers(iffyTriggers, 'Iffy',  'iffytext', 'iffytriggers');

    //Calls the findTriggers function for the cheeses
    findTriggers(freshCheeseTriggers, 'FreshCheese', 'freshcheesetext', 'freshcheesetriggers')
    findTriggers(agedCheeseTriggers, 'AgedCheese', 'agedcheesetext', 'agedcheesetriggers')
    findTriggers(iffyCheeseTriggers, 'IffyCheese', 'iffycheesetext', 'iffycheesetriggers')
    findTriggers(specialCheeseTriggers, 'SpecialCheese', 'specialcheesetext', 'specialcheesetriggers')

    //Calls exception function for each exception
    findException(arrIngred, ['tea'], 'teaexception');
    findException(arrIngred, ['coffee'], 'coffeeexception');
    findException(arrIngred, ['soy'], 'soyexception');
    findException(arrIngred, ['yeast'], 'yeastexception');

    //If all ingredient checks come out negative, then the product is safe. This releases the safe message
    if (noTriggerCounter === 0){
        //console.log('This product is safe!');
        document.getElementById('safe').hidden = false;
        document.getElementById('safetext').hidden = false;
    };
};

export { isItAllowed };