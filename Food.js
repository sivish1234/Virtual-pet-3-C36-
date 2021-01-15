class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("milk.png");
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }

    getFedTime(lastFed){
        this.lastFed = lastFed
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1
        }
    }

    getFoodStock(){
        return this.foodStock
    }

    display(){
        fill("black");
        textSize(15);
        text("Last Feed: " + lastFed, 50, 30);
        text("Current Time: " + currentTime, 170, 30);

        var x = 80; var y = 100;
        imageMode(CENTER);
        //image(this.image, 120, 220, 50, 50)

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){
         if(i % 10 === 0) {
             x = 80; 
             y = y+50
         }
        image(this.image, x, y, 50, 50)   
        x = x+30        
      }
    }

    //drawSprites();
  }

  
    bedroom(){
        background(bedroom,700,600);  
    }
      
    garden(){
        background(garden,700,600);  
    } 

    washroom(){
        background(washroom,700,600); 
    }
}