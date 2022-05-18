## Foreword
These policies are guidelines to follow. They are not aimed to replace the *git* documentation nor a tutorial on how to use git in the first place.
They are aimed to 
* give a brief overview of the most common commands,
* to agree on how to use branches,
* to agree on how to merge, 
* and to describe how we as a team work with git.

# Git Policies
## 1. Table of Contents
1. ToC
2. General
3. Git Baiscs 
4. Feature Branch Workflow
5. [Git Co-authored] ()
## 2 General
ALWAYS PULL and PUSH 
* Noone likes merging a lot. By pulling and pushing we can reduce the amount of merge conflicts 
Use git merge instead of git rebase  
* Git rebase can be a lot more work to fix if used wrongly 
Create a *Pull Request* to merge your branch into the *main* or *dev* branch.
* Please tag the *Release Manager* and someone who will review your code.
Ask friends for help if git is weird 😊  
* In most cases you will not destroy a project as we can always go back to an older version. However, you can create a lot of work for yourself/the release manager.  
*Hint: Git has a greate CLI(Command Line Interface)
* Most GUIs need you to know the commands (PULL, PUSH, ADD, COMMIT, …). The bash gives a lot of additional information which can help you solving your git problems 😊  
*Hint: Use a ssh-key to commit your code. 
* You can setup your system to push via an ssh key. This way you do not have to enter your password all the time.

## 3. Git Basics
Please mind: Git is a very powerful software. Therefore it may contain multiple ways to a goal. The following will do 
### 3.1 Uploading Changes:
1) use ``git add path/to/file`` to stagde a change for a commit.<br />Example:
  ```
  git add README.md
  ```
2) use ``git commit`` to commit to the stagde changes. Use the parameter ``-m`` to add a commit message. Use ``--signof`` or ``-s`` to singoff your commit<br />Example:
  ```
  git commit -m "my commit msg for this commit" --signoff
  ```
3) use git push to upload your commits to our repo. 

In most cases git will inform you, if any problems occured. E.g. your version might be behind the orign branch (origin = repo in github).
Then you will have to ``git pull`` first. This might result in a auto merge. If not you will have to merge the changes manually. 
For this task, please ask someone to help as you can harm the project.

### 3.2 Branches
- Use ``git checkout branchname`` to switch branches. <br />Example:
```
  git checkout main
  ```
- Use ``git checkout -b new_branchname`` to create a new branch.<br />Example:
```
  git checkout -b featurebranch_sendMailToUser
  ```
- Use ``git branch`` to list all branches.

### 3.3 Merging

- Use ``git merge`` to merge the changes of another branch A into the current branch. <br />Example: The following will merge the main of the current branch into the main.
```
  git merge main 
```
  ! **Attention**: It will use the current version on your system! It will NOT pull any branch. In this example, it would not check for new changes on the origin and merge only the local changes of the main branch. 
  You as a user need to pull before manually! 
- DO NOT USE ``git rebase`` to merge a branch. Use it only and only if you are really sure what you are doing. You can destroy a project with it! 


## 4. Feature Branch Workflow
Please read the following: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow 
**Summary**: 
* Create a new branch for each feature / bugfix
* Create a pull request after completing a feature / bugfix 
* Main is always a “working” product 
* Small commits if possible 
  * Allows frequent push and pull and reduces the amount of merges 
  * Makes it easier to find good commit messages.  

## 5. Git Co-authored
