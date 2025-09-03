# Beer Bingo 
---

Website: [beerbingo.co.uk](https://www.beerbingo.co.uk/)

---

Beer Bingo is a gamified tool to encourage users to track their alcohol consumption, with the objective of reducing alcohol intake. This is inspired by calorie counting apps, which are used to help reduce food intake and lose weight.

It contains a database of common drinks found in UK pubs and establishments. Users must press "Add Drink" everytime they consume a particular beverage. Over time, they can recieve a Bronze, Silver, Gold or Diamond ranking for that particular drink. 
Users are also able to view a statistics page, allowing them to see how much alcohol they have consumed in given time periods. They can also see their most consumed drink.

Built using Next.js and Supabase.

Based on [community feedback](https://www.beerbingo.co.uk/feedback), features continue to be added to this app.

_This project does not aim to encourage excess alcohol consumption._

## Features

### Drink Database

Users are shown a list of drinks, to mark one of these drinks as consumed, they can press "Add Drink". There is also an undo button to remove the last record in case of error. Users must wait 10 seconds before adding another drink.

Drinks are stored in the `drinks` table of the Supabase database and their images are stored in a Supabase S3 Bucket. These are fetched before rendering, allowing drinks to be easily updated.

<br />

<img width="1806" height="1206" alt="image" src="https://github.com/user-attachments/assets/0d5dd958-8faa-4c88-b815-b096f56054c2" />

---

### Rankings

Historic records of drink consumption are stored in the `history` table and link to the user's and drink's UUID (see below).

<img width="991" height="90" alt="image" src="https://github.com/user-attachments/assets/2c4cd7bf-dcb8-44e1-a380-31ff78a762ac" />

When each drink is loaded, the historic records for the current user are fetched and counted to display rankings. This is updated in real-time as new drinks are recorded. Note: for users that are not logged in, no database reads or writes are made and the count for each drink is just stored in state.

<br />

<img width="1415" height="488" alt="image" src="https://github.com/user-attachments/assets/c3bfbea1-2e6f-4ab5-ab21-11a916f9f0ec" />

_In the order shown, rank (number of drinks): Bronze (1), Silver (5), Gold (10), Diamond (20)_

---

### Statistics

Filtering the `history` records into time intervals allows the number of drinks and a graph of drinking habits to be shown. This is on the stats page. Only logged in users can see stats.

<br />


<img width="1149" height="763" alt="image" src="https://github.com/user-attachments/assets/3f45c619-b5b6-4206-9558-f06b6561af55" />

<br />
<br />


Additionally, the top 3 most consumed drinks are shown.

<br />

<img width="1393" height="675" alt="image" src="https://github.com/user-attachments/assets/306c7d1f-6bc5-41f3-953b-937d056eac23" />

---

### User Management

In order to track drink consumption, a `user` record must exist to link to the `history` record. This is done using Supabase's built-in auth provider.

A small fun website like this doesn't need both a sign up and log in page, since this would overcomplicate signup flow. Instead a custom unified login/signup form is used.

Here, if the user enters an email that is not in use, they are automatically sign up and redirected to the home. If they enter a email that is in use, a login attempt is made - if the password is incorrect, an error is shown.

_I'll be releasing a demo of this auth flow, alongside a conventional login/signup flow, in the future._

<img width="723" height="389" alt="image" src="https://github.com/user-attachments/assets/9e95fd4b-745f-4d77-b3d7-9c8210d0f44a" />

<br />

<img width="634" height="558" alt="image" src="https://github.com/user-attachments/assets/bfc26d7a-a25b-40ff-b7b2-81a7266dafc3" />


