//humare saath shree raghunath toh kis baat i chinta nahin


import fs from "fs";
import {workingdirectory,contentsinfile,sha1,blobhash,compressionofblob,grabindexdata,hashfile,updateindexdata} from "./utils.mjs";

const add= () => {
  const dir=workingdirectory();
  const files=process.argv.slice(2);
  /*this is a great piece of code actually process.argv takes whatever nside the command line with spaces
  as the argument but slice(2) because we hsve two extra srgumnets at the top i.e the node file path and node itself
  which is unrequired in our whole process*/


  const updatedindexdata=files.map((file) => {
    const blob=contentsinfile(file);
    const hashofblob=blobhash(blob);
    const blobdir=hashofblob.slice(0,2);
    const blobobject=hashofblob.slice(2);
    fs.mkdirSync(dir+"/.repo/objects/"+blobdir);
    const compressedblob=compressionofblob(blob);
    fs.writeFileSync(dir+"/.repo/objects/"+blobdir+"/"+blobobject,compressedblob);
    const hash4=hashfile(file);
    return {
      hash4,file,
    };

  });

   console.log(updatedindexdata);
   const indexdata=grabindexdata();
   const updatedversionofindexdata= Object.keys(indexdata).reduce((acc,curr) => {
     if(!updatedindexdata.find((item) => (
       item.file===curr )
     )) {
       acc[curr]=indexdata[curr];
       return acc;
     }
         acc[curr]={
           hash:indexdata[curr].hash,
           staging:updatedindexdata.find((item) => (  //find function returns the item that matches our expectation
             item.file===curr )
           ).hash4,
           repository:indexdata[curr].repository
       };
       return acc;
     },{});
     console.log(updatedversionofindexdata);
     updateindexdata(updatedversionofindexdata);



};
add();
