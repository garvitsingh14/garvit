import fs from "fs"
import {workingdirectory,hashfile,sha1,grabindexdata,updateindexdata,createindexstring} from "./utils.mjs"

    const status= ()  => {
    console.log("we will now be proceeding with the checking")
   const indexdata1=grabindexdata();
   const notstaged=[];
   const notcommited=[];
   console.log("comapring files and flagging them accordingly");
   const updatedindexdata=Object.keys(indexdata1).reduce((acc,curr) => {
     const hash2=hashfile(curr);
     if(hash2 !== indexdata1[curr].hash)
     {
       acc[curr]= {
         hash: hash2,
         staging: "",
         repository: ""
         //staging: indexdata1[curr].staging,
         //repository: indexdata1[curr].repository
       };
       notstaged.push(curr);
     }
     else
     {
       if(indexdata1[curr].hash !== indexdata1[curr].staging)
       {
         notstaged.push(curr);
       }
       else if(indexdata1[curr].staging !== indexdata1[curr].repository) {
         notcommited.push(curr);
       }
     acc[curr]=indexdata1[curr];
   }
   return acc;
 },{});

   updateindexdata(updatedindexdata);

    console.log("these files need to be updated and bring back to the staging area");
    notstaged.map((message) => {
      console.log(message);
    });

    console.log("these files are upto date with the content but not commited");
    notcommited.map((message) => {
      console.log(message);
    });


};
 status();
