# Milestone 3


### Database set up:

Two tables, Users, and Symptoms. Every User object has a corresponding Symptom Object and vice versa.

User table:

 {
    __id: object ID
    username: string,
    email: string,
    password: string,
    tested: boolean,
    testedResult: integer,
    symptom: Symptom Object ID,
    sex: string,
    county: String,
    age: integer,
    date: Date
  }

  Symptoms table:
    {
        user: User object ID,
        fever: integer,
        tiredness: integer,
        chills: integer,
        digestion: integer,
        smell: integer,
        congestion: integer,
        cough: integer,
        breathing: integer,
        date: integer,
      }

### Contributions:
We had done most of the work for this milestone in the previous milestone, and so our commits are relatively small.

Nathan: User session, and routes to go along with user sessions.
Stephen: Index html work, added nav bar, and more read operations for charts and tables 
Patrick: Deleting User route