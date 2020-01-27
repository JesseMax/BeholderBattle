    //Math.floor(Math.random() * ((y-x)+1) + x)
    // x = 2, y = 10
    //whole number between 2 & 10

//global variables
//var ui = SpreadsheetApp.getUi();
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
var characterNameSheet = ss.getSheetByName("Characters");


function grabValues (sheetName) {   
    
    var sheetByName = ss.getSheetByName(sheetName);
    var range = sheetByName.getDataRange();
    var values = range.getValues();
    //Logger.log(values)
    return values;
}



// Create menu options
//#####################################################################

function onOpen() {
  ss.addMenu('Bracket Maker 2',
             [{name: 'Create Bracket', functionName: 'createBracket'}]);
  //var menu = ui.createMenu('Bracket Maker');
  //var item = menu.addItem('Create Bracket', 'createBracket');
  //item.addToUi();
}



// Function to choose which character is attacked
//#####################################################################


function getCharacter() {
  
  //Get data from Main Table
  var mainSheetArray = grabValues('Main');
  
  // How many CharacterNames? (determined by row count -1)
  var characterRange = characterNameSheet.getDataRange();
  var lastCharacterRow = characterRange.getLastRow();

  // Create Array with the row# of each available Character
  var eligibleCharacterArray = new Array();
  
  var j; 
  for (j = 1; j < lastCharacterRow; j++) {
    if (mainSheetArray[j][0]) {
    eligibleCharacterArray.push(j);
    }    
  }
  
  // Pick Random Number (0 to arraylength -1)
  var myPick = Math.floor(Math.random() * (eligibleCharacterArray.length) + 0);
  var characterRow = eligibleCharacterArray[myPick];
    
  return characterRow;
  
}



// Main function for running the attack
//#####################################################################

