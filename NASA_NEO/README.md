#  Interview task
 
### Requirements:
- use React, React hooks, [vite](https://vitejs.dev/guide/), obligatory
- use best practices to structure the application, consider that it will be extended with additional features in the future
- use any React UI Component Library, obligatory
- provide means for configuration for different environments (DEV/PROD), if have experience!
-- hint: use env variable
- cover partially with unit tests (in order to demonstrate the approaches, if have experience)
- use github as version control system, obligatory
- split your job into several parts and do about **5-10** logical commits (do it every 1-2 hours)

### Initial data
- use `api.nasa.gov`
- get the API-KEY=`PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx`, if expired - please register
- documentation: https://api.nasa.gov - Browse APIs - Asteroids NeoWs
 
 
### Task:
Create a single page React application with information about near orbital objects (NEO), organized in list with a maximum of 6 elements. New element should be added every 5 seconds and contain aggregated data about a single day. The oldest element should be removed on new element if list is full. You should start fetching data from 1st day of the month till today. When reach today, start from the 1st day again.
 
Every element should contain the following data:
- max estimated diameter of NEO in kilometers for the day (check estimated_diameter_max property)
- number of potentially hazardous NEOs per day (check is_potentially_hazardous_asteroid property)
- closest NEO (miss_distance in km)
- fastest NEO (relative_velocity in kph)
 
Elements with the 2 highest numbers of hazard objects should have red background and updated with each new element added.
