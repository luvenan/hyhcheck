//JS code for the HYH checker

//This function turns everything lower case, turns the input into an array of triggers, dividing up by ', ', then turns them into singular (with possible mistakes for irregular plurals) 

function makeArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let splitArr = ingredlower.split(', ');
    //Adds exceptions to non-standard plurals so that when I make them singular, this will be done correctly
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

//This adds a variable to the "Is it safe" button
const check = document.getElementById('checkbutton');

//This function clears the results when a new value is submitted

function clearresults() {
    console.log('the form has been reset');
    document.getElementById('safe').hidden = true;
    document.getElementById('notsafe').hidden = true;
    document.getElementById('notsafegen').hidden = true;
    document.getElementById('notsafemsg').hidden = true;
    document.getElementById('iffysafety').hidden = true;
    document.getElementById('teaexception').hidden = true;
    document.getElementById('coffeeexception').hidden = true; 
};

//This function changes the button from "is it safe?" to "check more", changes its styling, and ressets the results

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
                clearresults();
                changeButton();
                console.log('ingredients have been submitted');
                findTriggers(makeArr(), generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray);

            };
        }
    });
};


//This links to the csv file and calls the main function to make the app run. 

let csvpath = "./Resources/database.csv"
myMainFun(csvpath);


//This is a testing tool, allowing me to upload the csv file directly from my desktop computer without uploading everything to github. It won't feature in the final version. 
//let csvpath = document.getElementById('upload-csv').files[0]
let btn_upload = document.getElementById("btn-upload-csv").addEventListener('click', function () {
        Papa.parse(document.getElementById('upload-csv').files[0], {
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
                    clearresults();
                    changeButton();
                    console.log('ingredients have been submitted');
                    findTriggers(makeArr(), generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray);
                };
            }
        });
});