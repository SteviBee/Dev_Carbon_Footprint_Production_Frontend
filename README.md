#  Capstone 2 - Intro Questions - Developer Carbon Footprint App

1. What tech stack will you use for your final project? We recommend that you use
React and Node for this project, however if you are extremely interested in
becoming a Python developer you are welcome to use Python/Flask for this
project.
    - Frontend: React, css or bootstrap
    - Backend: Node, Express, Postgresql, BCrypt
2. Is the front-end UI or the back-end going to be the focus of your project? Or are
you going to make an evenly focused full-stack application?
    - Evenly focused full-stack!
3. Will this be a website? A mobile app? Something else?
    - Website
4. What goal will your project be designed to achieve?
    - The goal is to use the carbon footprint API and add some value to a developer trying to identify carbon impact of their app and to give actionable steps they could take to reduce their impact.
5. What kind of users will visit your app? In other words, what is the demographic of
your users?
    - Environmently concerned general users and software engineers 
6. What data do you plan on using? How are you planning on collecting your data?
You may have not picked your actual API yet, which is fine, just outline what kind
of data you would like it to contain. You are welcome to create your own API and
populate it with data. If you are using a Python/Flask stack are required to create
your own API.
- Example of the API call and response:
`curl --request POST \
  --url https://beta3.api.climatiq.io/estimate \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
    "emission_factor": "cpu-provider_aws-region_us_west_1",
    "parameters": {
        "number": 1,
        "time": 24,
        "time_unit": "h"
    }
}'`

- Response
`{
    "co2e": 0.0199272,
    "co2e_unit": "kg",
    "co2e_calculation_method": "ar4",
    "co2e_calculation_origin": "source",
    "emission_factor": {
        "id": "cpu-provider_aws-region_us_west_1",
        "source": "CCF",
        "year": "2021",
        "region": "US-GIR",
        "category": "Cloud Computing - CPU",
        "lca_activity": "usephase",
        "data_quality_flags": []
    },
    "constituent_gases": {
        "co2e_total": 0.0199272,
        "co2e_other": null,
        "co2": null,
        "ch4": null,
        "n2o": null
    }
} `
- API: I will use both: 
     - I will create my own API between the frontend and backend. It will live in the react app. 
     - Then I will use the https://www.climatiq.io/docs/guides/cloud API to get carbon footprint data from user input

7. In brief, outline your approach to creating your project (knowing that you may not
know everything in advance and that these details might change later). Answer
questions like the ones below, but feel free to add more information:
- What does your database schema look like?
    - simple CRUD for users plus some action items for users based on their carbon footprint score from the API
    - STRETCH: example API calls
- What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data.
    - Ensuring I set my react app and node / express up correctly with the correct data structure and communication between different files.
- Is there any sensitive information you need to secure?
    - User password and 
    - my API key
- What functionality will your app include?
    - Mainly: user input on cloud computing via a form, then a list is the output with actions based on those results to reduce that number
- What will the user flow look like?
    - Homepage:
        - login
        - signup
        - Carbon footprint API
            - results / analysis / action item s
- What features make your site more than a CRUD app? What are your
stretch goals?
    - Ablitity to give different action items based on different user inputs