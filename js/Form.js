class Form {
    constructor() {

    }
    display() {
        var feedButton = createButton("Feed the dog");
        feedButton.position(750, 100);

        var addMilkButton = createButton("Add Food");
        addMilkButton.position(850, 100);



        feedButton.mousePressed(function () {
            dog.changeImage("dog happy", dogHappyImage);
            if (food <= 0)
                food = 0;
            else {
                food = food - 1;
            }

            writeMilk(food);
        })

        addMilkButton.mousePressed(function () {
            food = food + 1;

            writeMilk(food);
        })

        if (gameState != "hungry") {

            feedButton.hide();
            addMilkButton.hide();
            dog.visible = false;
            //dog.remove();
        }

        else {
            feedButton.show();
            addMilkButton.show();
            dog.visible = true;
        }



    }

    playing() {
        bck.visible = true;
        bck.y = 150;
        bck.scale = 1.7;
        bck.addImage("garden", gardenImage);
    }

    sleeping() {
        bck.visible = true;
        bck.scale = 2;
        bck.addImage("bedroom", bedroomImage);
    }

    bathroom() {
        bck.visible = true;
        bck.y = 150;
        bck.scale = 1.7;
        bck.addImage("washroom", washroomImage);
    }
}