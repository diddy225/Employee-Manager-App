const state = {
  ifMatch: '',
  command: '',
  input: $('#input'),
  inputOfficeNum: $('#office'),
  inputPhoneNum: $('#phone'),
  employeeList: [
    {
      name: 'Jan',
      officeNum: 1,
      phoneNum: '222-222-2222'
    },
    {
      name: 'Juan',
      officeNum: 304,
      phoneNum: '489-789-8789'
    },
    {
      name: 'Margie',
      officeNum: 789,
      phoneNum: '789-789-7897'
    },
    {
      name: 'Sara',
      officeNum: 32,
      phoneNum: '222-789-4654'
    },
    {
      name: 'Tyrell',
      officeNum: 3,
      phoneNum: '566-621-0452'
    },
    {
      name: 'Tasha',
      officeNum: 213,
      phoneNum: '789-766-5675'
    },
    {
      name: 'Ty',
      officeNum: 211,
      phoneNum: '789-766-7865'
    },
    {
      name: 'Sarah',
      officeNum: 345,
      phoneNum: '222-789-5231'
    }
  ],
  render: function(htmlStr){
    $('.content').html(htmlStr);
  }
};

const runCommand = function(e){
e.preventDefault();
  
  switch (state.command){ 
    case 'print':  /*PRINT*/ 
      let printMsg = '';
      state.employeeList.forEach(e => printMsg += `<p>${e.name}<br/>${e.officeNum}<br/>${e.phoneNum}</p>`);
      state.render(printMsg);
      break;

    case 'verify':/* VERIFY */
      let verifyFound = state.employeeList.find(e => e.name.toLowerCase() === state.input.val().toLowerCase()); 
      verifyFound ? state.render('Employee Found'): state.render('No Employee Found');
      break;

    case 'lookup': /* LOOKUP */
      const lookupFound = state.employeeList.find(e => e.name.toLowerCase() === state.input.val().toLowerCase());
      lookupFound ? state.render(`<p>${lookupFound.name}<br/>${lookupFound.officeNum}<br/>${lookupFound.phoneNum}</p>`) : state.render('No Employee Found');
      break;

    case 'contains': /* CONTAINS */
      let containsMsg = '';
      if(state.input.val()){
        state.employeeList.filter(e => e.name.toLowerCase().includes(state.input.val().toLowerCase()))
          .forEach(e => containsMsg += `<p>${e.name}<br/>${e.officeNum}<br/>${e.phoneNum}</p>`);
        state.render(containsMsg || 'No Employee Found');
      }else{
        state.render('No Employee Found');
      }
      break;

    case 'update': /* UPDATE */
    const updateFound = state.employeeList.find(e => e.name.toLowerCase() === state.input.val().toLowerCase());
    if(state.input.val() && updateFound !== undefined){
      if(state.inputOfficeNum.val()){
        updateFound.officeNum = state.inputOfficeNum.val();
      }
      if(state.inputPhoneNum.val()){
        updateFound.phoneNum = state.inputPhoneNum.val();
      } 
      state.render(`<p>${updateFound.name}<br/>${updateFound.officeNum}<br/>${updateFound.phoneNum}</p>`);
    }else{
      state.render('No Employee Found');
    }
    break;
    
    case 'add': /* ADD */
    const addEmployee = {};
    if(state.input.val() && state.inputOfficeNum.val() && state.inputPhoneNum.val()){
      addEmployee.name = state.input.val().charAt(0).toUpperCase() + state.input.val().slice(1);;
      addEmployee.officeNum = state.inputOfficeNum.val();
      addEmployee.phoneNum = state.inputPhoneNum.val();
      state.employeeList.push(addEmployee);
      state.render(`<p>${addEmployee.name}<br/>${addEmployee.officeNum}<br/>${addEmployee.phoneNum}</p>`);
    } else {
      state.render('Form Incomplete ')
    }
    break;

    case 'remove': /* DELETE */
    const removeMatch = state.employeeList.find(e => e.name.toLowerCase() === state.input.val().toLowerCase());
    if(state.input.val() && removeMatch){
      const remove = state.employeeList.splice(state.employeeList.findIndex(e => e.name.toLowerCase() === state.input.val().toLowerCase()),1);
      state.render(`You have removed ${remove[0].name}.`);
    } else{
      state.render('No Employee Found');
    }
  }  
  clearInput(); 
}

const clearInput = function(){
  state.input.val('');
  state.inputOfficeNum.val('');
  state.inputPhoneNum.val('');
}

const print = function(){
  state.command = 'print';
  $('.content').empty();
  $('.inputNum').removeClass('show');
  $('h1').addClass('hide');
  $('form p').addClass('show');
  $('#button').css("display", "inline");
  $('#input').css("display", "none");
  state.render('PRINT DIRECTORY');
  clearInput();
};

const verify = function(){
  state.command = 'verify';
  $('.content').empty();
  $('.inputNum').removeClass('show');
  $('h1').addClass('hide');
  $('form p').addClass('show');
  $('#button').css("display", "inline");
  $('#input').css("display", "inline");
  state.render('VERIFY AN EMPLOYEE');
  clearInput();
}

const lookup = function(){
  state.command = 'lookup';
  $('.content').empty();
  $('.inputNum').removeClass('show');
  $('h1').addClass('hide');
  $('form p').addClass('show');
  $('#button').css("display", "inline");
  $('#input').css("display", "inline");
  state.render('LOOKUP AN EMPLOYEE');
  clearInput();
}

const contains = function(){
  state.command = 'contains';
  $('.content').empty();
  $('.inputNum').removeClass('show');
  $('h1').addClass('hide');
  $('form p').addClass('show');
  $('#button').css("display", "inline");
  $('#input').css("display", "inline");
  state.render('SEARCH BY LETTER');
  clearInput();
}

const update = function(){
  state.command = 'update';
  $('.content').empty();
  $('.inputNum').addClass('show');
  $('h1').addClass('hide');
  $('form p').addClass('show');
  $('#button').css("display", "inline");
  $('#input').css("display", "inline");
  state.render('UPDATE AN EMPLOYEES INFO');
}

const add = function(){
  state.command = 'add';
  $('.content').empty();
  $('.inputNum').addClass('show');
  $('h1').addClass('hide');
  $('form p').addClass('show');
  $('#button').css("display", "inline");
  $('#input').css("display", "inline");
  state.render('ADD AN EMPLOYEE');
}

const remove = function(){
  state.command = 'remove';
  $('.content').empty();
  $('.inputNum').removeClass('show');
  $('h1').addClass('hide');
  $('form p').addClass('show');
  $('#button').css("display", "inline");
  $('#input').css("display", "inline");
  state.render('DELETE AN EMPLOYEE');
}

$('#remove').on('click', remove);
$('#add').on('click', add);
$('#update').on('click', update);
$('#contains').on('click', contains);
$('#lookup').on('click', lookup);
$('#verify').on('click', verify);
$('#print').on('click', print);
$('#button').on('click', runCommand);
