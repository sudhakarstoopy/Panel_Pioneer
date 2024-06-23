from O365 import Account, MSGraphProtocol

def get_outlook_events(client_id, client_secret, start_date, end_date):
    # Set up the protocol
    protocol = MSGraphProtocol()
    
    # Create an account object
    account = Account((client_id, client_secret), protocol=protocol)
    
    # Authenticate
    if account.authenticate(scopes=['calendar_read']):
        print('Authentication successful')
    else:
        print('Authentication failed')
        return None

    # Get the calendar
    schedule = account.schedule()
    calendar = schedule.get_default_calendar()

    # Query events
    q = calendar.new_query('start').greater_equal(start_date)
    q.chain('and').on_attribute('end').less_equal(end_date)

    events = calendar.get_events(query=q, include_recurring=True)

    # Format events for return
    formatted_events = []
    for event in events:
        formatted_events.append({
            'subject': event.subject,
            'start': event.start.strftime("%Y-%m-%d %H:%M:%S"),
            'end': event.end.strftime("%Y-%m-%d %H:%M:%S"),
            'location': event.location['displayName'] if event.location else None,
        })

    return formatted_events
