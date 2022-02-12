//This function clears results so that another list of ingredients can be checked
function clearResults() {
    // console.log('the form has been reset');
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

export { clearResults };