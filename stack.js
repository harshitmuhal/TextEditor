export{Stack}

class Stack{
    
    constructor(){
        this.stack=[];
        this.size=0;
        this.buffer=4;
    }
    
    clear(){
        this.size=0;
        this.stack=[];
    }
    
    isempty(){
        return (this.size==0);
    }

    //in text editor either we type or delete (using backspace) so there are 2 types of operation which we 
    //have to keep track off ie insert and delete where for insert type=0 and delete type=1. insertion in stack
    //takes place when top of element has operation of different type or empty stack or operations are same but 
    //buffer is full
    push(type, char){
        if(this.isempty()){
            if(type==1){ //No use of storing backspace operation for empty stack
                return;
            }
            this.stack.push([type,char]);
            this.size++;
            return;
        }
        let top=this.stack[this.size-1];
        if(type==top[0] && top[1].length<this.buffer){
            top=this.stack.pop();
            top=char+top[1];  //sequence is very imp because char+top[1] means most recent character at beginning
            //so if intially we had "cba" and push for 'd' is demanded then top will be "dcba" ..stack is "dcba" for 
            //message typed as "abcd". this is required for delete operation.
            this.stack.push([type,top]);
        }
        else{
            this.stack.push([type,char]);
            this.size++;
        }
        return this.stack[this.size-1];
    }
    pop(){
        if(!this.isempty()) {
            this.size--;
            return this.stack.pop(); //return top element and pop it
        } else{
            return [-1,''];
        }
    }
};








