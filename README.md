<!DOCTYPE html>
<html>
<head>
</head>
<body>
<h1>Git Commands</h1>
 
<h4>What is Git?</h4>
<pre> 
	Git is a widely used modern version control system for tracking changes in computer files.
	The term version control system suggests a system that records all the changes made to a file or set of data,
	so a specific version can be considered whenever needed.
	Git is a version control system.
	Git helps you keep track of code changes.
	Git is used to collaborate on code.
	Git is a popular version control system. It was created by Linus Torvalds in 2005,
	and has been maintained by Junio Hamano since then.
</pre> 

<h4>What does Git do?</h4>
<pre>
	Manage projects with Repositories
	Clone a project to work on a local copy
	Control and track changes with Staging and Committing
	Branch and Merge to allow for work on different parts and versions of a project
	Pull the latest version of the project to a local copy
	Push local updates to the main project
</pre>

<h4>Why git ?</h4>
<pre>
	Over 70% of developers use Git!
	Developers can work together from anywhere in the world.
	Developers can see the full history of the project.
	Developers can revert to earlier versions of a project.
</pre>

<h4>Different between git & github</h4>
<pre>
	Git is a distributed version control system for tracking changes in source code during software development.
	Git is a version control system to track changes in source code
	Git is a tool that's used to manage multiple versions of source code edits that are then transferred to files in a Git repository
	Git is a tool that a developer installs locally on their computer


	GitHub is a web-based Git repository hosting service that offers all of the distributed revision control and source code management functionality of Git as well as adding its own features
	It is a collaboration and version control platform for storing and managing code
	GitHub is a centralized source code hosting service
	GitHub is an online service that stores code pushed to it from computers running the Git tool
</pre>

<h4>What are some alternatives to GitHub</h4>
<pre>
	GitLab
	Bitbucket
	Gitea
	SourceForge
	Launchpad
	Google Cloud Source Repositories
	AWS CodeCommit
	GitBucket
	Assembla
	Jira
</pre>

<h4>What are the main differences between GitLab and GitHub</h4>
<pre>
	GitLab offers a free community edition,
	GitHub offers a free plan for public repositories, but charges for private repositories
</pre>

<h4>Repository</h4>
<pre>
	A repository (repo) is collection of files and directories that are managed by git.
	repository contains all the information about the project, including history of changes
	who made the changes,and when the changes were made.

	repository is like digital folder that contains all files,folder,code and documentation for a project

	1 local repository 
	2 remote repository
</pre>

<h4>Differences between Local and remote repository</h4>
<pre>
	Local repository is copy of the repository that exists on your computer.
	Remote repository is copy of the repository that exists on a separate serve or hosting service
	such as github,gitlab or bitucket.
</pre>

<h4>What is git directory</h4>
<pre>
	Git directory is a hidden directory that git users to store all the metedata and object database for git repository
</pre>

<h4>Untracked file</h4>
<pre>Untracked file is file in your git repository that git is not currently aware of tracking
	Git is not monitoring the file for changes and the file is not included in git history or commits

</pre>

<h4>Tracked file</h4>
<pre>
	Tracked file is git is aware of and is being tracked by git.
</pre>

<h4>Unstaged</h4>
<pre>
	Unstaged refers to changes that you have made to your files in git repository that 
	have not yet been added to the staging area using the git add command.
	Changes you are made have not yet beenn included in the next commit.
</pre>

<h4>Staged</h4>
<pre>
	The staged area is where you prepare changes to be included in the next commit.
	After making changes to files in your working directory, you can stage them using the git add command.
 	This marks the changes to be included in the next commit.
</pre>

<h4>Snapshot</h4>
<pre>
	Each commit in a git repository is unique snapshot that represents a specific version of the project.
</pre>

<h4>Commmit</h4>


<h4>View Configure git</h4>
<pre>
	git config --global user.name
	git config --global user.email

	git config --global --list (View All Global Configuration)
</pre>	

<h4>Set Configure git</h4>
<pre>
	git config --global user.name "jakdoe"
	git config --global user.email "jakdoe@gmail.com"
</pre>	

<h4>git version</h4>
<pre> 
	-> git --version
</pre> 

<h4>git Initialize</h4>
<pre> 
	The command git init is used to create an empty Git repository. 
	We have to navigate to our project directory and type the command git init to initialize a Git repository for our local project folder.
	Create a local repository.

	-> git init
	-> git init (repo name)
</pre> 

<h4>git clone</h4>
<pre> 
	Downloads a project with the entire history from the remote repository.
	Make a local copy of the server repository.
	
	-> git clone project url (remote Url)
</pre>


