class Square {

    constructor() {
        this.__WINDOW_HEIGHT = 0;
        this.__BODY_HEIGHT = 0;
        this.__MAX_HEIGHT = 0 + 100;
        this.__HEIGHT_USED = 0;
        this.__N_WINDOW = 0;
       
        this.__SCROLLTOP = 0;

        this.__EX_PERMISSION = true;
        this.__STOP_POINT = 0;
        this.__EX_SCROLL_PERMISSION = false;
      
       
        this.__WINDOWS = [];
        this.__STORED_WINDOWS = [];
      
    }


    html(dom, activity) {

    }
    appendDOM(dom, activity, n) {

        let behaviour = { onload: false, fetchScroll: false, upScroll: false, downScroll: false, fetchSome: false }
        let exec = false;

      
        if (n == 0) { behaviour.onload = true; }
        if (n == 1) {

           
            
            if(activity.scrollTop + activity.offsetHeight < this.__SCROLLTOP){
                
                behaviour.upScroll = true;
             
            }else{
                behaviour.downScroll = true;
            }
        
            this.__SCROLLTOP = activity.scrollTop + activity.offsetHeight;
           
            

            if (this.__SCROLLTOP > this.__BODY_HEIGHT - 100) {
                behaviour.fetchScroll = true;
                this.__EX_PERMISSION = true;
                this.__BODY_HEIGHT += this.__WINDOW_HEIGHT;

                

        
                this.__N_WINDOW += 1;
        
                exec = true;
            }
        };
        if (n==3) { behaviour.fetchSome = true; }

        // TODO #2 OnScrollUp trigger hidden partial windows to display.



         // TODO #7 On scroll up/down, save revertable element state in memory.
    

         // We can create 2 array: 
         
         // 1. 1st array windows containing 
        
            if(behaviour.upScroll){
               
                // console.time("onUpScroll"); 
             
                let lastStoredWin = this.__WINDOWS.findLast((e, i, a) =>{ return e['dir'] == "up"});
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
                let lastStoredWin = this.__WINDOWS.find((e, i, a) =>{ return e['dir'] == "down"});
              
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
            
          
            
        

        
        
        if (behaviour.onload || behaviour.fetchScroll || behaviour.fetchSome) {
            
            
            // let main = $("<div class='part_win m_" + this.stopPoint + " ' dir=down vis=1></div>");

            let main =  document.createElement("div");
            main.className= "part_win m_"+this.__STOP_POINT;
            main.setAttribute("dir", "down");
            main.setAttribute("vis", "1");
      
            activity.append(main);

            var LOADED_EL = 0;
            let stopPoint = this.__STOP_POINT;
            var win_h = 0;

            if(behaviour.fetchSome) { n = 1; }

            for (var i = this.__STOP_POINT + n; i < dom.length; i++) {

                

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
                
              


                this.__HEIGHT_USED += height;
                win_h += height;
                LOADED_EL += 1;
          

              
                if (this.__HEIGHT_USED > this.__BODY_HEIGHT) {

                    this.__EX_PERMISSION = false;
                    this.__EX_SCROLL_PERMISSION = true;
                    this.__STOP_POINT = i;
                  
                    break;
                }
                if (i == dom.length - 1) {
                    this.__EX_PERMISSION = false;
                    this.__STOP_POINT = i;
                    this.__EX_SCROLL_PERMISSION = true;
          
                    break;
                }
                




                


            }

            this.__WINDOWS.push({stopId: stopPoint, dir: "down", scrollTop: this.__HEIGHT_USED});
            main.setAttribute("scrollTop", this.__HEIGHT_USED);
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

       
        
        this.__WINDOW_HEIGHT = activity.offsetHeight;
        this.__BODY_HEIGHT = this.__WINDOW_HEIGHT;
        this.__MAX_HEIGHT = this.__BODY_HEIGHT + 100;
       
        

        this.domToHTML(dom.main, activity);


        // Resize Behaviour

        let a = this.__WINDOW_HEIGHT;
        let b = this.__HEIGHT_USED;

        let c = ()=>{
            this.appendDOM(dom.main, activity, 3)
        };
        window.onresize = function(e){

           
           
            if(a != activity.offsetHeight){

                if(activity.offsetHeight > b){

                    // If height used is less than body height then

                    c();
                    
                }
                
            }
            
        }

    }



}