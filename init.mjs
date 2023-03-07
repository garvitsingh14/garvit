//humare saath shri raghunath to kis baat ki chinta nahi
import fs from "fs";
import glob from "glob";
import {workingdirectory,hashfile,createindexstring,sha1} from "./utils.mjs";


    const init= () => {
     console.log("here we will be getting the working directory  ")
     const dir=workingdirectory();
     const files = glob.sync("**/*.txt", { cwd: dir });
     console.log(files);

console.log("lets try creating the index")
const indexdata = files.reduce((acc,curr) => {         //here this is a callback function and it simply works  as an accumulator
      const hash1=hashfile(curr);
      acc[curr]= {
        hash: hash1,                    /* here in this method we actually use the accumulator in the reduce to use it as paret object and inside it will contain the keys which are the files in the working directory
                                   and using those files we will create our initial index page our index page contains th hash that can be used to differntiate the file from any other files
                                and is the main purposebused in checking status oftje file and initialising the file we will be updating out index file as soon as we encounter a new change or we our now in ahead steps of
                                staging or rpository*/

        staging: "",
        repository:""
      };
  console.log(acc);
   return acc;
},{});

console.log("now we will be creating the git repo files")
fs.mkdirSync(dir+"/.repo");
fs.writeFileSync(dir+"/.repo/index",createindexstring(indexdata));
fs.mkdirSync(dir+"/.repo/objects");
fs.writeFileSync(dir+"/.repo/HEAD","");

};
init();

/*here i end the init file in the node version it simply just takes our working directory select the text files
iterate over these text files to create a good sha1 fyunction value and the value of staging and reposity and it also
xreates te folders we will be working in the later version*/


/*here the indexdata is a great piece of code ie written for the great versions
reduce basically takes our data as a callbackback function in that it has accuularor becomes a object inside the accumulator
tehre are other objects which are the file names and their index data*/
