
//function that updates the dashboard.

// function that populates the metadata

function demoInfo(sample)
{
    console.log(sample);


    // use d3.json in order to get the data
    d3.json("samples.json").then((data) => {
        // grab all of the metadata
        let metaData = data.metadata;
        //console.log(metaData);

        // filter based on the value of the sample
        // (should return 1 result in an array based on the dataset)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        // access index 0 from the array
        let resultData = result[0];
        console.log(resultData);

        // clear the metadata out
        d3.select("#sample-metadata").html(""); 

        // use object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) =>{
            // add the sample data /demographics
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}

// function that builds the graphs

// function that initializes the dashboard
function initialize()
{

    // let data = d3.json("samples.json");
    // console.log(data);
    // access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");

    // use d3.json in order to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names; // made an array of just the names
        //console.log(sampleNames);

        // use forEach to rcreate options for each sample
        sampleNames.forEach((sample) => {
            select.append("option")
            .text(sample)
            .property("value", sample);
        });

         // when initialized, pass in the information for the first sample
        let sample01 = sampleNames[0];

        // call the function to build the metadata
        demoInfo(sample01);
    });

}

// function that updates the dashboard
function optionChanged(item)
{
    // call the update to the metadata
    demoInfo(item);
}
// call the initialized function
initialize();