# Project's name

"BoardGamePedia (BGP)"

## Description
BGP is a catalog boardgame that allows user to find the perfect game for the perfect moment.

## USER stories

**404** - The user can see a 404 page when a page does not exist.

**500** - the User can see an error page when there is a server problem.

**Index** - the User can access the homepage with login and signup

**Sign-up** - the User can sign up on the webpage.

**Log-in** - the User can log in on the webpage.

**Log-out** - the User can log out from the webpage.

**Profile** - the User can see the profile with favs and edit, create and remove

**Game Collection** - The user can see the global game collection.

**Add Game** - The user can add a board game to Its collection.

**See Game** - The user can see Its collection.

**Delete Game** - The user can delete games from the collection.

**Update Game** - The user can update games from the collection.

## BACKLOG

**Shopping points** - The user will be able to see the shopping points.

**Let's play together** - The user can find people to play with.

**Share you experience** - The user can find for tips or counsel about the games.

**See related games** - Related games per theme or tags at will.

## Routes

| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                |                                       |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                      | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                       |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                      | /profile        |
| Log out         | GET   | /logout                        | Log out a user                                   |                                       | /               |
| Profile         | GET    | /profile                      | See the profile page with editable form          |                                       |                 |
| Profile edited  | POST   | /profile                      | Send user's data changed                         | {user_email, password                 | /profile}       |
| Collection      | GET    | /collection                   | See user's collection                     |                                       |                 |
| Game           | GET    | /collection/gameId               | Read game's information                         |                                       |                 |
| Game add form  | GET    | /collection/new                   | See form to upload a new game                  |                                       |                 |
| Game add       | POST   | /collection/new                   | Upload a game to user's collection             |                                       | /Collection/gameId |
| game edit form | GET    | /collection/gameId/edit          | See edit form with game's preloaded information |                                       |                 |
| game edit      | POST   | /userid/collection/gameId/edit   | Add game's new information                      |                                        | /collection/gameId |
| game delete    | POST   | /userid/collection/gameId/delete | Delete game from user's collection                 |                                       | /collection         |

## Models

Game model

```js
{
    Name: String,
    Year: String,
    Rating: String,
    Description: String,
    Number_of_players: String,
    Img: String,
    Playing_time: String,
    Difficulty: String,  
}
```
User model

```js
{
    Nickname: String,
    userEmail: String,
    hashedPassword: String,
    Age: Number,
}
```
