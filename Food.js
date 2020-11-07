class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("Milk.png");
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    removeFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    

    async hour(){
        var response = await fetch ("http://worldtimeapi.org/api/timezone/America/New_York");
        var responseJSON = await response.json();
        var dt = responseJSON.datetime;
    }

    display(){
        var x=80, y=100;
        background("green");
        textSize(15);
        if(lastFed >= 12){
            text("Last Fed: " + lastFed%12 + "PM", 50, 30);
        }else if(lastFed === 0){
            text("Last Fed: 12 AM", 50, 30);
        }else{
            text("Last Fed: " + lastFed + "AM", 50, 30);
        }

        imageMode(CENTER);

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 === 1){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x = 30;
            }
        }
    }
    bedroom(){
        background(bedroom);
    }

    garden(){
        background(garden);
    }
    
    washroom(){
        background(washroom);
    }
}