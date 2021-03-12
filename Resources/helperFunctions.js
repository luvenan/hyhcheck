//This file contains the helper functions used in main.js

//This function checks for triggers. It loop through both arrays, find common items, create third array, check if any triggers. If none, say it is safe. If some, return message saying it is unsafe with trigger list, with three possible categories: general triggers, msg, and iffy ingredients.

function findTriggers(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray) {
    let noTriggerCounter = 5;
    
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
            if (arrIngred[i].indexOf(containsGeneralArray[j]) !== -1 && arrIngred[i].indexOf('nutmeg') === -1 && arrIngred[i].indexOf('coconut') === -1 && arrIngred[i].indexOf('butternut') === -1) {
                generalTriggers.push(arrIngred[i]);
            };
        };
    };

    if (generalTriggers.length > 0) {
        //removes duplicate values in the array
        generalTriggers = generalTriggers.filter((a,b) => generalTriggers.indexOf(a) === b)
        document.getElementById('notsafe').hidden = false;
        document.getElementById('notsafegen').hidden = false;
        let stringGen = generalTriggers.join(', ')
        document.getElementById('gentriggers').innerHTML = stringGen + '.';
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no general triggers');
        console.log(noTriggerCounter);
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
        //removes duplicate values in the array
        msgTriggers = msgTriggers.filter((a,b) => msgTriggers.indexOf(a) === b)
        document.getElementById('notsafe').hidden = false;
        document.getElementById('notsafemsg').hidden = false;
        let stringMsg = msgTriggers.join(', ')
        document.getElementById('msgtriggers').innerHTML = stringMsg + '.';
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no msg triggers');
        console.log(noTriggerCounter);
    };

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
        //removes duplicate values in the array
        iffyTriggers = iffyTriggers.filter((a,b) => iffyTriggers.indexOf(a) === b)
        document.getElementById('iffysafety').hidden = false;
        let stringIffy = iffyTriggers.join(', ')
        document.getElementById('iffytriggers').innerHTML = stringIffy + '.';
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no iffy triggers');
        console.log(noTriggerCounter);
    };
    
    //Adds the tea exception
    
    if (arrIngred.indexOf('tea') !== -1) {
        document.getElementById('teaexception').hidden = false;   
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no tea');
        console.log(noTriggerCounter);
    };
    

     //Adds the coffee exception
     
    if (arrIngred.indexOf('coffee') !== -1) {
        document.getElementById('coffeeexception').hidden = false;   
    } else {
        noTriggerCounter -= 1;
        console.log('This product has no coffee');
        console.log(noTriggerCounter);
    };
    


    //If all ingredient checks come out negative, then the product is safe. This releases the safe message.
    if (noTriggerCounter === 0){
        console.log('This product is safe!');
        document.getElementById('safe').hidden = false;
    };
};