<h4>2: git status </h4>
<pre> 
	Displays the status of your working directory. Options include new, staged, and 
	modified files. It will retrieve branch name, current commit identifier, and changes pending commit.
		
	-> git status
</pre>

<h4>git show</h4>
<pre> 
	The git show command is used to display information about various objects in a Git repository, 
	such as commits, tags, trees, and blobs. 
	
	-> git show
</pre> 

<h4>git remote </h4>
<pre> 
	Once everything is ready on our local system, we can start pushing our code to the 
	remote (central) repository of the project.

	-> git remote add origin URL
</pre> 

<h4>git add</h4>
<pre> 
	Add command is used after checking the status of the files, to add those files to the staging area.
	Before running the commit command, "git add" is used to add any new or modified files.
	This will add the specified file(s) into the Git repository.

	-> git add
	-> git add . (This will take all our files)
	-> git add index.html
</pre>

<h4>git commit</h4>
<pre> 
	The commit command makes sure that the changes are saved to the local repository.
	The command "git commit –m (message) allows you to describe everyone and help them understand what has happened.

	-> git commit -m "message details"
</pre>

<h4>git commit history</h4>
<pre> 
	Display the most recent commits and the status of the head.

	-> git log

	Display the output as one commit per line.

	-> git log --oneline

	Displays the files that have been modified.

	-> git log --stat

	Display the modified files with location.

	-> git log -p

	Display the modification on each line of a file.

	-> git blame (file name)

	View commit history for a specific directory.

	-> git log -- (directory_path)

	View commit history with graphical representation.

	-> git log --graph --oneline --decorate --all

	View commit history for a specific branch.

	-> git log (branch_name)

	View the last n commits.

	-> git log -n (number_of_commits)

	display only the last (most recent) commit.

	-> git log -1

	View commit history for a specific author.

	-> git log --author = author_name
	-> git log --author= author_name --branches= branch-name
</pre> 

<h4>git track changes</h4>
<pre> 
	This command shows the file differences which are not yet staged.
	Show changes between working directory and staging area.
	Track the changes that have not been staged.
	
	-> git diff [file]
	-> git diff index.html

	Track the changes that have staged but not committed.

	-> git diff --staged

	Track the changes after committing a file.

	-> git diff HEAD

	Track the changes between two commits.

	-> git diff (commit1-sha) (commit2-sha)

	Git Diff Branches:

	-> git diff (branch 1) (branch 2)
</pre>

<h4>Ignoring files</h4>
<pre>
	Specify intentionally untracked files that Git should ignore.

	-> touch .gitignore

	List the ignored files.

	-> git status --ignored
	-> git ls-files --other --ignored --exclude-standard
</pre>

<h4>git Branching</h4>
<pre> 
	The git branch command is used to determine what branch the local repository is on.
	
	Create a new branch.

	-> git branch branch name

	List only local branches.

	-> git branch --list

	List all branches (local and remote).

	-> git branch -a

	Delete Branch.

	-> git branch -d branch name
	-> git branch --delete branch name

	Delete a remote Branch.

	-> git push origin -delete branch name

	Rename Branch.

	-> git branch -m old branch name  new branch name
</pre> 
 
<h4>git fetch</h4>
<pre> 
	Downloads branches and tags from one or more repositories.
	
	Fetch the remote repository.

	-> git fetch repository Url

	Fetch a specific branch.

	->  git fetch branch URL branch name

	Fetch all the branches simultaneously.

	-> git fetch --all

	Synchronize the local repository.

	-> git fetch origin
</pre> 

<h4>git Checkout</h4>
<pre> 
	Downloads branches and tags from one or more repositories.
	
	Checkout a branch.

	-> git checkout branch name

	Create a new branch and switch to it.

	-> git checkout -b new_branch_name

	Checkout a specific commit (detached HEAD state).

	-> git checkout commit_hash

	Switch back to the last branch you were on.

	-> git checkout -

	Discard unstaged changes in a file.

	-> git checkout -- file_name

	Discard all unstaged changes (use with caution).

	-> git checkout .

	Create a new branch from a remote branch and switch to it.

	-> git checkout -b new_branch_name origin/ remote_branch_name

	Revert changes to a specific file to match the last commit.

	-> git checkout HEAD -- file_name

	Revert changes to all files in the working directory to match the last commit.

	-> git checkout HEAD -- .

	Checkout a specific file from another branch (useful for merging specific files from one branch into another).

	-> git checkout branch_name -- file_name
</pre> 


