// A formal and interactive script for handling button clicks.
// This script listens for the page to fully load and then adds an event listener
// to a button, which will update a message on the page.

document.addEventListener('DOMContentLoaded', () => {
    // Log a message to the console to confirm the script is loaded and running.
    console.log('Document loaded. Initializing interactive components...');

    // Get a reference to the interactive button element by its ID.
    const actionButton = document.getElementById('action-button');
    // Get a reference to the message display element.
    const messageElement = document.getElementById('main-message');

    // Define a set of formal and informative messages to cycle through.
    const messages = [
        'Awesome! You successfully initiated the first action.',
        'Interaction complete. This demonstrates successful communication between the frontend and JavaScript.',
        'You\'ve successfully executed the client-side logic. The button is now disabled.'
    ];
    let clickCount = 0;

    // Verify that the necessary DOM elements exist before proceeding.
    if (actionButton && messageElement) {
        // Attach a click event listener to the button.
        actionButton.addEventListener('click', () => {
            // Check if the button has already been clicked a few times.
            if (clickCount < messages.length) {
                // Update the text content of the message element with a new formal message.
                messageElement.textContent = messages[clickCount];
                clickCount++;

                // If all messages have been displayed, disable the button.
                if (clickCount >= messages.length) {
                    actionButton.textContent = 'Action Completed';
                    actionButton.disabled = true;
                    // Log the final state to the console for formal debugging.
                    console.log('All actions completed. Button disabled.');
                }
            }
        });
    } else {
        // Log an error if a required element is missing, for formal error handling.
        console.error('Error: Could not find required DOM elements (action-button or main-message).');
    }
});
