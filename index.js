function createEmployeeRecord (array) {
    let [firstName, familyName, title, payPerHour] = array 
    let jsObj = {
        firstName : firstName,
        familyName : familyName,
        title : title,
        payPerHour : payPerHour,
        timeInEvents : [],
        timeOutEvents : [],
    }
    return jsObj
}

function createEmployeeRecords (array) {
    let newArray = []
    array.forEach ((element) => {
    newArray.push(createEmployeeRecord(element))})
    return newArray
}

function createTimeInEvent (dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let newEvent = {
        type : "TimeIn",
        hour : parseInt(time),
        date : date,
    }
    this.timeInEvents.push(newEvent)
    return this
}

function createTimeOutEvent (dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let newEvent = {
        type : "TimeOut",
        hour : parseInt(time),
        date : date,
    }
    this.timeOutEvents.push(newEvent)
    return this
}

/*function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
  
    if (timeIn && timeOut) {
      const timeInHours = Math.floor(timeIn.hour / 100);
      const timeOutHours = Math.floor(timeOut.hour / 100);
  
      const hoursWorked = timeOutHours - timeInHours;
  
      return hoursWorked;
    }
  
    return 0
  }*/

  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
  

    const timeInHours = timeIn.hour
    const timeOutHours = timeOut.hour

    const hoursWorked = (timeOutHours - timeInHours)/100;
  
      return hoursWorked
  }

  function wagesEarnedOnDate (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;
  
    const payOwed = hoursWorked * payRate;
  
    return payOwed;
  }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
function calculatePayroll(employeeArray) {
    return employeeArray.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor.call(employee);
    }, 0);
  }
  