function makeAttacks() {
  
//  var rangeData = sheet.getDataRange();
//  var lastColumn = rangeData.getLastColumn();
//  var lastRow = rangeData.getLastRow();
//  var searchRange = sheet.getRange(1,1, lastRow, lastColumn);
//  var characterNameSheet = ss.getSheetByName("Characters");
//  var eyeRaySheet = ss.getSheetByName("Eye Rays");
  
//  choose character
  var chosenCharacter = getCharacter();
  
// THIS IS WHERE I STOPPED............................  
  //ui.alert(chosenCharacter);
  var characterName = characterNameSheet.getRange(chosenCharacter, 1).getDisplayValue();
  
 
  
  //first attack
  var firstAttack = eyeRayUsed();
  var rayName = eyeRaySheet.getRange(firstAttack, 1).getDisplayValue();
  var firstAttackCell = sheet.getRange(chosenCharacter, 3);
  var firstAttackDmgCell = sheet.getRange(chosenCharacter, 4);
  firstAttackCell.setValue(rayName);
  
  var raySave = eyeRaySheet.getRange(firstAttack, 4).getDisplayValue();
  var rayDescription = eyeRaySheet.getRange(firstAttack, 6).getDisplayValue();
  
  //6,10,11
    if (firstAttack == 4) {
    var myDmg = getDamage (10,90);
    //display damage in cell
    //firstAttackDmgCell.setValue(myDmg);
  }
  
  if (firstAttack == 6) {
    var myDmg = getDamage (8,64);
    //display damage in cell
    //firstAttackDmgCell.setValue(myDmg);
  }
    if (firstAttack == 10) {
    var myDmg = getDamage (10,80);
    //display damage in cell
    //  firstAttackDmgCell.setValue(myDmg);
  }
    if (firstAttack == 11) {
    var myDmg = getDamage (10,100);
    //display damage in cell
      firstAttackDmgCell.setValue(myDmg);
  }
  
  
  var response = ui.alert(characterName + " make a " + raySave, characterName + " is targeted by " + rayName + " ray.\r\n\r\n" + rayDescription + "\r\nDid they Save?", ui.ButtonSet.YES_NO);
  
// Process the user's response.
if (response == ui.Button.YES) {
  //half damage if any
  if (!isNaN(myDmg)) {
    //ui.alert(myDmg);
    myDmg = Math.floor(myDmg/2);
    ui.alert(characterName + " takes " + myDmg + " damage.");
  }
  
  else {
    myDmg = "safe";
    ui.alert("The beholder is sad.");
  }
}
  
if (response == ui.Button.NO) {
  //ui.alert("NO!");
  if (!isNaN(myDmg)) {
    //var failedSaveAlert = characterName + " takes " + myDmg + " damage.";
    ui.alert(characterName + " takes " + myDmg + " damage.");
  }
  else {
    switch (rayName) {
    case 'Confusion':
      var failedSaveAlert = characterName + " is confused. They should roll a d10 at the start of their turn.";
      myDmg = "confused";
        break;
    case 'Paralyzing':
      var failedSaveAlert = characterName + " is paralyzed for 1 minute. Roll a DC16 Con Save at the end of their turn.";
      myDmg = "paralyzed";
        break;
    case 'Slowing':
      var failedSaveAlert = characterName + "'s speed is halved for 1 minute. In addition, they can't take reactions, and can take either an action or a bonus action on their turn, not both. Roll a DC16 Dex Save at the end of their turn.";
      myDmg = "Slowed";
        break; 
    case 'Telekinetic':
      var failedSaveAlert = characterName + "'s moved up to 30'. They are also restrained by the ray's telekinetic grip until the start of the beholder's next turn.";
      myDmg = "held";
      break; 
    case 'Polymorph':
      var failedSaveAlert = characterName + "";
      myDmg = "Polymorph";
      break; 
    case 'Petrification':
      var failedSaveAlert = characterName + "";
      myDmg = "Petrification";
      break;     
    default:
      failedSaveAlert = characterName + " takes " + myDmg + " damage.";
    }
    ui.alert(failedSaveAlert);
    }
  //ui.alert("Do the thing.");
            // ui.alert(failedSaveAlert);
}
  //}
  
    
  
  firstAttackDmgCell.setValue(myDmg);
  
  
  // Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
// user can also close the dialog by clicking the close button in its title bar.

//var response = ui.prompt('Getting to know you', 'May I know your name?', ui.ButtonSet.YES_NO);

// Process the user's response.
//if (response.getSelectedButton() == ui.Button.YES) {
  //Logger.log('The user\'s name is %s.', response.getResponseText());
//} else if (response.getSelectedButton() == ui.Button.NO) {
//  Logger.log('The user didn\'t want to provide a name.');
//} else {
//  Logger.log('The user clicked the close button in the dialog\'s title bar.');
//}
  
    //choose Attack 
  //check to make sure its unique
  
}







//Function to choose which Eye Ray is used in attack
//#####################################################################

function eyeRayUsed() {

  var rangeData = sheet.getDataRange();
  var lastColumn = rangeData.getLastColumn();
  var lastRow = rangeData.getLastRow();
  var searchRange = sheet.getRange(1,1, lastRow, lastColumn);
  var eyeRaySheet = ss.getSheetByName("Eye Rays");
  
      //Math.floor(Math.random() * ((y-x)+1) + x)
    // x = 2, y = 10
    //whole number between 2 & 10
  
  var myPick = Math.floor(Math.random() * ((11 - 2) + 1) + 2);
  //var rayName = eyeRaySheet.getRange(myPick, 1).getDisplayValue();
  
  var rayName = myPick;
  
  return rayName;
  
}

function getDamage (low, high) {
        //Math.floor(Math.random() * ((y-x)+1) + x)
    // x = 2, y = 10
    //whole number between 2 & 10
  
  var myDmgRoll = Math.floor(Math.random() * ((high - low) + 1) + low);
  
  return myDmgRoll;
}

function createArray () {
 //remember indices start with 0
  //go to array.length - 1
  
  var firstArray = [12,1,20];
  var secondArray = new Array("Apples", "Ban", "etc");
  
  //Better practice to add to array
  var x = new Array();
  x.push("something");
  x.push("something2");
  Logger.log(x.length);
  //pop to remove end, shift to remove beginning
  //unshift adds to beginning
  
  //other stuff https://www.youtube.com/watch?v=TNedcpz3Phw (Timothy James)
}
