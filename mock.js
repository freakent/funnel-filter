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


console.log("Hello how may I help you?\n")

// "Show me Martin"
console.log("> Search for people matching Martin\n" )
let rs1 = data.filter(d => d.surname && d.surname.toLowerCase().includes('martin') || d.firstname.toLowerCase().includes('martin'))
cc(rs1, "people matching Martin")

console.log("\n")

// "Show me Martin in physics"
console.log("> physics\n" )

let rs2 = rs1.filter(d => d.category == 'physics')
cc(rs2, "people matching martin and physics") 

console.log("\n")

// "Show me Martin L"
console.log("> Martin L.\n " )
let rs3 = rs2.filter(d => d.firstname == 'Martin L.')
cc(rs3, "people matching martin and physics and Martin L") 



function cc(data, filterDescription) {
    let attributes_to_ignore = ['motivation', 'id', 'share']
    let ff = new FunnelFilter(data, attributes_to_ignore)

    if(ff.dataset_size > 1) {

        console.log("I have", ff.dataset_size, filterDescription )
        console.log("Which", ff.filters[0].attribute, "are you looking for?")
        for ( const value in ff.filters[0].values ) {
            console.log("-", value)
        }
    
    } else {
        console.log("here is the person you are looking for\n", data[0])
    }
    
}


