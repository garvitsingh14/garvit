//this line of code tells how we can basically export functon to any piece of code
import fs from "fs"
import crypto from "crypto"
import zlib from "zlib"


export const workingdirectory = () => {
const directory = process.cwd();
return directory + "/src";

};

export const hashfile = (file) => {
  const path=getfilepath(file);
  const contents=fs.statSync(path);
  //console.log(contents); //this function returns the details of the files
  delete contents["atime"];
  delete contents["atimeMs"];
  return sha1(contents);

};

  const getfilepath= (file) => {
  const dir=workingdirectory();
  return dir+"/"+file;
};

export const sha1= (contents) => {
   const string = JSON.stringify(contents);  //this is a simple funtion which just creates a simple string of the objects
   return crypto.createHash("sha1").update(string).digest("hex")
};


export const grabindexdata = () => {
  const dir=workingdirectory();
  return JSON.parse(fs.readFileSync(dir+"/.repo/index"),{encoding: "utf-8" });
};


export const updateindexdata= (yo) => {
  const dir=workingdirectory();
  const data2=createindexstring(yo);
  fs.writeFileSync(dir+"/.repo/index",data2);
}


export const contentsinfile= (file) => {
  const dir=workingdirectory();
  return fs.readFileSync(getfilepath(file),{ encoding: "utf-8" });
};


export const blobhash= (blob) => {
  return sha1({type:"blob",blob});
};

export const compressionofblob= (contents) =>
{
  return zlib.deflateSync(contents);
};
/*understanding the javascript array reduce function
reducer function is one of the most fundamental used function and relly importnt in understanding arrays and other stuff
so ets  take the example
for(i=0; i<10 i++)
{
  sum =sum=arr[i];
}
here i is the arr[i] is the elemnt of our array
the sum is the accumulator it accumalte sthe value of the array by iterating it over one by one and it is
awesome if you think abput it so we can use if at the end we want to iteratoe over the values*/

export const createindexstring= (data) => {
  return JSON.stringify(data);

};



export const createtree = (content) => {
  const clone=Object.assign([],content);
  const num1=clone.map( (item) => {
    delete item.children;
    return item;
  });
  const dir=workingdirectory();
  const sha=sha1(num1);
  const shaforcompression= JSON.stringify(num1);
  const commitdir=sha.substring(0,2);
  const commitobject=sha.substring(2);
  const compressedcommit=compressionofblob(shaforcompression);
  fs.mkdirSync(dir+"/.repo/objects/"+commitdir);
  fs.writeFileSync(dir+"/.repo/objects/"+commitdir+"/"+commitobject,compressedcommit);
  return sha;
};

export const createcommithash= (commit) => {
  const dir=workingdirectory();
  const commithash1=sha1(commit);
  const commitcompression=JSON.stringify(commit);
  const commitdirmain=commithash1.substring(0,2);
  const commitobjectmain=commithash1.substring(2);
  const compressedcommitmain=compressionofblob(commitcompression);
  fs.mkdirSync(dir+"/.repo/objects/"+commitdirmain);
  fs.writeFileSync(dir+"/.repo/objects/"+commitdirmain+"/"+commitobjectmain,compressedcommitmain);
  return commithash1;
};

export const getparent= () => {
  const dir=workingdirectory();
  return fs.readFileSync(dir+"/.repo/HEAD", { encoding: "utf-8"});
};
