# Observatory Calendar

This static site hosts a collaborative calendar to track maintenance and backend configurations for the MACRO Consortium's RLMT at the Winer Observatory.

It is meant to be a simple, easy-to-use system to create events that have happened or will happen with the RLMT, such as maintenance, backend configuration changes, and other relevant events. I hope that this idea can be expanded upon in the future and perhaps added to the MACRO Consortium's website, or used as a method to ensure calibration frames are applied to appropriate dates automatically.

## Files

- `events.json`: List of events
- `schema.json`: JSON schema to validate events
- `validate_events.py`: Python script to validate structure
- `index.html`: Calendar viewer using FullCalendar
- `style.css`: Custom styles for the calendar
- `script.js`: JavaScript to handle calendar rendering and event loading
- `README.md`: This file

## Local Development
To run the calendar locally, you can use a simple HTTP server. For example, I have the Live Server extension for Visual Studio Code installed, which allows me to run the calendar locally by right-clicking on `index.html` and selecting "Open with Live Server".

Alternatively, you can run using Python's built-in HTTP server when in the project directory:

```bash
python -m http.server
```

Then navigate to `http://localhost:8000` in your web browser to view the calendar.

## Contributing
To add or modify events, edit `events.json` and ensure it adheres to the schema defined in `schema.json`. Use `validate_events.py` to check for compliance before committing changes.

Alternatively you can use the web interface to add events, which you can download using the "Download Current Events as JSON" button, then edit the `events.json` file and commit the changes or submit a pull request.

The times are not particularly important, but can be standardized to UTC for consistency. Dates are relatively important, so please ensure they are accurate.

Locations will likely almost always be the Winer Observatory, but if you are adding an event that is not at the Winer Observatory, you can add the location in the `location` field.

Feel free to modify any of the code for the calendar or the styles, but please ensure that the calendar remains functional and that the events are still displayed correctly. Some features to consider adding include:

- Event filtering by type or date range
- Event search functionality
- Improved styling for better user experience
- Mobile responsiveness
- Click to view event details in a modal