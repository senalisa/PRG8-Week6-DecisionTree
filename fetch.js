import { DecisionTree } from "./libraries/decisiontree.js"


    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))


function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)

    // test om te zien of het werkt
    // let passenger = 
    // { 
    // bruises: document.getElementById('bruises').value, 
    // odor: document.getElementById('odor').value, 
    // population: document.getElementById('population').value, 
    // habitat: document.getElementById('habitat').value 
    // }

    // let prediction = decisionTree.predict(passenger)
    // console.log("predicted " + prediction)

    const form = document.getElementById('mushroomForm');
                form.addEventListener('submit', event => {
                event.preventDefault();

                const bruises = document.getElementById('bruises').value;
                const odor = document.getElementById('odor').value;
                const capshape = document.getElementById('capshape').value;
                const capsurface = document.getElementById('capsurface').value;
                const capcolor = document.getElementById('capcolor').value;
                const gillsize = document.getElementById('gillsize').value;
                const gillcolor = document.getElementById('gillcolor').value;
                const population = document.getElementById('population').value;
                const habitat = document.getElementById('habitat').value;

                const prediction = decisionTree.predict({ bruises, odor, capshape, capsurface, capcolor, gillsize, gillcolor, population, habitat });
                
                const resultElement = document.getElementById('predictionResult');
                // resultElement.innerHTML = `Prediction: ${prediction}`;
                if (prediction === 'e') {
                    resultElement.innerHTML = 'Prediction: It is edible!';
                  } else {
                    resultElement.innerHTML = 'Prediction: It is poisonous!';
                  }
                });
}

// fetch('./model.json')
//             .then(response => response.json())
//             .then(model => {
//                 const form = document.getElementById('mushroomForm');
//                 form.addEventListener('submit', event => {
//                 event.preventDefault();

//                 const bruises = document.getElementById('bruises').value;
//                 const odor = document.getElementById('odor').value;
//                 const population = document.getElementById('population').value;
//                 const habitat = document.getElementById('habitat').value;

//                 const prediction = model.predict({ bruises, odor, population, habitat });
                
//                 const resultElement = document.getElementById('predictionResult');
//                 resultElement.innerHTML = `Prediction: ${prediction}`;
//                 });
//             });