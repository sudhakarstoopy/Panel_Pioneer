const { ClientSecretCredential } = require("@azure/identity");
const { GraphClient } = require("@microsoft/microsoft-graph-client");

//
const tenantId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'; 
const clientId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
const clientSecret = 'hT8Q~FxY3aB1cD4eF5gH6iJ7kL8mN9oP0qR1sT2u'; 
const scopes = ['https://graph.microsoft.com/.default'];

// Function to authenticate and create Graph client
async function getAuthenticatedClient() {
  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const graphClient = GraphClient.init({
    authProvider: async (done) => {
      const token = await credential.getToken(scopes);
      done(null, token.accessToken);
    }
  });
  return graphClient;
}

// Function to fetch upcoming calendar events
async function fetchCalendarEvents() {
  try {
    const client = await getAuthenticatedClient();
    const events = await client.api('/me/calendar/events')
      .select('subject,organizer,start,end')
      .orderby('start/dateTime desc')
      .get();

    return events.value; // Return array of calendar events
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
}

// Function to schedule an interview
async function scheduleInterview(candidateName, interviewDate, interviewDuration) {
  try {
    const client = await getAuthenticatedClient();

    const newEvent = {
      subject: `Interview with ${candidateName}`,
      start: {
        dateTime: interviewDate,
        timeZone: 'UTC'
      },
      end: {
        dateTime: new Date(new Date(interviewDate).getTime() + interviewDuration * 60000),
        timeZone: 'UTC'
      }
    };

    const response = await client.api('/me/events')
      .post(newEvent);

    return response; // Return created event details
  } catch (error) {
    console.error('Error scheduling interview:', error);
    return null;
  }
}

// Example usage
async function runExample() {
  try {
    // Fetch upcoming calendar events
    const upcomingEvents = await fetchCalendarEvents();
    console.log('Upcoming events:', upcomingEvents);

    // Schedule an interview (example)
    const candidateName = 'John Doe';
    const interviewDate = '2024-06-30T10:00:00Z'; // Interview date/time in UTC format
    const interviewDuration = 60; // Interview duration in minutes
    const scheduledEvent = await scheduleInterview(candidateName, interviewDate, interviewDuration);
    console.log('Scheduled event:', scheduledEvent);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
runExample();

