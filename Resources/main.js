//JS code for the HYH checker

//This function turns the input into an array of triggers, dividing up by ', ', also turn everything lowercase.

function makeArr() {
    let ingredients = document.getElementById('textbox').value;
    let ingredlower = ingredients.toLowerCase();
    let arrIngred = ingredlower.split(', ');
    return arrIngred;
};


//This reads a csv file in javascript uses it to populate an array that will be part of the loop that will provide different answers, according to flowchart I will build. 

let plotcsv = document.getElementById('plotcsv')
let btn_upload = document.getElementById('btn-upload-csv').addEventListener('click', ()=> {
  console.log('clicked')
  Papa.parse(document.getElementById('upload-csv').files[0], {
    download: true,
    header: true,
    complete: function(csvfile){
     // console.log(csvfile)
     // console.log(csvfile.data[0].MSG);
      
      // Selects the property general triggers in each array and makes another array with only the general triggers items
      let generalArray = [];
      for (let i=0; i<csvfile.data.length; i++) {
          generalArray.push(csvfile.data[i].General)
      };
      console.log(generalArray)
      
      //Selects the property msg in each array and makes another array with only the msg items
      let msgArray = [];
      for (let i=0; i<csvfile.data.length; i++) {
          msgArray.push(csvfile.data[i].MSG)
      };
      console.log(msgArray)
         
      // Selects the property iffy ingredients in each array and makes another array with only the general triggers items
      let iffyArray = [];
      for (let i=0; i<csvfile.data.length; i++) {
        iffyArray.push(csvfile.data[i].Iffy)
       };
       console.log(iffyArray)
    
    plotcsv.innerHTML = 'General triggers: ' + generalArray + ';' + ' Msg: ' + msgArray +';' + ' Iffy: ' + iffyArray + ';'
  }
    })
  });



/*let csvresult = Papa.parse('./Resources/test.csv', {
    download: true,
    header: true,
    complete: function(csvfile){
      console.log(csvfile)
    }
  });
  */





//This function checks for triggers. It loop through both arrays, find common items, create third array, check if any triggers. If none, say it is safe. If some, return message saying it is unsafe with trigger list.

//Short trigger list to test functionality


function findTriggers(arrIngred, generalArray, msgArray, iffyArray) {
    let noTriggerCounter = 3;
    
    //Sample loops
    /*
    let triggerList = ['peanut', 'almond', 'msg', 'orange', 'soy sauce', 'banana', 'chocolate'];
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
    */

  //If statement for general triggers
    let generalTriggers = [];
    for (let i = 0; i < arrIngred.length; i++) {
        for (let j = 0; j < generalArray.length; j++) {
            if (arr1[i] === arr2[j]) {
                generalTriggers.push(arrIngred[i]);
            };
        };
    };

    if (generalTriggers.length > 0) {
        document.getElementById('safe').hidden = true;
        document.getElementById('notsafe').hidden = false;
        
        //Edit on the HTML this part
        let stringGen = generalTriggers.join(', ')
        document.getElementById('gentriggers').innerHTML = stringGen;
    } else {
        noTriggerCounter -= 1;
        console.log(noTriggerCounter)
    }

};


//This creates a variable for the button, then creates an event listener when the button is pressed, then it triggers the functions I need. In the end it changes the button to reset.

const check = document.getElementById('checkbutton');

check.onclick = function() {
    console.log('ingredients have been submitted')
    findTriggers(makeArr(), generalArray, msgArray, iffyArray);
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