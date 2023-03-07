# my-git-version-control-system
it is a project that goes under the hood of the version control system
this is a prototype of git system that works with the .txt file
this code initialises the repo repository which is same as the git repository that we work with and have objects file that have hash of the filecontents and the head which is our 
parent file and the index folder that keeps on the updaing the system staging 


use:
first try to craete text files under the ..bin/src folder with any number of directories
you should  have node.js installed

init.mjs : running this file will initialise your repository and create a .repo folder
status.mjs : it will check the files by checking their staging and if the files are changed or not staged it will printout the files that needs to staged
add.js --  : now this is the equvalent of git add which put your files into the staging are i.e make the hash of the files
commit.mjs : this  is the main command that commit your staged files and create the tree and object files needed for the repository 

you can play around with the files as much as you want as it will create the object fles with the following above commands


this version control system doesnt invode the git diff and gt branch git merge and most importantly the git checkout functonality

but this code provides the basic of how the version control system keep track of ypur files 
for the extended learning about the git and version control system kindly follow the git repository as it is open source
https://github.com/git/git
or you can folow this blog for the inspiration 
https://tom.preston-werner.com/2009/05/19/the-git-parable.html
