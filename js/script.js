$(document).ready(function() {
    
    // Variable to track the current from step index
    var currentStep = 0;  

    // Function to show the current form step based on index
    function showStep(index) {
        /*
            1. Remove the active class from all form steps sections
            2. Select the step that matches the given index and add the active class which will display the section
        */
        $('.step').removeClass('active'); 
        $('.step').eq(index).addClass('active'); 

        /* 
            1. Remove the sidebar-item-active class from all side bar list items to hide the background color and border radius
            2. Select the item list that matches the current step index and add the sidebar-item-active class which will enable the background color and border radius
        */
        $('.sidebar-item').removeClass('sidebar-item-active'); 
        $('.sidebar-item').eq(index).addClass('sidebar-item-active');
        
        /* 
            1. To control the visibility of the previous & submit buttons.
            2. Hide them on the first form step and display them on all others.
        */
        if (index === 0) {
            $('.previous').hide();
            $('.submit').hide();
        } else {
            $('.previous').show();
        }

        /* 
            1. To control the visibility of the next step & submit buttons.
            2. Hide the next step button on last step and display the submit button. 
            3. Else show the next button on all other steps.
        */
        if (index === $('.step').length - 1) {
            $('.next').hide();
            $('.submit').show();
        } else {
            $('.next').show();
        }

    }

    // --------------------------------------------------- //

    // Function t check for empty form fields
    function validateStep(step) {
        /* 
            1. First we define a boolean variable that we will use to determine if all the form fields are filled and move on to the next step.
            2. We select the current step and find all elements with the required class.
            3. Then we run a function for each of them which checks if their value is empty or not.
            4. If it is empty, the variable is set to false.
            5. We select its personal error message and display it.
            6. If all fields pass this check and are filled, thee isValid variable remains true and is returned by the function.
        */
        var isValid = true;
        // console.log('running')
        $(step).find('.required').each(function() {
            if ($(this).val() === "") {
                isValid = false;
                var errorId = $(this).attr('id') + 'Error';
                $('#' + errorId).show();
            } else {
                var errorId = $(this).attr('id') + 'Error';
                $('#' + errorId).hide();
            }
        });
        return isValid;
    }

    // --------------------------------------------------- //

    /* 
        1. Here we have a click event for the next step button.
        2. It first gets the current form step element using the current step index.
        3. It runs and if statement with the validateStep function defined above.
        4. This will either return true or false, based on if the forms are filled.
        5. If so, it will increment the currentStep variabel by 1.
        6. and the use said variable to display the new step based on the index number. 
    */
    $('.next-step').click(function() {
        var currentStepElement = $('.step').eq(currentStep);
        if (validateStep(currentStepElement)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    /* 
        1. Here we have a click event for the previous step button.
        2. This will simply run a function that will decrement the currentStep button and
        3. run the showStep function to render the previous form step.
    */
    $('.prev-step').click(function() {
        currentStep--;  // Move to the previous step
        showStep(currentStep);  // Show the previous step
    });

    /* 
        1. Here we simply invoke the showStep function
    */
    showStep(currentStep);


    // --------------------------------------------------- //

    /* 
        1. Here we have a click event for the add new button.
        2. When clicked, it will retrieve the 'data-target' attribute from the clicked add new element, 
        which contains the ID of the dropdown that will be modified.
        3. Before showing the modal the 'targetId' is stored in the modal's 'data-target' attribute.
        4. Then the model is open.
        5. This ensures the modal knows which dropdown to update later.
    */
    $('.add-new').click(function() {
        const targetId = $(this).data('target');
        $('#addOptionModal').data('target', targetId).modal('show');
    });

    /* 
        1. Here we have a click event for the save new opton button on the modal.
        2. It retrieves the value entered in the input field and also trims any spaces.
        3. Then it retrieves the stored 'targetId' from the modal's 'data-target' which indicates which dropdown to update.
        4. Then we check if the input field is empty, and then the new option is added to the dropdown identified by 'targetId'.
        5. The input field is cleared after the option is added, and the modal is closed.
        6. If the input is empty, an alert prompts the user to enter a valid option.
    */
    $('#saveNewOption').click(function() {
        const newOption = $('#newOptionInput').val().trim();
        const targetId = $('#addOptionModal').data('target');

        if (newOption) { 
            $(`#${targetId}`).append(new Option(newOption, newOption));
            $('#newOptionInput').val('');
            $('#addOptionModal').modal('hide');
        } else {
            alert('Please enter a valid option.');
        }
    });


    // --------------------------------------------------- //

    /* 
        1. Here we have a click event for the save & exit button.
        2. This button will first capture all the form field key and values and store them in a object. 
        3. Then it will run a function for each of those field key and values.
        4. In this case I have simply set it to store the data to the local browser storage.
        5. After that we simply alert that the data has been stored. 
        6. Not sure what to do about the exit part though.
    */
    $('.save-exit').click(function() {

        var formData = {
            artist: $('#artist').val(),
            title: $('#title').val(),
            yearCreated: $('#yearCreated').val(),
            medium: $('#medium').val(),
            inscriptions: $('#inscriptions').val(),
            category: $('#category').val(),
            branch: $('#branch').val(),
            ownership: $('#ownership').val(),
            locations: $('#locations').val(),
            inventory: $('#inventory').val(),
            accession: $('#accession').val(),
            partner: $('#partner').val(),
            barcode: $('#barcode').val(),
            rfid: $('#rfid').val(),
        };

        $.each(formData, function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        });

        alert('Data Saved to local storage');
        
    });


    // --------------------------------------------------- //

    /* 
        1. Here we have a submit event for the form.
        2. We first disable the forms default submission behaviour. 
        This allows us to handle the form submission manually using JavaScript and AJAX.
        3. 
    */
    $('#multiStepForm').submit(function(event) {

        event.preventDefault();
        
        /* 
            1. Then we check if step 2 passes the validateStep function before we proceed.
            2. If so we proceed with collecting form data and submitting via AJAX.
        */
        if (validateStep($('#step2'))) {
            
            /* 
                1. Collect the form data from the input fields and store them in the formData object.
            */
            var formData = {
                artist: $('#artist').val(),
                title: $('#title').val(),
                yearCreated: $('#yearCreated').val(),
                medium: $('#medium').val(),
                inscriptions: $('#inscriptions').val(),
                category: $('#category').val(),
                branch: $('#branch').val(),
                ownership: $('#ownership').val(),
                locations: $('#locations').val(),
                inventory: $('#inventory').val(),
                accession: $('#accession').val(),
                partner: $('#partner').val(),
                barcode: $('#barcode').val(),
                rfid: $('#rfid').val(),
            };
    
            /* 
                1. Clear local storage once the form is successfully submitted.
                2. This ensures that any temporary data stored during form completion is removed.
            */
            localStorage.clear();
        
            /* 
                1. Submit the collected form data via an AJAX POST request to the dummy API endpoint.
                2. The form data is stringified into JSON format before being sent.
                3. The contentType is set to indicate that we're sending JSON data.
            */
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts',
                type: 'POST',
                data: JSON.stringify(formData),
                contentType: 'application/json; charset=UTF-8',
                
                /* 
                    1. If the request is successful, the success callback is executed.
                    2. It shows an alert with the data received from the server.
                    3. Then we reset the form index and clear all fields on the form.
                */
                success: function(response) {
                    alert('Form submitted successfully! Data received by the server:\n' + JSON.stringify(response));
                    
                    currentStep = 0;
                    showStep(currentStep);
    
                    $('#artist').val('');
                    $('#title').val('');
                    $('#yearCreated').val('');
                    $('#medium').val('');
                    $('#inscriptions').val('');
                    $('#category').val('');
                    $('#branch').val('');
                    $('#ownership').val('');
                    $('#locations').val('');
                    $('#inventory').val('');
                    $('#accession').val('');
                    $('#partner').val('');
                    $('#barcode').val('');
                    $('#rfid').val('');
                },
                
                /* 
                    1. If there's an error during the AJAX request, the error callback is executed.
                    2. It alerts ther user that the form submission failed and prints the error on the console.
                */
                error: function(error) {
                    alert('There was an error submitting the form.');
                    console.log(error);
                }
            });
        }
    });

});
