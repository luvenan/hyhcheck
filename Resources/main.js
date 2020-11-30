//JS code for the HYH checker

//This function turns the input into an array of triggers, dividing up by ', ', also turn everything lowercase.

function makeArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let arrIngred1 = ingredlower.split(', ');
    return arrIngred1;
};

//Short trigger list to test functionality
let triggerList = ['peanut', 'almond', 'msg', 'orange', 'soy sauce', 'banana', 'chocolate'];


//This function checks for triggers. It loop through both arrays, find common items, create third array, check if any triggers. If none, say it is safe. If some, return message saying it is unsafe with trigger list.

function findTriggers(arr1, arr2) {
    let foundTriggers = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                foundTriggers.push(arr1[i]);
            };
        };
    };
    if (foundTriggers.length === 0) {
        document.getElementById('safe').hidden = false;
        document.getElementById('notsafe').hidden = true;
        console.log('this product is safe')
    } else {
        document.getElementById('safe').hidden = true;
        document.getElementById('notsafe').hidden = false;
        let stringTriggers = foundTriggers.join(', ')
        console.log('this product has these triggers: ' + stringTriggers);
        document.getElementById('listoftriggers').innerHTML = stringTriggers;
    }
    return foundTriggers;
};


//This creates a variable for the button, then creates an event listener when the button is pressed, then it triggers the functions I need. In the end it changes the button to reset.

const check = document.getElementById('checkbutton');

check.onclick = function() {
    console.log('ingredients have been submitted')
    findTriggers(makeArr(), triggerList);
    check.hidden = true;
    reset.hidden = false;
}

//This creates a variable, then an event listener, then resets the values in the textform which should reset the textbox and the results that appeared at first.

const reset = document.getElementById('resetbutton');

reset.onclick = function() {
    console.log('the form has been reset')
    let textarea = document.getElementById('textbox');
    textarea.value = "";
    check.hidden = false;
    reset.hidden = true;
    document.getElementById('safe').hidden = true;
    document.getElementById('notsafe').hidden = true;

}



//This reads a csv file in javascript, turns it into an array or uses it to populate an array that will be part of the loop that will provide different answers, according to flowchart I will build. Step 1 - figure out how to import Csv here, and how to access different columns in it. Or excel sheets. Or something else. To be determined. 

Papa.parse('./Resources/test.csv', {
    download: true,
    header: false,
    complete: function(csvfile){
      console.log(csvfile)
      csvfile.data.map((data, index)=> {
        let table = document.getElementById('tbl-data');
        generateTableHead(table, data);
      })
    }
  })
});

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

//let thefile = $.get('./Resources/test.csv', test2)



/*Papa.parse(thefile, {
    download: true,
    header: false,
    complete: function(csvfile){
      console.log(csvfile)
      }
    });
*/


//For later, trigger area, divided by categories, may change 
/*
let msg = [];
let processedMeats = [];
let dairy = [];
let nuts = [];
let fruits = [];
let vegetables = [];
let freshYeast = [];
let sugarSubs = [];
let others = [];
*/