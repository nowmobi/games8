function create_stage(width,height)
{
    this.width=width;
    this.height=height;
    this.transx=function(x){
        return this.width/2+x;
    }
    this.transy=function(y){
        return this.height-y;
    }
    this.op_transx=function(x){
        return x-this.width/2;
    }
    this.op_transy=function(y){
        return this.height-y;
    }
}
var stage= new create_stage(mycanvas.width,mycanvas.height);