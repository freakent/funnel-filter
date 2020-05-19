const FunnelFilter = require('./funnel_filter')
const source_data = require("./prize").prizes


let data = []
source_data.forEach(l1 => {
    //console.log('L1', l1)
    if (l1.laureates) {
        l1.laureates.forEach(l2 => {
            l2.year = l1.year
            l2.category = l1.category
            data.push(l2)
        })
    }
})

//console.log(data[0])

let attributes_to_ignore = ['motivation', 'id', 'share']

let test_data = [
    data.filter(d => d.surname == 'Lee'),
    data.filter(d => d.surname && d.surname.toLowerCase().includes('frank') || d.firstname.toLowerCase().includes('frank')),
    data.filter(d => d.surname && d.surname.toLowerCase().includes('martin') || d.firstname.toLowerCase().includes('martin')),
    data.filter(d => d.surname && d.surname.toLowerCase().includes('martin') || d.firstname.toLowerCase().includes('martin')).filter(dd => dd.category == 'physics')
]

test_data.forEach((td, i) => {
    console.log("Test", i, "data set:", td )
    let ff = new FunnelFilter(td, attributes_to_ignore)
    console.log("Result:", i, "\nAttributes:", ff.attributes, "\nDistribution:", ff.distribution, "\nFilters", ff.filters)
})



