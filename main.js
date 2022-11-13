class Square {

    constructor() {
        this.defaultWindowSize = window.innerHeight;
        this.bodyHeight = this.defaultWindowSize;
        this.maxHeight = this.bodyHeight + 100;
        this.heightUsed = 0;
        this.exPermission = true;
        this.stopPoint = 0;
        this.heightSum = 0;
        this.newheightSum = 0;
        this.exScrollPermission = false;
        this.arr = null;
        this.noOfMainDiv = 0;
        this.scrollWindow = 0;
        this.scrollTop = 0;
        this.WINDOWS = [];
        this.storedWindows = [];
    }


    html(dom, activity) {

    }
    appendDOM(dom, activity, n) {

        let behaviour = { onload: false, fetchScroll: false, upScroll: false, downScroll: false }
        let exec = false;

      
        if (n == 0) { behaviour.onload = true; }
        if (n == 1) {

           
            
            if(activity.scrollTop + activity.offsetHeight < this.scrollTop){
                
                behaviour.upScroll = true;
             
            }else{
                behaviour.downScroll = true;
            }
        
            this.scrollTop = activity.scrollTop + activity.offsetHeight;
           
            

            if (this.scrollTop > this.bodyHeight - 100) {
                behaviour.fetchScroll = true;
                this.exPermission = true;
                this.bodyHeight += this.defaultWindowSize;

                

        
                this.noOfMainDiv += 1;
        
                exec = true;
            }
        };

        // TODO #2 OnScrollUp trigger hidden partial windows to display.



         // TODO #7 On scroll up/down, save revertable element state in memory.
    

         // We can create 2 array: 
         
         // 1. 1st array windows containing 
        
            if(behaviour.upScroll){
               
                // console.time("onUpScroll"); 
             
                let lastStoredWin = this.WINDOWS.findLast((e, i, a) =>{ return e['dir'] == "up"});
                // console.log(lastStoredWin);

                if(lastStoredWin != undefined) {

                let e = document.querySelector(".m_"+lastStoredWin['stopId']);

            
                if(activity.scrollTop < lastStoredWin['scrollTop']){

                  
                   
                    // e.style.opacity =  '1';
                    
                   
                   
                    lastStoredWin['dir']= 'down';

                    for (var i = 0; i < e.children.length; i++) {
                        
                        var c = e.children[i];
                       
                        c.style.display = c.getAttribute("display");
                       
                      }
                    

                }

               
              
            }
            // console.timeEnd("onUpScroll");  
               
            }
            if(behaviour.downScroll){

                

                // console.time("onDownScroll");
                let lastStoredWin = this.WINDOWS.find((e, i, a) =>{ return e['dir'] == "down"});
              
                let e = document.querySelector(".m_"+lastStoredWin['stopId']);
               
                if(activity.scrollTop > lastStoredWin["scrollTop"]){
                   
                    lastStoredWin['dir']= 'up';
                   
                    
                    // e.style.opacity = 0;

                    for (var i = 0; i < e.children.length; i++) {
                        
                        var c = e.children[i];
                        c.setAttribute("d", window.getComputedStyle(c).getPropertyValue('display'));
                        c.style.display = "none";
                       
                      }

                   // this.kpop = e.cloneNode(true);

                   // e.innerHTML = "";


                  //  console.log(this.kpop.innerHTML);

               
                    

                    
                    
                    // e.innerHTML = "";

                }

                // console.timeEnd("onDownScroll");

             
                
              
            }
            
          
            
        

        
        
        if (behaviour.onload || behaviour.fetchScroll) {
            
            
            // let main = $("<div class='part_win m_" + this.stopPoint + " ' dir=down vis=1></div>");

            let main =  document.createElement("div");
            main.className= "part_win m_"+this.stopPoint;
            main.setAttribute("dir", "down");
            main.setAttribute("vis", "1");
      
            activity.append(main);

            var LOADED_EL = 0;
            let stopPoint = this.stopPoint;
            var win_h = 0;

            for (var i = this.stopPoint + n; i < dom.length; i++) {

                

                // var $divParent = $("<div class='main_window " + dom[i].id + "'></div>");

                var $divParent = document.createElement("div");
                $divParent.className = "main_window "+dom[i].id;
                $divParent.setAttribute('id', dom[i].id);

                $divParent.innerText = "dom " + i + " " + dom[i].label; ;
                if (dom[i].children) {
              
                    this.domToHTML(dom[i].children, $divParent);
                }
                main.append($divParent);

                var height = $divParent.offsetHeight+parseInt(window.getComputedStyle($divParent).getPropertyValue('margin-top'))+parseInt(window.getComputedStyle($divParent).getPropertyValue('margin-bottom'));

                console.log(height);
                
              


                this.heightUsed += height;
                win_h += height;
                LOADED_EL += 1;
          

              
                if (this.heightUsed > this.bodyHeight) {

                    this.exPermission = false;
                    this.exScrollPermission = true;
                    this.stopPoint = i;
                  
                    break;
                }
                if (i == dom.length - 1) {
                    this.exPermission = false;
                    this.stopPoint = i;
                    this.exScrollPermission = true;
          
                    break;
                }
                




                


            }

            this.WINDOWS.push({stopId: stopPoint, dir: "down", scrollTop: this.heightUsed});
            main.setAttribute("scrollTop", this.heightUsed);
            main.style.height = win_h+"px";

         

        }





    }
    domToHTML(dom, activity) {

        this.appendDOM(dom, activity, 0);
       
        activity.onscroll =() => {

     
          
            this.appendDOM(dom, activity, 1);




        };


    }

    page(dom, activity) {

        this.domToHTML(dom.main, activity);

    }



}