<h4>git pull</h4>
<pre> 
	The git pull command is used to fetch and merge changes from the remote repository to the local repository.
	The command "git pull origin master" copies all the files from the master branch of the 
	remote repository to the local repository.

	Pull Changes from a Remote Repository.

	-> git pull

	Pull the data from the server.

	-> git pull origin master

	Pull Changes from a Specific Remote Branch.

	-> git pull (remote-name) (branch-name)

	Pull Changes from a Remote Repository without Merging.

	-> git pull --rebase

	Pull Changes from a Specific Remote Branch without Merging.

	-> git pull --rebase (remote-name) (branch-name)

	Pull Changes from a Remote Repository Verbosely.

	-> git pull --verbose
</pre> 


<h4>git push</h4>
<pre> 
	The command git push is used to transfer the commits or pushing the content from the local repository to the remote repository.
	git push origin [branch name]

	-> git push -u origin master

	Push Changes to the Default Remote Repository.

	-> git push

	Push Changes to a Specific Remote Repository.
	-> git push (remote-name)

	Push Changes to a Specific Remote Branch.

	-> git push (remote-name) (branch-name)

	Force Push Changes to Remote Repository.

	-> git push --force
	-> git push -f

	Push Changes to a Specific Remote Branch and Set Upstream.

	-> git push -u (remote-name) (branch-name)

	Push Changes Verbosely.

	-> git push --verbose
</pre> 

<h4>8: git merge</h4>
<pre> 
	The git merge command is used to integrate the branches together. The command combines the changes from one branch to another branch.
	-> git merge branch_name   
</pre> 

<h4>9: git remote  </h4>
<pre> 
	The git remote command is used to create, view, and delete connections to other repositories. 
	-> git remote add origin address
</pre> 


<h4>13: git revert</h4>
<pre> 
	Revert is used to revert some changes. The git revert command is used to apply revert operation. It is an undo type command.
	Revert is the command we use when we want to take a previous commit and add it as a new commit, keeping the log intact.

</pre> 

<h4>14: git rm </h4>
<pre> 
	This command is used to delete a specific file from the current working directory and stages the deletion. 
	Dleting a specific file from the  current working directory and stages the deletion.
	git rm [filename]
	-> git rm test.php
</pre>

<h4>14: git stash </h4>
<pre> 
</pre>

<h4>14: git cherry pick </h4>
<pre> 
	Cherry-picking in Git stands for applying some commit from one branch into another branch.
	In case you made a mistake and committed a change into the wrong branch, but do not want to merge the whole branch. You can revert the commit and apply it on another branch.
	Cherry-pick is a useful tool, but always it is not a good option.
	We want to merge a whole branch into another branch. You only need to pick one or two specific commits. To pick some changes into your main project branch from other branches is called cherry-picking.
	-> git cherry-pick <commit id>  
	-> git cherry-pick 776a7cb605b5f1281f963ea39f70a194f15a92b1	
</pre>

<h4>ow to check new branch is created from which branch</h4>
<pre>
	git show-branch --current
</pre>


<h4>Git merge and git rebase</h4>
<pre>
	
	1 git merge is that git merge is a way of combining changes from one branch into another, preserving the history of the source branch

	1 git rebase is a way of moving the changes from one branch onto another, typically the master branch, and flattening the history by removing unwanted entries.


	2 When using git merge, a new merge commit is created
	2 git rebase creates a new set of commits applied on top of the target branch, resulting in a linear history.


	3 git merge is used to join two or more development histories together, preserving the original history
	3 git rebase is used to integrate the changes from one branch into another, creating a linear history and applying changes in a more orderly manner



	Git Merge:
	Functionality: git merge creates a new commit that combines the changes from one branch (the source branch) into another (the destination branch).
	Commit History: This creates a new merge commit, preserving the commit history of both branches. It shows the point where the two branches diverged and where they were merged.
	Clarity in History: It maintains a clear linear history but may introduce frequent merge commits, resulting in a more cluttered history, especially in complex projects with many branches.


	Git Rebase:
	Functionality: git rebase moves or rewrites the commit history of a branch by applying the commits from one branch onto another branch.
	Commit History: It reapplies the commits from the source branch onto the tip of the destination branch, creating a new linear history without extra merge commits.
	Clarity in History: It produces a cleaner and more linear history, as if the changes on the rebased branch were originally made on top of the destination branch. However, it rewrites commit history, which could potentially cause conflicts or difficulties for collaborators who also have the old commits.



	Choosing Between Rebase and Merge:
	Use Merge When:

	Preserving the history of the branches is important.
	Collaboration among multiple developers is ongoing, and maintaining a clear history is essential.
	You want to create a merge commit to clearly indicate the point where branches were merged.
	Use Rebase When:

	You want a cleaner, more linear history, avoiding unnecessary merge commits.
	Your changes are local and haven't been shared or collaborated on by others.
	You're working on a feature branch and want to incorporate the latest changes from the main branch without creating a merge commit.
</pre>
</body>
</html>
