/* 1.You are building a feature rollout system for a startup where a FeatureToggle constructor function has properties: featureName (string), isEnabled (boolean), and userGroupAccess (array of strings like "betaTesters", "admins"), and you must use a prototype method canAccess(userRole) to return true or false, a method toggleFeature(flag) to enable or disable the feature, and simulate access attempts using if-else and switch statements for different roles. */


function FeatureToggle(featureName, isEnabled, userGroupAccess) {
  this.featureName = featureName;
  this.isEnabled = isEnabled;
  this.userGroupAccess = userGroupAccess;
}

FeatureToggle.prototype.canAccess = function(userRole) {
  if (this.isEnabled) {
    switch (userRole) {
      case 'admin':
      case 'betaTesters':
      case 'user':
        return this.userGroupAccess.includes(userRole);
      default:
        return false;
    }
  }
  return false;
};

FeatureToggle.prototype.toggleFeature = function(flag) {
  this.isEnabled = flag;
};

const darkMode = new FeatureToggle("Dark Mode", false, ["betaTesters", "admins"]);
console.log(darkMode.canAccess("betaTesters"));
darkMode.toggleFeature(true);
console.log(darkMode.canAccess("betaTesters"));
console.log(darkMode.canAccess("user"));       


/* 2. In a freelancer time-tracking platform, create a TimeLog constructor function with properties: freelancerName (string), projectDetails (object with name and hourlyRate), and logs (array of objects with date, hoursWorked), then add prototype methods to calculate total earnings, filter logs by date range, and determine if weekly hours exceed 40 using if-else logic. */


function TimeLog(freelancerName, projectDetails, logs) {
  this.freelancerName = freelancerName;
  this.projectDetails = projectDetails;
  this.logs = logs;
}

TimeLog.prototype.calculateTotalEarnings = function() {
  return this.logs.reduce((total, log) => total + log.hoursWorked * this.projectDetails.hourlyRate, 0);
};

TimeLog.prototype.filterLogsByDate = function(startDate, endDate) {
  return this.logs.filter(log => log.date >= startDate && log.date <= endDate);
};

TimeLog.prototype.weeklyLimitExceeded = function() {
  const totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
  if (totalHours > 40) {
    return true;
  } else {
    return false;
  }
};

const timeLog = new TimeLog("Alice", { name: "Website", hourlyRate: 20 }, [
  { date: "2025-05-01", hoursWorked: 8 },
  { date: "2025-05-02", hoursWorked: 9 },
  { date: "2025-05-03", hoursWorked: 10 }
]);

console.log(timeLog.calculateTotalEarnings());  
console.log(timeLog.weeklyLimitExceeded());     


/*3. You are developing a startup’s order management system where an Order constructor function should contain customer (object with name and email), items (array of objects with productName, quantity, and unitPrice), and status (string), then implement prototype methods to compute total cost, update order status based on payment, and categorize order urgency using switch and conditional statements. */


function Order(customer, items, status) {
  this.customer = customer;
  this.items = items;
  this.status = status;
}

Order.prototype.computeTotalCost = function() {
  return this.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
};

Order.prototype.updateStatus = function(isPaid) {
  this.status = isPaid ? "Paid" : "Pending";
};

Order.prototype.categorizeUrgency = function() {
  let urgency;
  const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
  switch (true) {
    case (itemCount > 10):
      urgency = "High";
      break;
    case (itemCount > 5):
      urgency = "Medium";
      break;
    default:
      urgency = "Low";
  }
  return urgency;
};

const order = new Order({ name: "John", email: "john@example.com" }, [
  { productName: "Pen", quantity: 2, unitPrice: 1 },
  { productName: "Notebook", quantity: 5, unitPrice: 3 }
], "Pending");

order.updateStatus(true);
console.log(order.computeTotalCost()); 
console.log(order.categorizeUrgency());


/* 4. In a startup’s employee review tool, design an Employee class with properties: id (number), name (string), performanceMetrics (object with keys like communication, efficiency, and reliability), and feedback (array of strings), then use prototypes to calculate an average score, classify performance level using control flow, and add new feedback based on conditions. */


class Employee {
    constructor (id, name, performanceMetrics, feedback){
        this.id = id;
        this.name = name;
        this.performanceMetrics = performanceMetrics;
        this.feedback = feedback;
    }
}

Employee.prototype.calculateAverageScore = function() {
  const scores = Object.values(this.performanceMetrics);
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

Employee.prototype.classifyPerformance = function() {
  const avg = this.calculateAverageScore();
  if (avg >= 4.5) return "Excellent";
  else if (avg >= 3.5) return "Good";
  else return "Needs Improvement";
};

Employee.prototype.addFeedback = function(newFeedback) {
  if (newFeedback && newFeedback.length > 5) {
    this.feedback.push(newFeedback);
  }
};

const emp = new Employee(101, "Sophie", { communication: 4, efficiency: 5, reliability: 4.5 }, []);
emp.addFeedback("Great team player.");
console.log(emp.classifyPerformance()); 


/* 5. Build a simple e-learning system where a Course class has properties: title (string), instructor (object with name and expertise), and students (array of objects with name and completionStatus), then add prototype methods to return names of students who completed the course, count enrolled students by expertise area, and use control flow to output different messages for instructors with more or less than 5 students.*/


class Course {
    constructor(title, instructor, students){
        this.title = title;
        this.instructor = instructor;
        this.students = students;
    }
}

Course.prototype.getCompletedStudents = function() {
  return this.students.filter(s => s.completionStatus).map(s => s.name);
};

Course.prototype.countByExpertise = function(area) {
  return this.instructor.expertise === area ? this.students.length : 0;
};

Course.prototype.instructorMessage = function() {
  const count = this.students.length;
  if (count >= 5) {
    console.log(`${this.instructor.name} has a strong student base.`);
  } else {
    console.log(`${this.instructor.name} could use more students.`);
  }
};

const course = new Course("JS Basics", { name: "Mark", expertise: "Frontend" }, [
  { name: "Abe", completionStatus: true },
  { name: "Ben", completionStatus: false },
  { name: "Cara", completionStatus: true }
]);
course.instructorMessage(); 
console.log(course.getCompletedStudents());

