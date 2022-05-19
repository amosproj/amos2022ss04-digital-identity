# How To Add a Co-Author to a Commit
Commit co-authors makes it easy to see who has contributed to every commit, regardless of how many contributors there are — and every author gets attribution in the pull request and in their contribution graph.

## Mails of Teammebers
| Name              | Email                                                 | Setup done   |
|-------------------|-------------------------------------------------------|--------------|
| TamaraHoock       | 74047478+TamaraHoock@users.noreply.github.com         |              |
| Idontker          | 53585343+Idontker@users.noreply.github.com            | 😊            |
| jackDS008         | 93184461+jackDS008@users.noreply.github.com           |              |
| Jean28518         | 39700889+Jean28518@users.noreply.github.com           |              |
| veitmo            | 92971164+veitmo@users.noreply.github.com              |              |
| valentinBraeutigam| 104430118+valentinBraeutigam@users.noreply.github.com |              |
| annikakrause      | 104464769+annikakrause@users.noreply.github.com       |              |
| steve-237         | 88513912+steve-237@users.noreply.github.com           |              |

## How it works
To add co-authors to a commit, just add one or more “Co-authored-by” trailers to the end of the commit message:
```
Your regular commit message.

Co-authored-by: Max Muster <12322+maxmuster@users.noreply.github.com>
Co-authored-by: Maria Muster <44023+maria@users.noreply.github.com>
```
If you are using the CLI and ``git commit -m``: 
```
git commit -m "Your regular commit message.


Co-authored-by: Karol Bakas <602352+califa@users.noreply.github.com>" --signoff 
```

## How to Change the last commit 
See *3. Git Basics* of this [file](https://github.com/amosproj/amos2022ss04-digital-identity/blob/main/Documentation/GitPolicies.md) for this matter.

## Setup
1. Sign into your github Account.
2. Click on your Icon (top-right corner) and go to *Settings*.
3. Go to *Emails*.
4. Now scroll down to the the checkbox: **Keep my email addresses private** 
5. You have got two options. Both will work. Please read the text displayed by GitHub to decide for yourself. <br > Afterwards, ensure one of the following options: 
   * Option 1: *Keep my email addresses private* is **unchecked**. <br > Nothing to do here anymore😊. Continue with step 6. From this point *email* will refer to your *primary* email address in GitHub. This address is shown at the top of the page. 
   * Option 2: *Keep my email addresses private* is **checked**. <br >
   You should see another checkbox below called *Block command line pushes that expose my email*. **Uncheck** this checkbox.<br > Otherwise, you will be blocking all commits which refer you by email from being pushed to orign/the GitHub repo.<br >
   Now have a look below the headline *Keep my email addresses private*. Within this paragraph, you will find a email in the following format. From this point *email* will refer to this one.
   ```
   ID+Username@users.noreply.github.com
   4201230+JohnDoe@users.noreply.github.com (example)
   ```
6. Your teammates are now able to refer to you as a co-author using the *email* of step 5 and correct syntax (see chapter above).

(Only for this project):

7. Go to the table shown above. Check whether the mail in the row with your name is equal to the *email* of step 5. If necessary, change the email in the row to the email of step 5.
8. Add an "x" or 😊 to the last column of the row with your name. Doing this will signal to the rest, that you finished the setup.
