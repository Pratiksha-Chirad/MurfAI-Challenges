# Import the necessary Flask components
from flask import Flask, render_template

# Create a Flask application instance. The first argument is the name of the application's module.
app = Flask(__name__)

# Define a route. This is the URL that will trigger the 'index' function.
# The '/' indicates the root of the website.
@app.route('/')
def index():
    # The render_template function looks for HTML files in the 'templates' folder.
    # It will serve the 'index.html' file to the user's browser.
    return render_template('index.html')

# This block ensures the server runs only when the script is executed directly.
if __name__ == '__main__':
    # 'debug=True' enables automatic reloading and provides a useful debugger.
    # It should only be used during development, not in production.
    app.run(debug=True)
