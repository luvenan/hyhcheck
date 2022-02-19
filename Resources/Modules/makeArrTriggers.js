//This function checks for existing triggers in the igredients list. It loop through both arrays, find common items, and creates third array with the triggers. Then loops through the contains array and adds those to the final array. Then it removes the duplicates that come up.

function makeArrTriggers(arrIngred, propertyArr, containsPropArr, triggerType) {
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

    //Filters for duplicates
    arrTriggers = arrTriggers.filter((a,b) => arrTriggers.indexOf(a) === b);
    // console.log(arrTriggers);

    //Loops through the array of found triggers and removes some false matches. 
    if(triggerType !== 'Iffy') {
        for (let i = 0; i < arrTriggers.length; i++) {
            arrTriggers = arrTriggers.filter((a) => a !== 'nutmeg');
            arrTriggers = arrTriggers.filter((a) => a !== 'butternut');
            arrTriggers = arrTriggers.filter((a) => a !== 'cocoa butter');
            arrTriggers = arrTriggers.filter((a) => a !== 'cacao butter');
            arrTriggers = arrTriggers.filter((a) => a !== 'coconut');
        }; 
    };

    return arrTriggers;
};


//This function checks for cheese ingredients using the contains function
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
    if(cheeseType === 'IffyCheese') {
        arrCheeseTriggers = arrCheeseTriggers.filter((a) => a !== 'blue cheese')
        arrCheeseTriggers = arrCheeseTriggers.filter((a) => a !== 'queso fresco')
    }

    //console.log(arrCheeseTriggers)
    return arrCheeseTriggers; 
};

export { makeArrTriggers, makeArrCheeseTriggers };