var fs = require("fs");
var path = require("path");

function replacer(match, p1, p2, offset, string){
    if(p2.includes("icon")){
      return [p1," android:requestLegacyExternalStorage=\"true\" ",p2].join("");
    }else{
      return [p1,p2].join("");
    }
  }

module.exports = function(context){

    var manifestpath = path.join("platforms","android","app","src","main","AndroidManifest.xml");
    var manifest = fs.readFileSync(manifestpath, "utf8");

    var regex = /(<\?xml [\s|\S]*<application) (android:[\s|\S]*<\/manifest>)/gm;
    
    manifest = manifest.replace(regex,replacer);

    fs.writeFileSync(manifestpath, manifest);

    
};
