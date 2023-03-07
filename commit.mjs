import fs,{ access } from "fs";
import {type} from "os";
import {workingdirectory,grabindexdata,contentsinfile,blobhash,updateindexdata,createtree,createcommithash,getparent} from "./utils.mjs";
import zlib from "zlib";


const basictree= (paths) => {
  return paths.reduce( (parent,currentvalue,index) => {
    currentvalue.split("/").reduce( (p,name,index1,{ length }) => {
      if(!p.children) {
        p.children=[];
      }
      let temp=p.children.find((item) => item.name===name);
      if(!temp)
      {
        temp={name};
        if(index1+1===length)
        {
          temp.type="blob";
           var a=contentsinfile(currentvalue);
          temp.hash=blobhash(a);
        }
        else {
          temp.type="tree";
        }
       p.children.push(temp);
      }
      return temp;
    },parent);
    return parent;
  },{ children: [] }).children;
};


const commit= () => {
  const dir=workingdirectory();
  const indexdata=grabindexdata();
  const paths=Object.keys(indexdata).filter((item) =>
    /*indexdata[item].staging!=="" || indexdata[item].repository!=="" &&*/  indexdata[item].staging!==indexdata[item].repository);
    console.log(paths);
  const arrayoftree=basictree(paths);
  console.log(arrayoftree);
  const flattree= arrayoftree.reduce( (acc,curr,index) => {
      if(curr.children) {
        const hash5=createtree(curr.children);
        const clone=Object.assign({},curr);
        delete clone.chilren;
        clone.hash=hash5;
        acc.push([clone]);
        acc.push(curr.children);
        }
        else {
          acc.push(curr);
        }
        return acc;  //we splitted our array arrayoftree and created arrays inside it that have name value and hash properties;
    },[]);
      console.log(flattree);
  const rootobject=flattree.reverse()[0];
  //const rootobject=createtree(root);
  const parent =getparent();
  const commit= {
    tree:rootobject,
    parent: parent===undefined ? null : parent,
    author :"garv",
    commiter: "garv",
     message : "hardcoded message"  };
       //creating the hash of the root tree

  const commithashmain=createcommithash(commit);

  const upgradationindex=Object.keys(indexdata).reduce( (acc,curr ) => {
    if(indexdata[curr].repository != indexdata[curr].staging)
    {
      acc[curr]= {
        hash: indexdata[curr].hash,
        staging: indexdata[curr].staging,
        repository: indexdata[curr].staging,
      };
    }
    else {
      acc[curr]=indexdata[curr];
    }
      return acc;
  },{});

  updateindexdata(upgradationindex);
  fs.writeFileSync(dir+"/.repo/HEAD",commithashmain);


};






commit();
