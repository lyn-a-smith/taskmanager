const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask() {
    // 1. Get the values from the DOM
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val(); // Fixed typo: tst -> txt
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    // 2. Input Validations
    if (!title || !date) {
        alert("Error: Title and Date are required fields.");
        return; // Stops the function if validation fails
    }

    // 3. Create an object using the class
    const taskToSave = new Task(title, desc, color, date, status, budget);
    console.log("Task Saved:", taskToSave);

    // 4. Display the task on the screen
    displayTask(taskToSave);

    // 5. Clear the form after saving
    $("#taskForm")[0].reset();
}

function displayTask(task) {
    // Create HTML syntax for the new task, using the color picker value for a stylish left border
    let syntax = `
        <div class="task-item" style="border-left-color: ${task.color};">
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="task-status ${task.status.replace(/\s+/g, '-').toLowerCase()}">${task.status}</span>
            </div>
            <p><strong>Description:</strong> ${task.desc || "No description provided"}</p>
            <div class="task-details">
                <p><strong>Date:</strong> ${task.date}</p>
                <p><strong>Budget:</strong> $${task.budget || "0.00"}</p>
            </div>
        </div>
    `;
    
    // Append the new task to the list container
    $("#list").append(syntax);
}

// Moved outside of saveTask for proper scope
function loadTask() {
    $.ajax({
        type: "GET", // http method Read
        url: API, // Destination
        dataType: "json", // Expected format
        success: function(data) {
            console.log("Data loaded:", data);
            // Future step: loop through 'data' and call displayTask() for each item
        }, 
        error: function(err) {
            console.error("Error loading tasks:", err);
        } 
    });
}

function testConnection() {
    $.ajax({
        type: "GET",
        url: API,
        success: function(data) {
            console.log("Connection successful", data);
        },
        error: function(err) {
            console.error("Connection failed", err);
        }
    });
}

function init() {
    console.log("App initialized.");
    $("#btnSave").click(saveTask);
    
    // Optional: Load existing tasks when the app starts
    // loadTask(); 
}

// Force the html and css gets resolved, and when finished, execute the logic
window.onload = init;