# Beer Bingo 

Beer Bingo is a gamified tool to encourage users to track their alcohol consumption.

It contains a database of common drinks found in UK pubs and establishments. Users must press "Add Drink" everytime they consume a particular beverage. Over time, they can recieve a Bronze, Silver, Gold or Diamond ranking for that particular drink. 
Users can also see the total for a specific drink, and soon will be able to track their general drinking trends. For example, future updates will allow users to see their consumption over time intervals such as the last 24 hours, month, etc; as well as their most consumed drink.

Built using Next.js and Supabase.

_This project does not aim to encourage excess alcohol consumption._

## Features

### Drink Database

Users are shown a list of drinks, to mark one of these drinks as consumed, they can press "Add Drink". There is also an undo button to remove the last record in case of error.

Drinks are stored in the `drinks` table of the Supabase database and their images are stored in a Supabase S3 Bucket. These are fetched before rendering, allowing drinks to be easily updated.

<br />

<img width="1806" height="1206" alt="image" src="https://github.com/user-attachments/assets/0d5dd958-8faa-4c88-b815-b096f56054c2" />

### Rankings

Historic records of drink consumption are stored in the `history` table and link to the user's and drink's UUID (see below).

<img width="991" height="90" alt="image" src="https://github.com/user-attachments/assets/2c4cd7bf-dcb8-44e1-a380-31ff78a762ac" />

When each drink is loaded, the historic records for the current user are fetched and counted to display rankings. This is updated in real-time as new drinks are recorded. Note: for users that are not logged in, no database reads or writes are made and the count for each drink is just stored in state.

<br />

<img width="1415" height="488" alt="image" src="https://github.com/user-attachments/assets/c3bfbea1-2e6f-4ab5-ab21-11a916f9f0ec" />

_In the order shown, rank (number of drinks): Bronze (1), Silver (5), Gold (10), Diamond (20)_

### User Management

In order to track drink consumption, a `user` record must exist to link to the `history` record. This is done using Supabase's built-in auth provider.

A small fun website like this doesn't need both a sign up and log in page, since this would overcomplicate signup flow. Instead a custom unified login/signup form is used.

Here, if the user enters an email that is not in use, they are automatically sign up and redirected to the home. If they enter a email that is in use, a login attempt is made - if the password is incorrect, an error is shown.

_I'll be releasing a demo of this auth flow, alongside a conventional login/signup flow, in the future._

<img width="723" height="389" alt="image" src="https://github.com/user-attachments/assets/9e95fd4b-745f-4d77-b3d7-9c8210d0f44a" />

<br />

<img width="634" height="558" alt="image" src="https://github.com/user-attachments/assets/bfc26d7a-a25b-40ff-b7b2-81a7266dafc3" />


