class Square {

    constructor() {
        this.bodyHeight = window.innerHeight;
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
    }


    html(dom, activity) {

    }
    appendDOM(dom, activity, n) {

        let behaviour = { onload: false, onscroll: false }
        let exec = false;


        if (n == 0) { behaviour.onload = true; }
        if (n == 1) {

            if (activity.scrollTop() + activity.innerHeight() > this.bodyHeight - 100) {
                behaviour.onscroll = true;
                this.exPermission = true;
                this.bodyHeight += this.bodyHeight;

                // View sense

                console.log("ACTIVATE " + this.stopPoint);
                // console.log(activity.scrollTop() + activity.innerHeight(), this.bodyHeight - 100)
                this.maxHeight = this.bodyHeight;
                this.noOfMainDiv += 1;
                console.log("Permited");
                exec = true;
            }
        };

        // TODO #2 OnScrollUp trigger hidden partial windows to display.




        if (behaviour.onload || behaviour.onscroll) {
            // console.log(this.maxHeight, this.heightUsed);

            if(behaviour.onscroll){
                this.maxHeight += this.heightUsed;
            }
           
            this.scrollWindow += 1;
            let partToRemove = this.scrollWindow-3;
            $(".data_partition_"+partToRemove).css("opacity", "0");
            // console.log(".data_partition_"+partToRemove+"");
            let main = $("<div class='m_" + this.stopPoint + "  data_partition_"+this.scrollWindow+"'></div>");
      
            activity.append(main);
            for (var i = this.stopPoint + n; i < dom.length; i++) {


                var $divParent = $("<div class='main_window " + dom[i].id + "'></div>");

                $divParent.text("dom " + i + " " + dom[i].label).attr('id', dom[i].id);
                if (dom[i].children) {
                    // console.log(dom[i].children);
                    this.domToHTML(dom[i].children, $divParent);
                }
                main.append($divParent);

                var height = $divParent.outerHeight();
                


                this.heightUsed += height;
                console.log(this.heightUsed, this.maxHeight);
                // console.log(this.heightUsed + " > " + this.bodyHeight);
                if (this.heightUsed > this.maxHeight+100) {

                    this.exPermission = false;
                    this.exScrollPermission = true;
                    this.stopPoint = i;
                    console.log("Stopped at " + i);
                    break;
                }
                if (i == dom.length - 1) {
                    this.exPermission = false;
                    this.stopPoint = i;
                    this.exScrollPermission = true;
                    console.log("Stopped at " + i);
                    break;
                }
                







            }

        }





    }
    domToHTML(dom, activity) {

        this.appendDOM(dom, activity, 0);
        // for (var i = 0; i < dom.length; i++) {

        //     if (this.exPermission) {



        //         var $divParent = $("<div class='" + dom[i].id + "'></div>");

        //         $divParent.text("dom " + i + " " + dom[i].label).attr('id', dom[i].id);
        //         if (dom[i].children) {
        //             // console.log(dom[i].children);
        //             this.domToHTML(dom[i].children, $divParent);
        //         }
        //         activity.append($divParent);

        //         var height = $divParent.outerHeight();



        //         this.heightUsed += height;
        //         // console.log(this.heightUsed + " > " + this.bodyHeight);
        //         if (this.heightUsed > this.maxHeight) {

        //             this.exPermission = false;
        //             this.stopPoint = i;
        //             console.log("Stopped at " + i);
        //         }
        //         if (i == dom.length - 1) {
        //             this.exPermission = false;
        //             this.stopPoint = i;
        //             console.log("Stopped at " + i);
        //         }




        //     }


        // }

        console.log("ARRAY LENGTH: " + dom.length);
        activity.scroll(() => {

            // if (activity.scrollTop() + activity.innerHeight() > this.bodyHeight - 100 && this.exScrollPermission) {





            //     this.bodyHeight += this.bodyHeight;

            //     console.log("ACTIVATE " + this.stopPoint);
            //     this.maxHeight = this.bodyHeight + 100;
            //     this.noOfMainDiv += 1;

            //     var $mainDiv = $("<div class='main_" + this.noOfMainDiv + "'></div>");


            //     for (var i = this.stopPoint + 1; i < dom.length; i++) {



            //         this.arr = dom;



            //         var $divParent = $("<div class='e2'></div>");
            //         try {
            //             $divParent.text("dom " + i + " " + dom[i].label).attr('id', dom[i].id);
            //         }
            //         catch (e) {
            //             console.log("ERROR id: " + i);
            //         }

            //         if (dom[i].children) {
            //             // console.log(dom[i].children);
            //             this.domToHTML(dom[i].children, $divParent);
            //         }

            //         $mainDiv.append($divParent);
            //         activity.append($mainDiv);

            //         var height = $divParent.outerHeight();


            //         this.heightUsed += height;
            //         console.log(this.heightUsed + ">=" + this.maxHeight, i);
            //         if (this.heightUsed >= this.maxHeight) {

            //             this.heightSum = this.newheightSum;
            //             console.log(this.newheightSum >= this.heightSum, i);
            //             this.stopPoint = i;
            //             break;

            //         }








            //     }

            //     this.st = activity.scrollTop() + activity.innerHeight();
            //     console.log([{
            //         bodyHeight: this.bodyHeight,
            //         heightUsed: this.heightUsed,
            //         maxHeight: this.maxHeight,
            //         i: i,
            //         height: height,
            //         offsetTop: $divParent.offset().top,
            //         outerHeight: $divParent.outerHeight(),
            //         scrollTop: activity.scrollTop() + activity.innerHeight()

            //     }][0]);



            // }

            this.appendDOM(dom, activity, 1);




        });


    }

    page(dom, activity) {

        this.domToHTML(dom.main, activity);

    }



}