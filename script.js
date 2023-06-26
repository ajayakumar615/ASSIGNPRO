function generateSeatingPlan() {
  var inputGroups = document.getElementsByClassName('input-group');
  var seatingPlan = '';
  var previousStudentCount = 0;

  for (var i = 0; i < inputGroups.length; i++) {
    var departmentInput = inputGroups[i].querySelector('.department');
    var semesterInput = inputGroups[i].querySelector('.semester');
    var studentsInput = inputGroups[i].querySelector('.students');
    var roomNameInput = inputGroups[i].querySelector('.room-name');
    var roomCapacityInput = inputGroups[i].querySelector('.room-capacity');

    var department = departmentInput.value;
    var semester = semesterInput.value;
    var students = parseInt(studentsInput.value);
    var roomName = roomNameInput.value;
    var roomCapacity = parseInt(roomCapacityInput.value);

    if (!department || !semester || !students || !roomName || !roomCapacity) {
      var alertMessage = '<div class="alert"><strong>Alert:</strong> Please fill all the fields!</div>';
      document.getElementById('seating-plan').innerHTML = alertMessage;
      return;
    }

    var seatingArrangement = '';
    var remainingStudents = 0;
    var newRoomSeatingPlan = '';

    if (students > roomCapacity) {
      var remaining = students - roomCapacity;
      var response = prompt(
        'There are ' + remaining + ' students left. Do you want to assign them to a new room? (yes/no)'
      );

      if (response && response.toLowerCase() === 'yes') {
        remainingStudents = remaining;
        var newRoomName = prompt('Enter the name of the new room:');
        var newRoomCapacity = parseInt(prompt('Enter the capacity of S'+ semester+'-' +department+' for the new room:'));

        seatingArrangement = generateSeatingArrangement(roomCapacity, roomCapacity, department, roomName, previousStudentCount);
        newRoomSeatingPlan = generateNewRoomSeatingPlan(remainingStudents, newRoomName, newRoomCapacity, department, previousStudentCount + roomCapacity);
        previousStudentCount += students;
      } else {
        seatingArrangement = generateSeatingArrangement(roomCapacity, roomCapacity, department, roomName, previousStudentCount);
        previousStudentCount += roomCapacity;
      }
    } else {
      seatingArrangement = generateSeatingArrangement(students, roomCapacity, department, roomName, previousStudentCount);
      previousStudentCount += students;
    }

    seatingPlan += '<div class="seating-plan-group">';
    seatingPlan += '<div class="seating-plan-info">';
    seatingPlan += '<strong>Department:</strong> ' + department + '<br>';
    seatingPlan += '<strong>Semester:</strong> ' + semester + '<br>';
    seatingPlan += '<strong>Number of Students:</strong> ' + students + '<br>';
    seatingPlan += '<strong>Room Name:</strong> ' + roomName + '<br>';
    seatingPlan += '<strong>Room Capacity:</strong> ' + roomCapacity + '<br>';
    seatingPlan += '</div>';
    seatingPlan += '<div class="seating-plan-generated">';
    seatingPlan += '<strong>Generated Seating Plan:</strong><br><br>';
    seatingPlan += seatingArrangement;
    seatingPlan += '</div>';
    seatingPlan += '</div>';

    if (remainingStudents > 0) {
      seatingPlan += newRoomSeatingPlan;
    }
  }

  document.getElementById('seating-plan').innerHTML = seatingPlan;
}

function generateNewRoomSeatingPlan(students, roomName, roomCapacity, department, previousStudentCount) {
  var seatingArrangement = '<div class="seating-plan-group">';
  seatingArrangement += '<div class="seating-plan-info">';
  seatingArrangement += '<strong>Room Name:</strong> ' + roomName + '<br>';
  seatingArrangement += '<strong>Room Capacity:</strong> ' + roomCapacity + '<br>';
  seatingArrangement += '</div>';
  seatingArrangement += '<div class="seating-plan-generated">';
  seatingArrangement += '<strong>Generated Seating Plan:</strong><br><br>';

  seatingArrangement += generateSeatingArrangement(students, roomCapacity, department, roomName, previousStudentCount);

  seatingArrangement += '</div>';
  seatingArrangement += '</div>';

  return seatingArrangement;
}

function generateSeatingArrangement(numStudents, roomCapacity, department, roomName, previousStudentCount) {
  var seatingArrangement = '<table class="seating-table">';
  var seatsPerRow = Math.floor(roomCapacity / 10);
  var remainingSeats = roomCapacity % 10;

  var row = 1;
  var seatNumber = 1;
  var studentCount = previousStudentCount + 1;
  var benchNumber = 1;

  while (numStudents > 0) {
    seatingArrangement += '<tr><th>Bench ' + benchNumber + '</th>';

    for (var i = 0; i < seatsPerRow; i++) {
      seatingArrangement += '<td>Seat ' + seatNumber + ': ' + department + '-' + studentCount + '</td>';
      seatNumber++;
      studentCount++;
      numStudents--;

      
      if (i < seatsPerRow - 1) {
        seatingArrangement += '<td class="extra-column">Bench ' + (benchNumber + i + 1) + '</td>';
      }

      if (numStudents === 0) {
        break;
      }
    }

    if (remainingSeats > 0 && numStudents > 0) {
      seatingArrangement += '<td>Seat ' + seatNumber + ': ' + department + '-' + studentCount + '</td>';
      seatNumber++;
      remainingSeats--;
      studentCount++;
      numStudents--;

      
      if (remainingSeats > 0 && numStudents > 0) {
        seatingArrangement += '<td class="extra-column">Bench ' + (benchNumber + seatsPerRow) + '</td>';
      }
    }

    seatingArrangement += '</tr>';

    row++;
    benchNumber += seatsPerRow;
  }

  seatingArrangement += '</table>';

  return seatingArrangement;
}



window.onload = function () {
  document.getElementById("download").addEventListener("click", () => {
    const invoice = this.document.getElementById("seating-plan");
    console.log(invoice);
    console.log(window);
    var opt = {
      margin: 1,
      filename: 'seating_plan.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(invoice).set(opt).save();
  });
};

function logout() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  var logoutButton = document.querySelector(".logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});
