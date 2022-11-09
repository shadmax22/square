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
    }


    html(dom, activity) {

    }
    appendDOM(dom, activity, n) {

        let behaviour = { onload: false, fetchScroll: false, upScroll: false, downScroll: false }
        let exec = false;


        if (n == 0) { behaviour.onload = true; }
        if (n == 1) {
            
            if(activity.scrollTop() + activity.innerHeight() < this.scrollTop){
                
                behaviour.upScroll = true;
             
            }else{
                behaviour.downScroll = true;
            }
        
            this.scrollTop = activity.scrollTop() + activity.innerHeight();
           
            

            if (this.scrollTop > this.bodyHeight - 100) {
                behaviour.fetchScroll = true;
                this.exPermission = true;
                this.bodyHeight += this.defaultWindowSize;

                

        
                this.noOfMainDiv += 1;
        
                exec = true;
            }
        };

        // TODO #2 OnScrollUp trigger hidden partial windows to display.



        if(behaviour.upScroll || behaviour.downScroll){

        
            if(behaviour.upScroll){
               
         
                let lastStoredWin = $(".part_win[dir='up']").last();
                console.log(activity.scrollTop(), lastStoredWin.attr("scrolltop"));
                if(activity.scrollTop() < lastStoredWin.attr("scrolltop")){

                  
                   
                    lastStoredWin.css("opacity", '1');
                    lastStoredWin.attr("dir", "down");
                    

                }

               
                
                
               
            }
            if(behaviour.downScroll){

                
                let lastStoredWin = $(".part_win[dir='down']").first();
           
                if(activity.scrollTop() > lastStoredWin.attr("scrolltop")){

                    lastStoredWin.attr('dir', 'up');
                    lastStoredWin.css("opacity", '0');
                    

                }

             
                
              
            }
            
          
            
        }

        
        
        if (behaviour.onload || behaviour.fetchScroll) {
            
            let main = $("<div class='part_win m_" + this.stopPoint + "  data_partition_"+this.scrollWindow+"' dir=down vis=1></div>");
      
            activity.append(main);

            var LOADED_EL = 0;

            for (var i = this.stopPoint + n; i < dom.length; i++) {

                

                var $divParent = $("<div class='main_window " + dom[i].id + "'></div>");

                $divParent.text("dom " + i + " " + dom[i].label).attr('id', dom[i].id);
                if (dom[i].children) {
              
                    this.domToHTML(dom[i].children, $divParent);
                }
                main.append($divParent);

                var height = $divParent.outerHeight(true);
                


                this.heightUsed += height;
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

            main.attr("scrollTop", this.heightUsed);

         

        }





    }
    domToHTML(dom, activity) {

        this.appendDOM(dom, activity, 0);
       
        activity.scroll(() => {

     

            this.appendDOM(dom, activity, 1);




        });


    }

    page(dom, activity) {

        this.domToHTML(dom.main, activity);

    }



}