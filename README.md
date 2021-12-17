# Project's name

"BoardGamePedia (BGP)"

## Description
BGP is a catalog boardgame that allows user to find the perfect game for the perfect moment.

## USER Views

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Index** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign-up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

**Log-in** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Log-out** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Profile** - As a user I want to be able to see my profile and edit it

**Game Collection** - As a user I want to be able to see my list of plants

**Add Game** - The user can add a board game to his collection

**See Game** - The user can see is's collection

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
    Number of players: String,
    Img: String,
    Playing time: String,
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

### Github project

### Git

### Wireframes

### Slides
