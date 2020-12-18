function validate(){
    var name=document.contactForm.name.value;
    var x=document.contactForm.email.value;  
    var atposition=x.indexOf("@");  
    var dotposition=x.lastIndexOf(".");  
    var status = false;
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length ){ 
        document.getElementById("emailspan").innerHTML = "Invalid";
        status = false
    }
    else{
        status = true;
    }  
    if(name.length<1){
        status=false;
        document.getElementById("namespan").innerHTML = "Invalid";
    }
    return status;
}

function getData(){
    const data = JSON.parse(sessionStorage.getItem("images"));
    return data;
}
function isExists(name){
    const data = getData();
    if((data.filter(function(item){
        return item.name == name;         
    })).length > 0){
        return true;
    }
    else{
        return false;
    }
}
function run(){
    console.log(getData());
}

function add(){

    const url = document.addImageForm.url.value;
    const name = document.addImageForm.name.value;
    const info = document.addImageForm.info.value;
    const date = document.addImageForm.date.value;

    const data = getData();

    if(data == null){
        sessionStorage.setItem("images", JSON.stringify([]));
        data = getData();
    }
    else{

        if(isExists(name)){
            const photo = data.map(item => {
                if(item.name === name){
                    return{
                        url, name, info, date
                    }
                }
                else{
                    return item;
                }
            })
            sessionStorage.setItem("images", JSON.stringify(photo));
        }
        else{
            if(url && name && info && date){
                
                data.push({url, name, info, date});
        
                sessionStorage.setItem("images", JSON.stringify(data));
        
                document.getElementById("namespan").innerHTML="";
                console.log(data);
            }
        }
    }
    return true;  
}
function remove(){

    const name = document.removeImageForm.name.value;

    const data = getData();

    if(isExists(name)){
        const photo = data.filter(item => item.name !==name);

        sessionStorage.setItem("images", JSON.stringify(photo));

        return true;
    }
    else{
        document.getElementById("namespan").innerHTML = "Not Found";
        return false;
    }

}
function loadImages(){
    const data = getData();
    console.log(data);
    for(i=0;i<data.length;i++){
        var photo = document.createElement("img");
        photo.src = data[i].url;
        var element = document.getElementById("image");
        console.log(element);
        element.appendChild(photo);
    }
}
function test(){
    console.log("yes");
    document.getElementById("title").textContent="Update Image";
    return true;
}


