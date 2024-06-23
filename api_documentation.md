# API Documentation

## Resume Upload

Endpoint: `/upload_resume`
Method: POST
Content-Type: multipart/form-data

### Request

- `resume`: File (PDF or DOCX)

### Response

```json
{
  "skills": ["Python", "Machine Learning", "Data Analysis"],
  "experience": [
    {
      "title": "Data Scientist",
      "company": "TechCorp",
      "duration": "2 years"
    }
  ],
  "education": [
    {
      "degree": "Master's in Computer Science",
      "institution": "University of Technology"
    }
  ]
}
