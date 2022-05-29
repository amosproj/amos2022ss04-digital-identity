
# Git Policies
## Table of Contents
1. Introduction
2. General
3. Git Basics 
4. Feature Branch Workflow
5. [Git Co-authored](https://github.com/amosproj/amos2022ss04-digital-identity/blob/main/Documentation/dev/HowToCoAuthor.md)
6. [Git tags and GitHub releases](https://github.com/amosproj/amos2022ss04-digital-identity/blob/main/Documentation/dev/GitPolicies.md#6-git-tags-and-how-to-release)

## 1. Introduction
These policies are guidelines to follow. They are neither aimed to replace the *git* documentation nor a tutorial on how to use git in the first place.
They are aimed to 
* give a brief overview of the most common commands,
* agree on how to use branches,
* agree on how to merge and 
* describe how we work with git as a team.

## 2. General
* ALWAYS PULL and PUSH:<br > 
No one likes merging a lot. By pulling and pushing we can reduce the amount of merge conflicts.
  
* Use git merge instead of git rebase: <br >
Git rebase can cause much more work if used wrongly.

* Create a *Pull Request* to merge your branch into the *main* or *dev* branch.<br >
Please tag the *Release Manager* in your comment. Additionally, assign someone as a *reviewer* who will review your code.

* Ask friends for help if git is weird 😊  <br >
In most cases you will not destroy a project as we can always go back to an older version. However, you can cause a lot of work for yourself/the release manager.  


*Hint*: Git has a great CLI (Command Line Interface): <br >
* For most GUIs you need to know the commands (PULL, PUSH, ADD, COMMIT, …). The bash gives a lot of additional information which can help you solving your git problems 😊  

*Hint*: Use a ssh-key to commit your code. 
* You can setup your system to push via a ssh key. This way you do not have to enter your password all the time.

## 3. Git Basics
Please mind: Git is a very powerful software. Therefore, it may contain multiple paths to one goal. The following will do:
### 3.1 **Uploading changes:**
Use ``git add path/to/file`` to stagde a change for a commit.<br />Example:
  ```
  git add README.md
  ```
Use ``git commit`` to commit to the stagded changes. Use the parameter ``-m`` to add a commit message. Use ``--signoff`` or ``-s`` to sign off your commit. <br />Example:
  ```
  git commit -m "my commit msg for this commit" --signoff
  ```
Use ``git push`` to upload your commits to our repoitory. 

In most cases, git will inform you if any problems occure. E.g. your version might be behind the origin branch (origin = repository in GitHub).
Then you will have to ``git pull`` first. This might result in an auto merge. If not, you will have to merge the changes manually. 
For this task, please ask someone to help as you can harm the project.

### 3.2 **Branches**
- Use ``git checkout branchname`` to switch branches. <br />Example:
```
  git checkout main
  ```
- Use ``git checkout -b new_branchname`` to create a new branch. This will create a new branch with all the tracked files of the current branch, so make sure you are in the correct branch before creating a new one.<br />Example:
```
  git checkout -b featurebranch_sendMailToUser
  ```
- Use ``git branch`` to list all branches.

### 3.3 **Merging**

- Use ``git merge`` to merge the changes of another branch *branchname* into the current branch. <br />Example: The following will merge the main branch into the current branch.
```
  git merge main 
```
  ! **Attention**: It will use the current version on your system! It will NOT pull any branches. In this example, it would not check for new changes at the origin (= GitHub repository) and merge only the local changes of the main branch. 
  You as a user have to pull manually before! 
- DO NOT USE ``git rebase`` to merge a branch. Use it only and only if you are really sure what you are doing. You can destroy a project with it!

### 3.4 **Undo unpublished commit / change unpublished commit message**

To undo the last commit without deleting the changes, use:
```
 git reset HEAD~1 --soft
```
This can be used in order to change the commit message of an unpublished (= not yet pushed) commit. <br > <br >
If you want to delete your last commit completely and delete all changes made, use: 
```
 git reset HEAD~1 --hard
```

### 3.4 **Overview of the branch**


### 3.5 Changing pushed/published commits
Changing the commit or the commit message of a published commit should never be done with git reset. 
This is possible, but dangerous. Therefore, it is strongly recommended not to change published commits.
As a beginner, you should never attempt to execute this task without any help.



## 4. Feature Branch Workflow
Please read the following: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow<br >
**Summary**: 
* Create a new branch for each feature / bugfix
* Create a pull request after completing a feature / bugfix 
* Main is always a “working” product 
* Do small commits if possible 
  * Allows frequent push and pull and reduces the amount of merges 
  * Makes it easier to find good commit messages.  

## 5. Git Co-authored
See this [file](https://github.com/amosproj/amos2022ss04-digital-identity/blob/main/Documentation/dev/HowToCoAuthor.md) for the description.

## 6. Git Tags and how to release
Steps for releasing during AMOS:
### Tag a Release-Candidate:
- Decide oh the commit you want to propose as a release-candidate
- Copy the SHA (e.g. b0d9955e98f9a9708c55925ad923adabc86005db for sprint 4 release
- Execute the following on your local shell. Mind, the git tag command will ask you to enter a msg. Either you will use your default editor (propably vim) or you can use ``-m "my title\n\nmydiscription"``
```
git checkout main
git pull
git checkout <sha-of-the-release-candidate>
git tag -a sprint-XY-release-candidate
git push --tags
```
### Create a Release-Candidate on GitHub:
- Go to GitHub and to releases.
- Now you can create a releases based on a tag.
- Fill out the form, do not forget a link to the changelog
- Do not forget to 
### Tag a Release:
- During the meeting the POs decide whether to release or not
- In some cases the release candidate may have to be adjusted. Therefore, you may have to use anthoer commit.
- Proceed as listed above
### Create a Release on GitHub: see above
