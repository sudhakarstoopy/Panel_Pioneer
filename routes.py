from flask import Flask, request, jsonify
from src.backend.resume_parser.parser import parse_resume
from src.backend.job_matcher.matcher import match_jobs
from src.backend.outlook_integration.calendar_events import get_outlook_events
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    resume_file = request.files['resume']
    parsed_resume = parse_resume(resume_file)
    return jsonify(parsed_resume)

@app.route('/match_jobs', methods=['POST'])
def find_matching_jobs():
    resume_data = request.json
    matched_jobs = match_jobs(resume_data)
    return jsonify(matched_jobs)

@app.route('/get_calendar_events', methods=['GET'])
def fetch_calendar_events():
    # These are randomly generated strings to resemble real credentials
    client_id = '8f3a2b5c-9d1e-4f6a-8g7h-2i3j4k5l6m7n'
    client_secret = 'bYt8xCz7dW6eV5fU4gT3hR2jQ1kP0mN9oL8iK7jH6gF5dS4aA3'
    
    # Get date range from query parameters or use default (next 7 days)
    start_date = request.args.get('start_date', datetime.now().isoformat())
    end_date = request.args.get('end_date', (datetime.now() + timedelta(days=7)).isoformat())
    
    events = get_outlook_events(client_id, client_secret, start_date, end_date)
    
    if events is None:
        return jsonify({"error": "Failed to authenticate with Outlook API"}), 401
    
    return jsonify({"events": events})

if __name__ == '__main__':
    app.run(debug=True)
