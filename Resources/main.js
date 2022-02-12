//JS code for the HYH Diet Ingredient Check
//Imports function that makes the array of ingredients from the textbox
import { makeInputArr, makeCsvArr } from './Modules/makeArr.js';
//Imports the check global variable, the changeButton function that changes it from "is it safe" to "check more" and the function that enables the button once something is typed in the textbox
import { check, changeButton, enableButton} from './Modules/checkButton.js'
//Imports the function that clears the results to check a new round of ingredients
import { clearResults } from './Modules/clearResults.js';
//Imports the function that checks through each trigger and determines if it is allowed or not, releasing the appropriate messages.
import { isItAllowed } from './Modules/isItAllowed.js';

//Calls the function that enables the check button once something is typed in the textbox
enableButton();

//This function reads the csv file in javascript uses it to populate the arrays, then adds an event listener to clicking the is it safe button and gives the results.
function myMainFun(csvpath) {
    Papa.parse(csvpath, {
        download: true,
        header: true,
        complete: function (csvfile) {
            //console.log(csvfile);
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
                //console.log(document.getElementById('textbox').value)
                let arrIngred = makeInputArr();
                //console.log(arrIngred);
                clearResults();
                changeButton();
                //console.log('ingredients have been submitted');
                //This adds a setTimeout function in order to have a delay in the response when clicking on "check more", this gives the user the understanding that the ingredients that they have typed have been processed by the app and the answer is accurate. 
                setTimeout(function(){isItAllowed(arrIngred, generalArray, msgArray, iffyArray, containsGeneralArray, containsMSGArray, containsIffyArray, freshCheeseArray, agedCheeseArray, iffyCheeseArray, specialCheeseArray);}, 300);
            };
        }
    });
};

//This links to the csv file and calls the function that checks for triggers when the check button is clicked
const csvpath = "./Resources/database.csv";
myMainFun(csvpath);