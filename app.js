import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "./data/mushrooms.csv"
const trainingLabel = "class"
const ignored = ["class", "gill-attachment", "gill-spacing", "stalk-shape", "stalk-root", "stalk-surface-above-ring", "stalk-surface-below-ring", "stalk-color-above-ring", "stalk-color-below-ring", 
"veil-type", "veil-color", "ring-number", "ring-type"]


//
// load csv data as json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        minNumSamples: 10,
        complete: results => trainModel(results.data)   // use this data to train
    })
}


//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {

    // shuffle the data before splitting it into training and testing sets
    data.sort(() => (Math.random() - 0.4))

    // split data into traindata and testdata
    let trainData = data.slice(0, Math.floor(data.length * 0.4))
    let testData = data.slice(Math.floor(data.length * 0.4))

    // create the algorithm
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    // Draw the tree structure - DOM element, width, height, decision tree
    let json = decisionTree.toJSON()
    let visual = new VegaTree('#view', 2300, 1000, json)


    // make a prediction with a sample from the testdata
    let mushroom = testData[78]
    let mushroomPrediction = decisionTree.predict(mushroom)
    console.log(`This mushroom is : ${mushroomPrediction}`)

    // calculate the accuracy using all the test data
    function testMushroom() {
        let amountCorrect = 0 // keep track of the number of correct predictions

        let truePositives = 0; // aantal werkelijke positieven die correct zijn voorspeld
        let trueNegatives = 0; // aantal werkelijke negatieven die correct zijn voorspeld
        let falsePositives = 0; // aantal werkelijke negatieven die onterecht als positief zijn voorspeld
        let falseNegatives = 0; // aantal werkelijke positieven die onterecht als negatief zijn voorspeld


        for (let i = 0; i < testData.length; i++) {
            // make a copy of the mushroom without the "Label" attribute
            const mushroomWithoutLabel = { ...testData[i] }
            delete mushroomWithoutLabel.class

            // prediction
            let prediction = decisionTree.predict(mushroomWithoutLabel)

            // compare the prediction with the actual label
            if (prediction === testData[i].class) {
                amountCorrect++

              if (prediction === "p" && testData[i].class === "p") {
                  truePositives++;
              } else if (prediction === "e" && testData[i].class === "e") {
                  trueNegatives++;
              }
              } else {
                if (prediction === "p" && testData[i].class === "e") {
                  falsePositives++;
              } else if (prediction === "e" && testData[i].class === "p") {
                  falseNegatives++;
              }
            }
        }

        let accuracy = amountCorrect / testData.length // calculate the accuracy
        console.log(`Accuracy: ${accuracy}`) // display the accuracy in the console

        // toon de Confusion Matrix in de console
        console.log(`True Positives: ${truePositives}`);
        console.log(`True Negatives: ${trueNegatives}`);
        console.log(`False Positives: ${falsePositives}`);
        console.log(`False Negatives: ${falseNegatives}`);

        // update the HTML table with confusion matrix results
        document.getElementById("truePositives").innerHTML = truePositives.toString();
        document.getElementById("trueNegatives").innerHTML = trueNegatives.toString();
        document.getElementById("falsePositives").innerHTML = falsePositives.toString();
        document.getElementById("falseNegatives").innerHTML = falseNegatives.toString();

           
        return accuracy // return the accuracy as the result of the function

    }

    document.getElementById("accuracy").textContent = `Accuracy: ${(testMushroom()*100).toFixed(2)}%`

    let jsonStringify = decisionTree.stringify()
    console.log(jsonStringify)
}

loadData()
